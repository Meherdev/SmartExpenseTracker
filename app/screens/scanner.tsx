import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import CameraOption from '../components/CameraOption';
import { moderateScale } from '../theme/scaling';
import { SpaceV } from '../components/Space';
import { Colors } from '@/constants/Colors';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Modalize } from 'react-native-modalize';

;
import { router } from 'expo-router';
export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [galleryPermission, setGalleryPermission] = useState(false);
  const [isCamReady, setIsCamReady] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const cameraRef = useRef<CameraView>(null);
  const modalizeRef = useRef<Modalize>(null);


  const reqPermissions = async () => {
      await requestPermission();
      
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === 'granted');
  }


  useEffect(() => {
    reqPermissions();
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

      setImage(photo?.uri);
      modalizeRef.current?.open();
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      modalizeRef.current?.open();
    }
  };

  return (
    <View style={styles.container}>
      {
        image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <CameraView ref={cameraRef} onCameraReady={() => {setIsCamReady(true)}} style={styles.camera} facing={facing}>
            {isCamReady &&  <View style={styles.optionsContainer}>
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
      <Modalize ref={modalizeRef} snapPoint={300}>
        <View style={styles.modalContent}>
          {image && <Image source={{ uri: image }} style={styles.modalImage} />}
        </View>
      </Modalize>
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
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});