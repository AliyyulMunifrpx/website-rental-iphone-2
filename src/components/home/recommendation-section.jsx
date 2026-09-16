"use client";

import Link from "next/link";
import { iPhones } from "../../data/iphones.js";
import { PhoneCard } from "../phone-card.jsx";
import { motion } from "framer-motion";

export default function RecommendationSection() {
  const dataiPhones = [...iPhones].sort(
    (a, b) => Boolean(b.badge) - Boolean(a.badge),
  );
  const iPhone = dataiPhones.slice(0, 8);

  return (
    <section className="h-auto w-full flex flex-col mt-8 lg:mt-[50%] xl:mt-[30%] justify-start items-center px-4 lg:px-16 gap-16 overflow-hidden">
      <motion.h2
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-white text-2xl lg:text-4xl text-center w-full font-semibold "
      >
        Pilihan{" "}
        <span className=" w-fit text-2xl lg:text-4xl text-gradient2 font-semibold text-start col-end-4">
          Untukmu
        </span>{" "}
      </motion.h2>

      <div className="h-full w-full flex flex-col gap-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex justify-between items-center"
        >
          <h3 className="text-lg lg:text-3xl text-white font-bold">iPhone</h3>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 h-full w-full gap-8">
          {iPhone.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            >
              <PhoneCard
                url={item.url}
                name={item.name}
                price={item.prices[0].price}
                badge={item.badge}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex h-full w-full justify-center items-center"
      >
        <Link
          href="/sewa-iphone"
          className=" px-6 py-2 text-primary bg-gradient2 rounded-full hover:bg-gradient2/90"
        >
          Lihat semua unit{" "}
        </Link>
      </motion.div>
    </section>
  );
}
