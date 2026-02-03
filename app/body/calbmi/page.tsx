"use client";

import { useState } from "react";
import { SauHeader } from "@/components/SauHeader";
import Image from "next/image";
import bmi from "@/assets/images/bmi2.png";
import { SauFooter } from "@/components/SauFooter";

export default function Page() {
  // state
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiValue, setBmiValue] = useState("0.00");
  const [bmiResult, setBmiResult] = useState("???");

  // คำนวณ BMI
  const handleCalBMIClick = () => {
    if (weight === "" || height === "") {
      alert("กรุณาป้อนน้ำหนักและส่วนสูง");
      return;
    }

    if (weight === "0" || height === "0") {
      alert("ค่าน้ำหนักและส่วนสูงไม่สามารถเป็น 0 ได้");
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const bmi = w / (h ** 2);

    setBmiValue(bmi.toFixed(2));

    if (bmi < 18.5) {
      setBmiResult("ผอมเกินไป");
    } else if (bmi <= 24.9) {
      setBmiResult("น้ำหนักปกติ เหมาะสม");
    } else if (bmi <= 29.9) {
      setBmiResult("อ้วน");
    } else if (bmi <= 39.9) {
      setBmiResult("อ้วนมาก");
    } else {
      setBmiResult("อ้วนอันตราย");
    }
  };

  // ล้างข้อมูล
  const handelClearClick = () => {
    setWeight("");
    setHeight("");
    setBmiValue("0.00");
    setBmiResult("???");
  };

  return (
    <>
      <SauHeader />

      <div className="p-10 w-2/4 mx-auto mt-20 border border-gray-100 rounded-xl flex flex-col justify-center items-center">
        <Image
          src={bmi}
          alt="bmi"
          width={80}
          height={80}
          className="mb-10"
        />

        <h1 className="text-xl text-center text-blue-600 font-bold">
          BMI Calculator <br />
          โปรแกรมคำนวณ BMI
        </h1>

        <div className="w-3/5 mt-5">
          <label>ป้อนน้ำหนัก</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            className="bg-amber-50 p-2 mt-2 w-full mb-3 rounded"
          />

          <label>ป้อนส่วนสูง</label>
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            className="bg-amber-50 p-2 w-full mt-2 rounded"
          />

          <button
            onClick={handleCalBMIClick}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold p-2 mt-5 rounded w-full"
          >
            คำนวณ BMI
          </button>

          <button
            onClick={handelClearClick}
            className="bg-red-600 hover:bg-red-800 text-white font-bold p-2 mt-3 rounded w-full"
          >
            ล้างข้อมูล
          </button>
        </div>

        <div className="w-3/5 mt-5 bg-gray-300 p-5 rounded">
          <h2 className="text-lg text-center font-bold text-gray-600">BMI</h2>
          <h2 className="text-3xl text-center font-bold text-red-600">
            {bmiValue}
          </h2>
          <h2 className="text-lg text-center font-bold text-gray-600">
            การแปลผล BMI : {bmiResult}
          </h2>
        </div>

        <SauFooter />
      </div>
    </>
  );
}
