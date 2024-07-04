
// // export default generateImage;
import axios from 'axios';

const endpoint =process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
const apiKey =process.env.REACT_APP_AZURE_OPENAI_API_KEY;

// Check if the necessary environment variables are set
export function isConfigured() {
    return endpoint && apiKey;
}

const apiVersion = "2024-05-01-preview";
const deployment = "generateimg";  // Correct model name for DALL-E 2
// const prompt = "A futuristic city skyline at sunset";

export const generateImage = async (prompt) => {
    // isConfigured();
    console.log("== Image Generation Sample ==");
    console.log(`Using API Key: ${apiKey}`);
    console.log(`Using endpoint : ${endpoint}`);

    const headers = {
        'Content-Type': 'application/json',
        'api-key': `${apiKey}`
    };

    const body = {
        prompt:prompt,
        model: "dall-e-2",
        n: 1,
        size: "1024x1024"
    };
 
        try {
              const submitResponse = await axios.post(`${endpoint}/openai/deployments/${deployment}/images/generations?api-version=${apiVersion}`, body, { headers });
                return submitResponse.data;
              } catch (error) {
                console.error('Error generating image:', error);
                return null;
              }
    
}

