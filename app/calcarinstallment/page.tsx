"use client";

import { useState } from "react";
import { SauHeader } from "@/components/SauHeader";
import Image from "next/image";
import carpicture from "@/assets/images/Car2.png";
import { SauFooter } from "@/components/SauFooter";

export default function Page() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [installment, setInstallment] = useState("");
  const [interest, setInterest] = useState("");
  const [result, setResult] = useState("0.00");

  // dropdown
  const options = [
    { value: "12", label: "12 เดือน" },
    { value: "24", label: "24 เดือน" },
    { value: "36", label: "36 เดือน" },
  ];

  // คำนวณค่างวด
  const handelCarInstallmentOnCalClick = () => {
    if (!price || !downPayment || !installment || !interest) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
// คำนวณ
// ยอดจัด = ราคารถ - (ราคารถ * เงินดาวน์ / 100)
// ดอกเบี้ยทั้งหมด = ยอดจัด + ( (ยอดจัด * ดอกเบี้ย / 100) * จำนวนปีที่ผ่อน)
// ค่างวดต่อเดือน = (ยอดจัด + ดอกเบี้ยทั้งหมด ) / จำนวนงวดผ่อน
   const carPrice = parseFloat(price);
  const downPercent = parseFloat(downPayment);
  const months = parseInt(installment);
  const interestRate = parseFloat(interest);

  const years = months / 12;
  const finance =
    carPrice - (carPrice * downPercent) / 100;
  const totalInterest =
    finance + (finance * interestRate / 100) * years;
  const monthly =
    (finance + totalInterest) / months;
  setResult(monthly.toFixed(2));
  };

  return (
    <>
      <SauHeader />

      <div className="p-10 w-3/4 mx-auto mt-20 border border-gray-100 rounded-xl flex flex-col items-center shadow-xl">
        <Image
          src={carpicture}
          alt="car picture"
          width={120}
          height={120}
          className="mb-10"
        />

        <h1 className="text-xl text-center font-bold text-blue-600">
          โปรแกรมคำนวณค่างวดรถยนต์
        </h1>

        <div className="w-3/5 mt-5">
          <label>ราคารถ (บาท)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-white p-2 w-full mt-2 rounded"
          />

          <label className="block mt-4">เงินดาวน์ (%)</label>
          <div className="flex gap-4 mt-2">
            {[10, 20, 30, 40].map((p) => (
              <label key={p}>
                <input
                  type="radio"
                  name="downPayment"
                  value={p}
                  onChange={(e) => setDownPayment(e.target.value)}
                />{" "}
                {p}%
              </label>
            ))}
          </div>

          <label className="block mt-4">จำนวนงวด (เดือน)</label>
          <select
            className="bg-white p-2 w-full rounded mt-2"
            value={installment}
            onChange={(e) => setInstallment(e.target.value)}
          >
            <option value="">-- Select --</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <label className="block mt-4">ดอกเบี้ยต่อปี (%)</label>
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="bg-white p-2 w-full rounded mt-2"
          />

          <button
            onClick={handelCarInstallmentOnCalClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded mt-5 w-full"
          >
            คำนวณ
          </button>
        </div>

        <div className="w-3/5 mt-5 bg-gray-300 p-5 rounded">
          <h2 className="text-lg text-center font-bold text-gray-600">
            ค่างวดต่อเดือน
          </h2>
          <h2 className="text-2xl text-center font-bold text-red-600">
            {result} บาท
          </h2>
        </div>

        <SauFooter />
      </div>
    </>
  );
}
