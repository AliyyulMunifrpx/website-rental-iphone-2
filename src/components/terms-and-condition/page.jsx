"use client";

import Link from "next/link.js";
import { motion } from "framer-motion";
import { termsData } from "../../data/store.js";
import CtaSection from "../../components/home/cta-section.jsx";

const TermItem = ({ title, description, index }) => {
  return (
    <motion.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="space-y-2 lg:space-y-4"
    >
      <h2 className="text-lg lg:text-2xl font-bold text-white tracking-tight">
        {title}
      </h2>
      <p className="text-base text-md leading-relaxed text-white/80">
        {description}
      </p>
    </motion.div>
  );
};

export default function TermsContent() {
  return (
    <>
      <section className="w-full px-4 lg:px-48 mt-24 flex flex-col gap-8 lg:gap-16 justify-center overflow-hidden">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className=" w-full text-2xl lg:text-4xl text-gradient2 font-semibold text-center  col-end-4">
            Syarat & Ketentuan.
          </h1>
        </motion.div>

        <div className="flex flex-col gap-8">
          {termsData.map((term, index) => (
            <TermItem
              key={term.id}
              title={term.title}
              description={term.description}
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
            className="px-6 py-2 text-black bg-gradient2 rounded-full hover:bg-gradient2/90"
          >
            Sewa Sekarang
          </Link>
        </motion.div>
      </section>

      <CtaSection />
    </>
  );
}
