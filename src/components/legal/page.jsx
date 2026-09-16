"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reveal = {
  initial: { y: 24},
  whileInView: { y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function LegalContent({ store }) {
  return (
    <section className="w-full px-4 lg:px-16 mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          {...reveal}
          className="flex flex-col items-center gap-4 mb-16 text-center"
        >
          <h1 className=" w-full text-2xl lg:text-4xl  text-gradient2 font-semibold text-center   col-end-4">
            Legalitas & Transparansi
          </h1>
          <p className="text-white/70 text-md text-center   w-full ">
            Kepercayaan dan keamanan pelanggan adalah prioritas kami.{" "}
            {store.name} beroperasi secara sah dan mematuhi regulasi yang
            berlaku di {store.city}.
          </p>
        </motion.div>

        {/* Section Dokumen Foto */}
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white">Dokumen Perizinan</h2>
          <p className="text-white/70 text-md mb-8">
            Berikut adalah salinan dokumen legalitas operasional bisnis kami
            sebagai jaminan keamanan bertransaksi di {store.name}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dokumen 1 */}
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="/assets/doc/1.webp"
                  alt={`Dokumen Legal 1 ${store.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  Nomor Induk Berusaha (NIB)
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  Bukti registrasi pendaftaran penanaman modal dan perizinan
                  berusaha.
                </p>
              </div>
            </motion.div>

            {/* Dokumen 2 */}
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="/assets/doc/2.webp"
                  alt={`Dokumen Legal 2 ${store.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  Sertifikat Pendaftaran Pendirian Perseroan Perorangan{" "}
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  Dokumen resmi yang menyatakan legalitas domisili usaha di{" "}
                  {store.city}.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Section Kepatuhan Data */}
        <motion.div {...reveal} className=" rounded-3xl ">
          <h2 className="text-xl font-bold text-white mb-4">
            Komitmen Keamanan Data
          </h2>
          <div className="text-white/70 space-y-4 text-md lg:text-base leading-relaxed">
            <p>
              Selain legalitas usaha yang sah, {store.name} juga berkomitmen
              menjaga kerahasiaan data pribadi yang diserahkan pelanggan (KTP,
              SIM, Kartu Mahasiswa, dll) sebagai jaminan sewa.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Data jaminan hanya digunakan selama masa penyewaan berlangsung.
              </li>
              <li>
                Identitas pelanggan disimpan di tempat yang aman dan tidak akan
                disalahgunakan atau diperjualbelikan kepada pihak ketiga.
              </li>
              <li>
                Unit iPhone yang dikembalikan akan kami pastikan telah di-reset
                untuk menjaga privasi data digital Anda.
              </li>
            </ul>
            <p className="mt-6">
              Punya pertanyaan terkait legalitas atau prosedur penyewaan?
              Hubungi kami langsung melalui{" "}
              <a
                href={`https://wa.me/${store.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient2 font-extrabold hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
