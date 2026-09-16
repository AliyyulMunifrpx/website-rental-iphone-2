"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link.js";
import { motion } from "framer-motion";

function StepCard({ number, title, description, isFirst, index }) {
  return (
    <motion.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="flex-1 flex flex-col backdrop-blur-md bg-primary/50 gap-8 border-1 border-white/20 rounded-2xl"
    >
      <p className="text-5xl font-bold p-4 rounded-tr-2xl rounded-bl-2xl bg-gradient2 ">
        {number}
      </p>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-white  font-bold text-lg lg:text-2xl">{title}</h3>
        <p className="text-white /80 text-justify text-md">{description}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Pilih Unit",
      description: "Temukan iPhone yang sesuai dengan kebutuhanmu.",
    },
    {
      number: "02",
      title: "Isi Formulir Penyewaan",
      description: "Tentukan unit, tanggal, durasi, dan metode penerimaan.",
    },
    {
      number: "03",
      title: "Kirim ke WhatsApp",
      description: "Detail pesanan otomatis dikirim ke tim iRent.",
    },
    {
      number: "04",
      title: "Konfirmasi",
      description: "Kami konfirmasi ketersediaan dan detail penyewaanmu.",
    },
  ];

  return (
    <section className="w-full flex flex-col justify-start mt-32 items-center px-4 lg:px-16 gap-16 overflow-hidden">
      <motion.h2
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=" w-fit text-2xl lg:text-4xl  text-gradient2 font-semibold text-center col-end-4"
      >
        Semudah Ini
      </motion.h2>
      <div className="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((item, index) => (
          <StepCard
            key={item.number}
            number={item.number}
            title={item.title}
            description={item.description}
            isFirst={index === 0}
            index={index}
          />
        ))}
      </div>
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex h-full w-full flex justify-center items-center"
      >
        <Link
          href="/sewa-iphone"
          className=" px-6 py-2 text-primary bg-gradient2 rounded-full hover:bg-gradient2/90"
        >
          Sewa iPhone
        </Link>
      </motion.div>
    </section>
  );
}
