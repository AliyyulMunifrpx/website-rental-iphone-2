"use client";

import { ShieldCheck, Zap, Wallet, ArrowRight, Truck } from "lucide-react";
import Link from "next/link.js";
import { store } from "../../data/store.js";
import { motion } from "framer-motion";

function BenefitCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="flex-1 flex flex-col items-start backdrop-blur-md bg-primary/50 p-4 gap-8 rounded-2xl border-1 border-white/20 "
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient2">
        <Icon className="w-6 h-6 text-primary " />
      </div>
      <div className="flex flex-col gap-4">
        {" "}
        <h3 className="text-white font-bold text-lg lg:text-2xl">{title}</h3>
        <p className="text-white/80 text-md text-justify">{description}</p>
      </div>
    </motion.div>
  );
}

export default function BenefitSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Unit Original & Terawat",
      description:
        "Semua unit terjamin original dan dirawat dengan baik agar tetap nyaman digunakan selama masa sewa.",
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      description:
        "Pesan hari ini, proses langsung kami tangani agar unit bisa segera kamu gunakan.",
    },
    {
      icon: Wallet,
      title: "Harga Transparan",
      description:
        "Harga yang kamu lihat adalah harga yang kamu bayar, tanpa biaya tambahan yang muncul tiba-tiba.",
    },
    {
      icon: Truck,
      title: "Free COD",
      description:
        "Bisa ketemuan langsung untuk mengambil unit tanpa biaya pengantaran tambahan.",
    },
  ];

  return (
    <section className=" w-full flex flex-col justify-start mt-32 items-center  px-4 lg:px-16 gap-16 overflow-hidden">
      <motion.h2
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-white text-2xl lg:text-4xl text-center font-semibold w-full"
      >
        Kenapa Harus{" "}
        <span className=" w-fit text-2xl lg:text-4xl text-gradient2 font-semibold text-start col-end-4">
          {store.name}?
        </span>{" "}
      </motion.h2>

      <div className="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, index) => (
          <BenefitCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
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
