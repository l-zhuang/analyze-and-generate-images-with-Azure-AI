const {AzureOpenAI} = require("openai");
const axios = require('axios');  // Make sure to install axios with 'npm install axios'

require("dotenv").config();

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint>";
const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<api key>";
// const endpoint = "https://generateimage.openai.azure.com";
// const apiKey = "5f32c5558e684911b8f97398cb36a2f4";


if (!endpoint || !apiKey) {
    console.error("Missing required environment variables.");
    process.exit(1);
  }

const apiVersion = "2024-05-01-preview";
const deployment = "generateimg";  // Correct model name for DALL-E 2
const prompt = "A futuristic city skyline at sunset";

async function main() {
    console.log("== Image Generation Sample ==");
    console.log(`Using API Key: ${apiKey}`);

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

    
        // Submit the request to generate an image
        const submitResponse = await axios.post(`${endpoint}/openai/deployments/${deployment}/images/generations?api-version=${apiVersion}`, body, { headers });
        console.log("Submission Response:", submitResponse.data);
    //     const operationId = submitResponse.data.id;

    //     // Wait for a few seconds before attempting to retrieve the image
    //     await new Promise(resolve => setTimeout(resolve, 5000));

    //     // Retrieve the generated image
    //     const resultResponse = await axios.get(`${endpoint}/openai/operations/images/${operationId}?api-version=${apiVersion}`, { headers });
    //     console.log("Generated Image URL/Data:", resultResponse.data);
    
}
main().catch((err) => {
    console.error("Error occurred:", err);
  });
  
  module.exports = { main };

