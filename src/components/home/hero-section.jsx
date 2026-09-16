"use client";

import Image from "next/image.js";
import Link from "next/link.js";
import { store } from "../../data/store.js";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative grid grid-cols-3 grid-rows-3 h-[100dvh] w-full ">
      {/* CONTAINER GAMBAR */}
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-center col-start-1 col-end-4 row-start-1 row-end-3 lg:row-end-4 w-full h-full"
      >
        <Image
          alt=""
          src="/assets/iphones.webp"
          width={1000}
          height={1000}
          className="object-contain translate-y-[140%] md:translate-y-[130%] lg:translate-y-[75%] w-[60%] h-[60%] lg:w-[80%] lg:h-[80%]"
        />
      </motion.div>

      {/* CONTAINER TEKS & TOMBOL */}
      <div className="relative z-10 col-start-1 w-full row-start-1 lg:row-start-1 flex flex-col justify-center lg:justify-center items-center row-end-3 col-end-4">
        <motion.h1
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-white w-full text-3xl lg:text-4xl text-center font-extralight "
        >
          Sewa iPhone {store.city}
        </motion.h1>

        <motion.p
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className=" w-fit text-2xl lg:text-6xl text-gradient py-2 font-semibold text-center col-end-4"
        >
          Rent, Ready, Go!
        </motion.p>

        <motion.div
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="flex mt-4"
        >
          <Link
            href="/sewa-iphone"
            className=" px-6 py-2 text-white border-1 border-white bg-white/0 rounded-full hover:border-white/50"
          >
            Sewa sekarang{" "}
          </Link>
          <div className="h-full aspect-square bg-white ml-2 rounded-full text-black flex items-center justify-center">
            <ArrowRight></ArrowRight>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
