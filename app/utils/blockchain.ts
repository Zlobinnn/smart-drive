import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x327317F1E92d7866FAD8CA0cD32AC2a19565e6FF";
const ABI = [
  "function createOrder(uint256 orderId) external payable",
];

export async function payOrder(orderId: number, amount: string) {
    if (!process.env.NEXT_PUBLIC_PROVIDER_URL || !process.env.PRIVATE_KEY) {
        throw new Error("Provider URL or Private Key not set");
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const tx = await contract.createOrder(orderId, { value: ethers.utils.parseEther(amount) });
    await tx.wait();
    return tx;
}
