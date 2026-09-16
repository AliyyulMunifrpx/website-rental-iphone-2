"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function formatPrice(price) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

const revealUp = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function IphoneDetailContent({ phone, slug }) {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4 lg:px-16 mt-24">
      <motion.div
        className="w-full lg:w-1/2 aspect-square relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={revealUp}
      >
        <Image
          alt={phone.name}
          src={phone.url}
          fill
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-start gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={revealUp}
        transition={{ delayChildren: 0.1, staggerChildren: 0.08 }}
      >
        {phone.badge && (
          <motion.span
            variants={revealUp}
            className="px-4 py-2 rounded-full bg-gradient2 text-primary text-sm"
          >
            {phone.badge}
          </motion.span>
        )}

        <motion.h1
          variants={revealUp}
          className="text-gradient2 text-2xl lg:text-4xl font-bold"
        >
          {phone.name}
        </motion.h1>

        <motion.div variants={revealUp} className="flex flex-col gap-2 w-full">
          {phone.prices.map((option) => (
            <div
              key={option.duration}
              className="flex justify-between items-center w-full py-2 border-b border-white/10"
            >
              <p className="text-white/80 text-md">{option.duration} jam</p>

              <p className="text-white font-bold text-md lg:text-xl">
                {formatPrice(option.price)}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={revealUp} className="flex mt-8 w-full lg:w-auto">
          <Link
            href={`/sewa?unit=${slug}`}
            className="w-full lg:w-auto text-center px-6 py-2 text-primary bg-gradient2 hover:bg-gradient2/90 rounded-full"
          >
            Sewa Sekarang
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
