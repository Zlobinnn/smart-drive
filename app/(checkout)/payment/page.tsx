"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
const ABI = ["function createOrder(uint256 orderId) external payable"];

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!window.ethereum) {
      alert("Установите MetaMask!");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Запрашиваем разрешение на подключение к кошельку
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (!accounts.length) {
        alert("Подключение к кошельку отменено");
        setLoading(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.createOrder(orderId, {
        value: ethers.utils.parseEther(amount || "0"),
      });

      await tx.wait();
      alert("Оплата прошла успешно!");
      window.location.href = "/success";
    } catch (error) {
      console.error("Ошибка при оплате:", error);
      alert("Ошибка при оплате");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Оплата заказа #{orderId}</h1>
      <p className="text-lg">Сумма: {amount} ETH</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Оплачивается..." : "Оплатить через MetaMask"}
      </button>
    </div>
  );
}
