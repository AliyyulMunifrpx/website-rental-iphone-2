"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { iPhones } from "../../data/iphones.js";
import { PhoneCard } from "../phone-card.jsx";

// 1. Definisikan variant untuk container grid (mengatur stagger/jeda antar elemen)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda munculnya setiap kartu (0.1 detik)
    },
  },
};

// 2. Definisikan variant untuk setiap kartu (animasi masuk dari bawah)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function IphoneCatalog() {
  const [search, setSearch] = useState("");

  const filteredIPhones = iPhones.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    // Tambahkan overflow-hidden untuk mencegah scrollbar horizontal bocor jika animasi dari sumbu x
    <section className="h-auto w-full flex flex-col mt-24 justify-start items-center px-4 lg:px-16 gap-16 overflow-hidden">
      {/* HEADER REVEAL ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }} // Reveal saat elemen 50px masuk ke viewport
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <h1 className="text-white text-2xl lg:text-4xl font-semibold text-center ">
          Katalog{" "}
          <span className="w-fit text-2xl lg:text-4xl text-gradient2 font-semibold text-start col-end-4">
            iPhone
          </span>
        </h1>

        <div className="relative w-full lg:w-80">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#101010]/50"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari iPhone..."
            className="w-full rounded-full border border-[#101010]/15 bg-white py-3 pl-12 pr-5 text-sm text-[#101010] outline-none transition focus:border-[#101010]/40"
          />
        </div>
      </motion.div>

      {/* GRID REVEAL ANIMATION */}
      {filteredIPhones.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 h-full w-full gap-8"
        >
          {filteredIPhones.map((item, i) => (
            // Bungkus setiap PhoneCard dengan motion.div untuk menerima animasi dari itemVariants
            <motion.div key={item.name} variants={itemVariants}>
              <PhoneCard
                url={item.url}
                name={item.name}
                price={item.prices[0].price}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full py-20 text-center"
        >
          <p className="text-[#101010]/60">
            iPhone yang kamu cari tidak ditemukan.
          </p>
        </motion.div>
      )}
    </section>
  );
}
