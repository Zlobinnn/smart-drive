require('dotenv').config();
const { ethers } = require("ethers");

async function checkSepolia() {
    // console.log("Infura API Key:", process.env.INFURA_API_KEY);
    const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
    // console.log("Infura URL:", infuraUrl);
    const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

    try {
        const blockNumber = await provider.getBlockNumber();
        console.log("Sepolia is accessible! Current block number:", blockNumber);
    } catch (error) {
        console.error("Error connecting to Sepolia:", error.message);
    }
}

checkSepolia();