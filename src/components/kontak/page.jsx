"use client";

import React, { useState } from "react";
import { store } from "../../data/store.js";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactForm() {
  // State untuk menampung isi form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Handler saat user mengetik
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handler saat tombol submit ditekan
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah page reload

    // Format pesan untuk dikirim via WhatsApp
    const textWa = `Halo, saya ${formData.name}.%0A%0A*Nomor WA:* ${
      formData.phone
    }%0A*Keperluan:* ${formData.subject || "Lainnya"}%0A*Pesan:* ${
      formData.message
    }`;

    // Membuka tab baru yang mengarah ke WhatsApp Store
    window.open(`https://wa.me/${store.whatsapp}?text=${textWa}`, "_blank");

    // Kosongkan form setelah pesan terkirim
    setFormData({ name: "", phone: "", subject: "", message: "" });
  };

  // Fungsi untuk memformat nomor WA Indonesia
  const formatWhatsAppNumber = (number) => {
    if (!number) return "";

    const str = number.toString();

    // Mengecek apakah nomor diawali dengan 62
    if (str.startsWith("62")) {
      // Memotong string: +62 | 823 | 2947 | sisa digit (5745)
      return `+62 ${str.slice(2, 5)}-${str.slice(5, 9)}-${str.slice(9)}`;
    }

    // Jika formatnya bukan 62, kembalikan nilai aslinya
    return str;
  };

  return (
    <main className="w-full min-h-[100dvh] text-primary pt-24 px-4 lg:px-48 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-full mb-16"
        >
          <h1 className=" w-full text-2xl lg:text-4xl  text-gradient2 font-semibold text-center  col-end-4">
            Ada Pertanyaan? <br />
          </h1>
          <p className="mt-4 text-white/70 text-center   text-md">
            Butuh konsultasi sewa iPhone, tanya ketersediaan stok, atau mau
            tanya seputar jaminan? Hubungi kami langsung.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Information Column (5 cols) */}
          <motion.div
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="p-8 rounded-3xl bg-gradient2 text-white flex flex-col justify-between relative overflow-hidden">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Informasi Kontak
                </h2>
                <p className="text-primary text-sm">
                  Tim kami siap membalas pesan kamu pada jam operasional.
                </p>

                <div className="mt-8 flex flex-col gap-8">
                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-primary rounded-2xl shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-primary font-medium uppercase tracking-wider">
                        WhatsApp Fast Response
                      </p>
                      <a
                        href={`https://wa.me/${store.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:text-primary/50 transition-colors"
                      >
                        {formatWhatsAppNumber(store.whatsapp)}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-primary rounded-2xl shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-primary font-medium uppercase tracking-wider">
                        Lokasi Store
                      </p>
                      <a
                        href={store.mapsUrl}
                        className="text-primary font-medium hover:text-primary/50 transition-colors"
                      >
                        {store.city}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note inside card */}
              <div className="pt-8 mt-8 border-t flex gap-4 items-center justify-center border-primary">
                <div className="flex items-center gap-3">
                  {/* Instagram */}
                  <a
                    href={store.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-3 bg-primary hover:bg-primary/50 rounded-xl text-white transition-colors flex items-center justify-center"
                  >
                    <FaInstagram />
                  </a>

                  {/* TikTok */}
                  <a
                    href={store.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="p-3 bg-primary hover:bg-primary/50 rounded-xl text-white transition-colors flex items-center justify-center"
                  >
                    <FaTiktok />
                  </a>
                </div>
                <p className="text-xs text-primary">
                  {store.name} {store.city} — Solusi Sewa iPhone Mudah &
                  Terpercaya.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Column (7 cols) */}
          <motion.div
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 p-4"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Kirim Pesan</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nama */}
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-white"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-4 rounded-2xl border border-[#101010]/15 bg-white text-primary focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all text-sm"
                  />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-white"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="08123456789"
                    className="w-full px-4 py-4 rounded-2xl border border-[#101010]/15 bg-white text-primary focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Subjek / Unit */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-white"
                >
                  Unit / Keperluan
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-2xl border border-[#101010]/15 bg-white text-primary focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all text-sm"
                >
                  <option value="">Pilih Keperluan...</option>
                  <option value="sewa-iphone">Tanya Stok & Sewa iPhone</option>
                  <option value="syarat">Tanya Syarat & Ketentuan</option>
                  <option value="partnership">Kerjasama / Partnership</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              {/* Pesan */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-white"
                >
                  Pesan Anda
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Halo, saya ingin bertanya tentang..."
                  className="w-full px-4 py-4 rounded-2xl border border-[#101010]/15 bg-white text-primary focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full py-4 px-8 rounded-full bg-gradient2 hover:bg-gradient2/90 text-black font-medium transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-4"
              >
                <span>Kirim Pesan</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
