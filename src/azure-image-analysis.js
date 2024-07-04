import axios from 'axios';

const subscriptionKey = process.env.REACT_APP_AZURE_API_KEY;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
// Check if the necessary environment variables are set
export function isConfigured() {
  return subscriptionKey&& endpoint;
}

export const analyzeImage = async (imageUrl) => {
  isConfigured();
  const params = {
    'api-version': '2024-02-01',
    'features': 'tags,read,caption,denseCaptions,smartCrops,objects,people'
  };

  try {
    const response = await axios({
      method: 'post',
      url: `${endpoint}`,
      params: params,  // Ensure parameters are added to the query string
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json'
      },
      data: { url: imageUrl }
    });
    return response.data;
  } catch (error) {
    console.error('Error during image analysis:', error.response?.data || error.message);
    throw error; // Rethrow the error if you need further error handling in your component
  }
};

