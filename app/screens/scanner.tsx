import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {uploadData} from "@aws-amplify/storage";
import React from 'react';
import CameraOption from '../components/CameraOption';
import { moderateScale } from '../theme/scaling';
import { SpaceV } from '../components/Space';
import { Colors } from '@/constants/Colors';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Modalize } from 'react-native-modalize';
import { router } from 'expo-router';
import { generateClient } from 'aws-amplify/api';
import * as subscriptions from '../../src/graphql/subscriptions';
import LottieView from 'lottie-react-native';
import {Picker} from '@react-native-picker/picker';
import { EXPENSE_CATEGORIES } from '@/constants/AppData';
import CustomButton from '../components/Button';
import * as mutations from '../../src/graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();


export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [galleryPermission, setGalleryPermission] = useState(false);
  const [isCamReady, setIsCamReady] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const cameraRef = useRef<CameraView>(null);
  const modalizeRef = useRef<Modalize>(null);
  const [processingInvoice, setProcessingInvoice] = useState(false);
  const animation = useRef<LottieView>(null);
  const [textExtracted, setTextExtracted] = useState<any>('');
  const [category, setCategory] = useState<string>('');
  const [userId, setUserId] = useState<string>();
  
  // const [imageUploadProgress, setImageUploadProgress] = useState(false);


  const reqPermissions = async () => {
      await requestPermission();
      
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === 'granted');
  }


  useEffect(() => {
    if (processingInvoice) {
      animation.current?.play();
    } else {
      animation.current?.resume()
    }
  }, [processingInvoice])

  const fetchUserId = async () => {
    try {
      // Get the current authenticated user
      const user = await getCurrentUser();
      
      // Access the user's attributes
      const id = user.userId // Cognito user ID (sub claim)
      setUserId(id)
      } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
  



  useEffect(() => {
    reqPermissions();
    fetchUserId()
    const sub = client.graphql(({
      query: subscriptions.onCreateExpense
    })).subscribe({
      next: (value) => {
        console.log("expense record created :::", value), setProcessingInvoice(false);
        setTextExtracted(value.data.onCreateExpense);
        modalizeRef.current?.open();
      },
      error: (err) => {console.log('error adding record :::', err), setProcessingInvoice(false), alert('Cannot proccess invoice')}
    })

    return () => {
      sub.unsubscribe()
    }
  }, []);

  if (!permission && !galleryPermission) {
    // Camera permissions are still loading.
    return <View style={styles.container}>
      <Text style={{}}>Need Camera and gallery access for Uploading Image</Text>
      <SpaceV  size='xl'/>
      <Button title='Grant Permission' onPress={reqPermissions} />
    </View>;
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handlePressOnCamera = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // handleImagePicked(photo)
      modalizeRef.current?.open();
    }
  }
  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = async (path: string, file: Blob) => {
    if (!userId)
    return;
    setProcessingInvoice(true);
    return uploadData({path, data: file, options: {metadata: {userId}}}).result
      .then((response) => {
        return response.path;
      })
      .catch((error) => {
        console.log('Upload error', error);
        return error.response;
      });
  };

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {

    if (! pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }

    try {
      if (pickerResult.canceled) {
        alert("Upload cancelled");
        return;
      } else {
        const img = await fetchImageFromUri(pickerResult.assets[0].uri);
        const uploadUrl = await uploadImage(`public/${Date.now()}.jpg`, img);
        console.log('upload url', uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

      handleImagePicked(result)
  };

  const deleteContent = () => {
    setTextExtracted(null);
    setProcessingInvoice(false);
    setCategory('');
    setImage('');
  }

  const createExpense = async () => {
    const expenseDetails = {
      input : {
        id: textExtracted.id,
        category,
      }
    }
    console.log(expenseDetails);
    
    try {
      const result = await client.graphql({query: mutations.updateExpense, variables: expenseDetails});
      if (! result.errors) {
        alert('Expense created successfully');
        modalizeRef.current?.close();
        deleteContent();
      } 
    } catch (err) {
      console.log(err);
      alert('Cannot create expense');
    }
  }

  return (

    <View style={[styles.container]}>
      {
        image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <CameraView ref={cameraRef} onCameraReady={() => {setIsCamReady(true)}} style={styles.camera} facing={facing}>
            {<View style={styles.optionsContainer}>
              <CameraOption name='insert-photo' onPress={pickImage}/>
              <CameraOption name='camera-alt' onPress={handlePressOnCamera}/>
              <CameraOption name='flip-camera-android' onPress={toggleCameraFacing} />
            </View>}
          </CameraView>
        )
      }
      <View style={styles.closeBtn}>
          <Icon name='close' onPress={() => {image ? setImage(undefined) : router.back()}} size={moderateScale(30)} />
      </View>
      <Modalize onClose={deleteContent} ref={modalizeRef} snapPoint={650}>
        { textExtracted && <ScrollView style={styles.modalContent}>
        <Text style={{fontSize: moderateScale(50), color: 'black', textAlign: 'center'}}>
          {textExtracted.vendor}
         </Text>
         <SpaceV size='xl' />
            {textExtracted.items.map((item, i) => (
            <View key={i}>
              <View style={styles.itemContainer}>
                <Text>{item.item}</Text>
                <Text style={{color: Colors.secondary}}>{item.price}</Text>
              </View>
              <SpaceV size='l' />
              </View>
            ))}
            <SpaceV size='l' />
            <Text style={{fontSize: moderateScale(18), fontWeight: '500', color: Colors.lightText}}>Tax   <Text style={{fontSize: moderateScale(18), fontWeight: '500', color: Colors.secondary}}> {textExtracted.tax}</Text></Text>
            <SpaceV size='l'/>
            <Text style={{fontSize: moderateScale(18), fontWeight: '500', color: Colors.lightText}}>Total Amount      <Text style={{fontSize: moderateScale(18), fontWeight: '500', color: Colors.secondary}}> ${textExtracted.amount}</Text></Text>
            <SpaceV size='xl' />
            <Text style={{fontWeight: '600', color: Colors.brand, fontSize: moderateScale(18)}}>Select Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) =>
              setCategory(itemValue)
            }>
              {Object.entries(EXPENSE_CATEGORIES).map(([key, category]) => (
                <Picker.Item style={{fontWeight: '700'}} color={Colors.primary} key={key} label={category.title} value={key} />
              )
              ) }
            </Picker>
            <SpaceV  size='l'/>
            <CustomButton onPress={createExpense} title='Create Expense' />
            <SpaceV size='l' />
         </ScrollView>}
      </Modalize>
      {processingInvoice && <LottieView
        ref={animation}
        style={styles.loader}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('@/assets/images/loader.json')} />}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: Colors.text,
    fontWeight: '500',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  optionsContainer: {
    paddingHorizontal: moderateScale(20),
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  closeBtn: {
    position: 'absolute',
    right: 30,
    top: 50,
    padding: moderateScale(5),
    backgroundColor: Colors.background,
    borderRadius: moderateScale(20),
    opacity: 0.5
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    width: 150,
    height: 150,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,  
  },
  invoiceContent: {
    flex: 1,
  },
  mainContent: {
    color: Colors.text,
    fontSize: moderateScale(30),
    fontWeight: '600'
  },
  mediumContent: {

  },
  modalContent: {
    flex: 1,
    padding: moderateScale(40)
  },
  subContent: {
    flexDirection: 'row',
    flex: 1,
  },
  selector: {

  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});