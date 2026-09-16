"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { store } from "../../data/store.js";

function Rating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => {
        const value = rating - index;

        if (value >= 1) {
          return <Star key={index} className="w-4 h-4 fill-white text-white" />;
        }

        if (value === 0.5) {
          return (
            <div key={index} className="relative w-4 h-4">
              <Star className="absolute inset-0 w-4 h-4 fill-white/20 text-white/20" />

              <div className="absolute inset-0 w-1/2 overflow-hidden">
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
            </div>
          );
        }

        return (
          <Star key={index} className="w-4 h-4 fill-white/20 text-white/20" />
        );
      })}
    </div>
  );
}

function TestimonialCard({ name, role, text, rating, index }) {
  return (
    <motion.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col gap-8 h-full"
    >
      <p className="text-md lg:text-xl font-light leading-relaxed text-white">
        “{text}”
      </p>

      <div className="flex justify-between mt-auto">
        <div>
          <p className="font-semibold text-white text-lg lg:text-2xl">{name}</p>
          <p className="text-md text-white/80">{role}</p>
        </div>

        <Rating rating={rating} />
      </div>
    </motion.div>
  );
}

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Raka",
      role: `Pelanggan ${store.name}`,
      rating: 5,
      text: "Prosesnya cepat, unitnya bersih dan sesuai yang dijanjikan.",
    },
    {
      name: "Nadia",
      role: `Pelanggan ${store.name}`,
      rating: 4.5,
      text: "Sangat membantu untuk kebutuhan konten. Tinggal pilih unit dan langsung chat.",
    },
    {
      name: "Fajar",
      role: `Pelanggan ${store.name}`,
      rating: 5,
      text: "Harganya jelas dari awal dan proses sewanya nggak ribet.",
    },
  ];

  return (
    <section className="w-full px-4 lg:px-16 flex flex-col mt-32 gap-8 lg:gap-16 overflow-hidden">
      <motion.h2
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-white text-2xl lg:text-4xl text-center font-semibold w-full"
      >
        Apa{" "}
        <span className=" w-fit text-2xl lg:text-4xl text-gradient2 font-semibold text-start col-end-4">
          Kata Mereka.
        </span>
      </motion.h2>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 -mx-4 px-4 pb-4 lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {testimonials.map((item, index) => (
          <div
            key={item.name}
            className="shrink-0 w-full snap-center lg:shrink lg:w-auto lg:snap-none"
          >
            <TestimonialCard
              name={item.name}
              role={item.role}
              text={item.text}
              rating={item.rating}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
