/* Amplify Params - DO NOT EDIT
	API_SMARTEXPENSE_EXPENSETABLE_ARN
	API_SMARTEXPENSE_EXPENSETABLE_NAME
	API_SMARTEXPENSE_GRAPHQLAPIENDPOINTOUTPUT
	API_SMARTEXPENSE_GRAPHQLAPIIDOUTPUT
	API_SMARTEXPENSE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const {TextractClient, AnalyzeExpenseCommand} = require('@aws-sdk/client-textract');
const { S3Client, HeadObjectCommand } = require("@aws-sdk/client-s3");

const AWS_REGION = process.env.REGION;
const GRAPHQL_ENDPOINT =
  process.env.API_SMARTEXPENSE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_SMARTEXPENSE_GRAPHQLAPIKEYOUTPUT;

const textractClient = new TextractClient({ region: AWS_REGION });
const client = new S3Client({region: AWS_REGION});




const query = /* GraphQL */ `
  mutation CreateExpense($input: CreateExpenseInput!) {
      createExpense(input: $input) {
        id
        vendor
        amount
        currency
        tax
        userId
        items {
          item
          price
        }
      }
    }
  `;


exports.handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const input = {
    "Bucket": bucket,
    "Key": key
  };
  const command = new HeadObjectCommand(input);
  const response = await client.send(command);
  const userId = response.Metadata.userid; 
  console.log(`Bucket: ${bucket}`, `Key: ${key}`, `UserId: ${userId}`);

  const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      },
    },
  };

  try {
    const textractResponse = await textractClient.send(new AnalyzeExpenseCommand(params));

    const {vendorName, totalAmount, currency, items, tax} = extractExpenseData(textractResponse)

    console.log('textract response :::', "vendor name :::", vendorName, "\n", "total :::", totalAmount, "\n", "items :::", items);

    const variables = {
      input: {
        vendor: vendorName,
        amount: totalAmount,
        currency,
        items,
        userId,
        tax
      },
    };

    const options = {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    };

    const request = new Request(GRAPHQL_ENDPOINT, options);

    let statusCode = 200;
    let body;
    let response;
  
    try {
      response = await fetch(request);
      body = await response.json();
      if (body.errors) {
        console.log('graphql api errors :::', body.errors[0])
      }
    } catch (error) {
      statusCode = 400;
      body = {
        errors: [
          {
            status: response.status,
            message: error.message,
            stack: error.stack
          }
        ]
      };
      console.log("GRAPHQL API ERROR", statusCode,  error);
    }

  } catch (err) {
    console.log('error extracting text :::', err);
  }
};

function extractExpenseData(textractResponse) {
  let vendorName = null;
  let totalAmount = null;
  let tax = null;
  let currency = '$';
  let items = [];

  if (textractResponse && textractResponse.ExpenseDocuments) {
    textractResponse.ExpenseDocuments.forEach(expenseDoc => {
      // Extract Summary Fields
      if (expenseDoc.SummaryFields) {
        expenseDoc.SummaryFields.forEach(field => {
          if (field.Type && field.Type.Text) {
            switch (field.Type.Text) {
              case "VENDOR_NAME":
                vendorName = field.ValueDetection ? field.ValueDetection.Text : null;
                break;
              case "TOTAL":
                totalAmount = field.ValueDetection ? field.ValueDetection.Text : null;
                break;
              case "TAX":
                tax = field.ValueDetection ? field.ValueDetection.Text : null;
                break;
              default:
                break;
            }
          }
        });
      }

      // Extract Line Items
      if (expenseDoc.LineItemGroups) {
        expenseDoc.LineItemGroups.forEach(lineItemGroup => {
          if (lineItemGroup.LineItems) {
            lineItemGroup.LineItems.forEach(lineItem => {
              let item = {};
              if (lineItem.LineItemExpenseFields) {
                lineItem.LineItemExpenseFields.forEach(expenseField => {
                  if (expenseField.Type && expenseField.Type.Text && expenseField.ValueDetection) {
                    item[expenseField.Type.Text] = expenseField.ValueDetection.Text;
                  }
                });
              }
              items.push({item: item.ITEM, price: item.PRICE});
            });
          }
        });
      }
    });
  }

  totalAmount = totalAmount.substring(1)
  totalAmount = parseFloat(totalAmount);
  return { vendorName, totalAmount, currency , items, tax };
}