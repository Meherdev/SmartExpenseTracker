/* Amplify Params - DO NOT EDIT
	API_SMARTEXPENSE_EXPENSETABLE_ARN
	API_SMARTEXPENSE_EXPENSETABLE_NAME
	API_SMARTEXPENSE_GRAPHQLAPIENDPOINTOUTPUT
	API_SMARTEXPENSE_GRAPHQLAPIIDOUTPUT
	API_SMARTEXPENSE_GRAPHQLAPIKEYOUTPUT
	AUTH_SMARTEXPENSE69A3C01E_USERPOOLID
	ENV
	FUNCTION_S3TRIGGER34C4A3B0_NAME
	REGION
	STORAGE_S3B94825CA_BUCKETNAME
Amplify Params - DO NOT EDIT */
/* Amplify Params - DO NOT EDIT
    API_SMARTEXPENSE_EXPENSETABLE_ARN
    API_SMARTEXPENSE_EXPENSETABLE_NAME
    API_SMARTEXPENSE_GRAPHQLAPIENDPOINTOUTPUT
    API_SMARTEXPENSE_GRAPHQLAPIIDOUTPUT
    API_SMARTEXPENSE_GRAPHQLAPIKEYOUTPUT
    AUTH_SMARTEXPENSE69A3C01E_USERPOOLID
    ENV
    FUNCTION_S3TRIGGER34C4A3B0_NAME
    REGION
Amplify Params - DO NOT EDIT */


const GRAPHQL_ENDPOINT = process.env.API_SMARTEXPENSE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_SMARTEXPENSE_GRAPHQLAPIKEYOUTPUT;

const query = `
query GetExpensesByUser($userId: ID!, $startDate: String!) {
  listExpenses(filter: {
    userId: { eq: $userId },
    createdAt: { ge: $startDate }
  }) {
    items {
      amount
    }
  }
}
`;


export const handler = async (event) => {
    const { userId, filter } = event.arguments;

    console.log(`UserId: ${userId}`, `filter: ${filter}`, `GRAPHQL_ENDPOINT: ${GRAPHQL_ENDPOINT}`);

    let startDate;
    const currentTime = new Date().getTime();

    switch (filter) {
        case 'Week':
            startDate = new Date(currentTime - 7 * 24 * 60 * 60 * 1000).toISOString();
            break;
        case 'Month':
            startDate = new Date(currentTime - 30 * 24 * 60 * 60 * 1000).toISOString();
            break;
        case 'Year':
            startDate = new Date(currentTime - 365 * 24 * 60 * 60 * 1000).toISOString();
            break;
        default:
            throw new Error('Invalid filter');
    }

    const variables = {
        userId,
        startDate
    }

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
      console.log('====================================');
      console.log(body.data);
      console.log('====================================');
      const expenses = body.data.listExpenses.items;
      return expenses;
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
};

