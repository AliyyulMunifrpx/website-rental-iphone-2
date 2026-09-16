"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../components/layouts/main-layout.jsx";

import { iPhones } from "../../data/iphones.js";
import { store, termsData } from "../../data/store.js";

const STORAGE_KEY = store.name;

function formatPrice(price) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function findProduct(slug) {
  return iPhones.find((item) => slugify(item.name) === slug);
}

function getPresetDurations(product) {
  if (!product) return [24];
  if (product.prices && product.prices.length > 0) {
    return product.prices.map((p) => p.duration);
  }
  if (product.price) {
    return [24];
  }
  return [6]; // <-- Masih hardcoded default 6 jam
}

function getPriceInfo(product, duration) {
  if (!product) return { amount: 0, label: formatPrice(0) };

  if (product.prices) {
    const option = product.prices.find(
      (item) => item.duration === Number(duration),
    );
    if (option) {
      return { amount: option.price, label: formatPrice(option.price) };
    }
  }

  if (product.price && Number(duration) === 24) {
    return { amount: product.price, label: formatPrice(product.price) };
  }

  return { amount: 0, label: "Diskusikan via WhatsApp" };
}

function getDurationLabel(item) {
  return `${item.duration} jam`;
}

const revealUp = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const revealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function RentalPage() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    date: "",
    time: "",
    pickupMethod: "ambil", // <-- Hardcoded default value
    codLocation: "",
    note: "",
  });
  const [items, setItems] = useState([]);

  // State Syarat & Ketentuan
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedItems = localStorage.getItem(STORAGE_KEY);
    let currentItems = [];

    if (savedItems) {
      try {
        currentItems = JSON.parse(savedItems);
      } catch {
        currentItems = [];
      }
    }

    const params = new URLSearchParams(window.location.search);
    const queryUnit = params.get("unit");

    if (queryUnit) {
      const product = findProduct(queryUnit);

      if (product) {
        const exists = currentItems.some((item) => item.slug === queryUnit);

        if (!exists) {
          const presets = getPresetDurations(product);
          currentItems.push({
            type: "iphone",
            slug: queryUnit,
            duration: presets[0] || 6,
          });
        }
      }
    }

    setItems(currentItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const displayTotal = useMemo(() => {
    if (items.length === 0) return "Diskusikan via WhatsApp";

    let sum = 0;
    for (const item of items) {
      const product = findProduct(item.slug);
      const priceInfo = getPriceInfo(product, item.duration);

      if (priceInfo.label === "Diskusikan via WhatsApp") {
        return "Diskusikan via WhatsApp";
      }

      sum += priceInfo.amount;
    }

    return sum > 0 ? formatPrice(sum) : "Diskusikan via WhatsApp";
  }, [items]);

  function handleAddProduct() {
    if (!selectedProduct) return;

    const product = findProduct(selectedProduct);
    if (!product) return;

    const exists = items.some((item) => item.slug === selectedProduct);

    if (exists) return;

    const presets = getPresetDurations(product);

    const newItem = {
      type: "iphone",
      slug: selectedProduct,
      duration: presets[0] || 6,
    };

    setItems((current) => [...current, newItem]);
    setSelectedProduct("");
  }

  function handleRemoveItem(index) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  function handleIncrement(index) {
    setItems((current) =>
      current.map((item, i) => {
        if (i === index) {
          const product = findProduct(item.slug);
          const presets = getPresetDurations(product);
          const currentIndex = presets.indexOf(item.duration);

          if (currentIndex !== -1 && currentIndex < presets.length - 1) {
            return { ...item, duration: presets[currentIndex + 1] };
          } else {
            const lastPreset = presets[presets.length - 1] || 24;
            const nextDuration =
              item.duration >= lastPreset ? item.duration + 24 : lastPreset;
            return { ...item, duration: nextDuration };
          }
        }
        return item;
      }),
    );
  }

  function handleDecrement(index) {
    setItems((current) =>
      current.map((item, i) => {
        if (i === index) {
          const product = findProduct(item.slug);
          const presets = getPresetDurations(product);
          const currentIndex = presets.indexOf(item.duration);

          if (currentIndex > 0) {
            return { ...item, duration: presets[currentIndex - 1] };
          } else if (currentIndex === -1) {
            const lastPreset = presets[presets.length - 1] || 24;
            const nextDuration = item.duration - 24;
            return {
              ...item,
              duration: nextDuration >= lastPreset ? nextDuration : lastPreset,
            };
          }
        }
        return item;
      }),
    );
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleTermsScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setHasScrolledToBottom(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (items.length === 0) {
      alert("Silakan pilih minimal satu unit.");
      return;
    }

    if (!form.name || !form.whatsapp || !form.date || !form.time) {
      alert("Silakan lengkapi data penyewaan.");
      return;
    }

    if (form.pickupMethod === "cod" && !form.codLocation) {
      alert("Silakan isi lokasi COD.");
      return;
    }

    if (!isAgreed) {
      alert("Anda harus menyetujui Syarat & Ketentuan terlebih dahulu.");
      return;
    }

    const rentalItems = items
      .map((item) => {
        const product = findProduct(item.slug);
        if (!product) return null;

        const priceInfo = getPriceInfo(product, item.duration);

        return `- ${product.name} — ${getDurationLabel(item)} — ${
          priceInfo.label
        }`;
      })
      .filter(Boolean)
      .join("\n");

    const pickupInfo =
      form.pickupMethod === "cod"
        ? `COD\nLokasi COD: ${form.codLocation}`
        : "Ambil di Tempat";

    const message = `Halo ${store.name}, saya ingin melakukan penyewaan.
    
Nama:
${form.name}

No. WhatsApp:
${form.whatsapp}

Detail Penyewaan:
${rentalItems}

Tanggal Sewa:
${form.date}

Waktu Sewa:
${form.time}

Metode Pengambilan:
${pickupInfo}

Catatan:
${form.note || "-"}

Total Estimasi:
${displayTotal}

Mohon konfirmasi ketersediaan unit dan detail penyewaannya.`;

    const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <MainLayout>
      <section className="w-full px-4 lg:px-16 mt-24 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col w-full items-center gap-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
          >
            <h1 className="text-gradient2 w-full text-2xl text-center lg:text-4xl font-bold">
              Formulir Penyewaan
            </h1>

            <p className="w-full text-white/70 text-start text-md ">
              Pilih unit iPhone yang ingin kamu sewa, tentukan durasi, lengkapi
              data penyewaan, lalu kirim permintaan melalui WhatsApp.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-16">
            {/* UNIT */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealUp}
              >
                <h2 className="text-white text-2xl font-bold">
                  Unit Penyewaan
                </h2>

                <p className="text-white/60 mt-2">
                  Atur durasi sewa sesuai pilihan paket waktu yang tersedia.
                </p>
              </motion.div>

              {/* ITEM YANG SUDAH DIPILIH */}
              <motion.div
                className="flex flex-col gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={revealContainer}
              >
                {items.length === 0 ? (
                  <motion.div
                    variants={revealUp}
                    className="rounded-2xl border border-[#101010]/10 p-8 text-center"
                  >
                    <p className="text-white/60">
                      Belum ada unit yang dipilih.
                    </p>
                  </motion.div>
                ) : (
                  items.map((item, index) => {
                    const product = findProduct(item.slug);

                    if (!product) return null;

                    const priceInfo = getPriceInfo(product, item.duration);

                    return (
                      <motion.div
                        key={`${item.slug}-${index}`}
                        layout
                        initial={{ y: 16 }}
                        animate={{ y: 0 }}
                        exit={{ y: -16 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="rounded-2xl p-4 border border-[#101010]/10 flex flex-col  border-1 border-white/30 lg:flex-row lg:items-center gap-6"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative w-20 h-20 rounded-xl bg-[#101010]/5 flex items-center justify-center overflow-hidden">
                            <Image
                              src={product.url}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-contain"
                            />
                          </div>

                          <div>
                            <p className="text-white font-bold">
                              {product.name}
                            </p>

                            <p className="text-white/60 text-sm mt-1">
                              {priceInfo.label}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* TOMBOL - & + */}
                          <div className="flex items-center gap-3 bg-gradient2 px-3 py-2 rounded-full">
                            <button
                              type="button"
                              onClick={() => handleDecrement(index)}
                              className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-sm hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                              -
                            </button>
                            <div className="text-center min-w-[50px]">
                              <span className="text-sm font-semibold text-black">
                                {item.duration}
                              </span>
                              <span className="text-sm text-primary ml-2">
                                jam
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleIncrement(index)}
                              className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-sm hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="text-sm text-white hover:bg-red-600 bg-red-500 px-6 py-4 rounded-full cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>

              {/* TAMBAH UNIT */}
              <motion.div
                className="rounded-2xl p-6 border border-[#101010]/10 "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealUp}
              >
                <div className="mb-5">
                  <h3 className="text-white text-lg font-semibold">
                    Tambah Unit Penyewaan
                  </h3>
                  <p className="text-white/60 text-sm mt-1">
                    Tambahkan iPhone yang ingin kamu masukkan ke dalam
                    penyewaan.
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  <div className="flex flex-col gap-2 flex-1 w-full">
                    <label htmlFor="product" className="text-white text-sm">
                      Unit yang Disewa
                    </label>
                    <select
                      id="product"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full border border-white/30 rounded-full px-5 py-3 text-white outline-none"
                    >
                      <option value="" className="text-black">
                        Pilih iPhone
                      </option>
                      {iPhones.map((product) => (
                        <option
                          key={product.name}
                          value={slugify(product.name)}
                          className="text-black"
                        >
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="w-full lg:w-auto px-6 py-3 rounded-full bg-gradient2 text-primary hover:bg-gradient2/90 cursor-pointer whitespace-nowrap"
                  >
                    Tambah Unit
                  </button>
                </div>
              </motion.div>

              {/* DATA PENYEWA */}
              <motion.div
                className="flex flex-col gap-6 mt-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={revealContainer}
              >
                <motion.div variants={revealUp}>
                  <h2 className="text-white text-2xl font-bold">
                    Data Penyewa
                  </h2>

                  <p className="text-white/60 mt-2">
                    Isi data berikut untuk proses konfirmasi penyewaan.
                  </p>
                </motion.div>

                <motion.div
                  variants={revealUp}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* NAMA */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-white">
                      Nama (sesuai KTP)
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Nama lengkap"
                      required
                      className="w-full border border-white/30 rounded-xl px-5 py-3 text-white outline-none focus:border-white/30"
                    />
                  </div>

                  {/* WHATSAPP */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="whatsapp" className="text-sm text-white">
                      No. WhatsApp
                    </label>

                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={handleFormChange}
                      placeholder="08xxxxxxxxxx"
                      required
                      className="w-full border border-white/15 rounded-xl px-5 py-3 text-white outline-none focus:border-white/40"
                    />
                  </div>

                  {/* TANGGAL */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-sm text-white">
                      Tanggal Sewa
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-white/15 rounded-xl px-5 py-3 text-white outline-none focus:border-white/40"
                    />
                  </div>

                  {/* WAKTU */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="text-sm text-white">
                      Waktu Sewa (Jam Pengambilan atau Mulai)
                    </label>

                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={form.time}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-white/15 rounded-xl px-5 py-3 text-white outline-none focus:border-white/40"
                    />
                  </div>

                  {/* METODE PENGAMBILAN */}
                  <div className="flex flex-col gap-2 lg:col-span-2">
                    <label
                      htmlFor="pickupMethod"
                      className="text-sm text-white"
                    >
                      Metode Pengambilan
                    </label>

                    <select
                      id="pickupMethod"
                      name="pickupMethod"
                      value={form.pickupMethod}
                      onChange={handleFormChange}
                      className="w-full border border-white/15 rounded-xl px-5 py-3 text-white outline-none focus:border-white/40"
                    >
                      {/* Opsi ini bisa di-mapping dari store.pickupMethods kalau mau dibikin dinamis */}
                      <option value="ambil" className="text-primary">
                        Ambil di Tempat
                      </option>
                      <option value="cod" className="text-primary">
                        COD
                      </option>
                    </select>
                  </div>

                  {/* LOKASI COD */}
                  {form.pickupMethod === "cod" && (
                    <motion.div
                      initial={{ y: -12 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="flex flex-col gap-2 lg:col-span-2"
                    >
                      <label
                        htmlFor="codLocation"
                        className="text-sm text-white"
                      >
                        Lokasi COD
                      </label>

                      <textarea
                        id="codLocation"
                        name="codLocation"
                        value={form.codLocation}
                        onChange={handleFormChange}
                        placeholder="Masukkan lokasi COD secara lengkap..."
                        rows={3}
                        required
                        className="w-full border border-white/15 rounded-xl px-5 py-3 text-white outline-none resize-none focus:border-white/40"
                      />
                    </motion.div>
                  )}

                  {/* CATATAN */}
                  <div className="flex flex-col gap-2 lg:col-span-2">
                    <label htmlFor="note" className="text-sm text-white">
                      Catatan
                    </label>

                    <textarea
                      id="note"
                      name="note"
                      value={form.note}
                      onChange={handleFormChange}
                      placeholder="Tambahkan catatan jika diperlukan..."
                      rows={4}
                      className="w-full border border-white/15 rounded-xl px-5 py-3 text-white outline-none resize-none focus:border-white/40"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* CHECKBOX SYARAT & KETENTUAN */}
              <motion.div
                className="flex flex-col gap-2 pt-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealUp}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    disabled={!hasScrolledToBottom}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <label
                    htmlFor="termsAgreement"
                    className={`text-sm select-none ${
                      !hasScrolledToBottom
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-white cursor-pointer"
                    }`}
                  >
                    Saya telah membaca dan menyetujui{" "}
                    <button
                      type="button"
                      onClick={() => setIsTermsOpen(true)}
                      className="text-gradient2 underline font-semibold hover:text-gradient2/50 cursor-pointer inline"
                    >
                      Syarat dan Ketentuan
                    </button>
                  </label>
                </div>

                {!hasScrolledToBottom && (
                  <p className="text-xs text-white italic ml-8">
                    * Klik dan baca Syarat & Ketentuan hingga akhir untuk dapat
                    mengaktifkan centang.
                  </p>
                )}
              </motion.div>

              {/* TOTAL + SUBMIT */}
              <motion.div
                className="border-t border-[#101010]/10 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealUp}
              >
                <div>
                  <p className="text-white/60 text-sm">Estimasi total</p>

                  <p className="text-white text-3xl font-bold mt-1">
                    {displayTotal}
                  </p>

                  <p className="text-white/50 text-sm mt-2">
                    Informasi ketersediaan akan dikonfirmasi melalui WhatsApp.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!isAgreed}
                  className="px-8 py-4 rounded-full bg-gradient2 hover:bg-gradient2/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-primary cursor-pointer font-medium transition-colors"
                >
                  Kirim Form
                </button>
              </motion.div>
            </div>
          </form>
        </div>
      </section>

      {/* MODAL SYARAT & KETENTUAN */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl max-w-2xl w-full flex flex-col max-h-[85vh] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">
                  Syarat & Ketentuan
                </h2>
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body dengan listener Scroll */}
              <div
                onScroll={handleTermsScroll}
                className="p-6 overflow-y-auto flex flex-col gap-6 flex-1 text-left"
              >
                {termsData.map((term) => (
                  <div key={term.id} className="space-y-1">
                    <h3 className="text-lg font-bold text-black">
                      {term.title}
                    </h3>
                    <p className="text-sm text-black/80 leading-relaxed">
                      {term.description}
                    </p>
                  </div>
                ))}

                {hasScrolledToBottom && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                    <p className="text-xs text-green-700 font-medium">
                      ✓ Anda telah membaca seluruh syarat dan ketentuan.
                      Sekarang Anda dapat menyetujui.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50">
                <p className="text-xs text-gray-500 text-center sm:text-left">
                  {!hasScrolledToBottom
                    ? "Gulir sampai paling bawah untuk dapat menutup & menyetujui."
                    : "Silakan tutup modal dan beri centang pada form."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#101010] hover:bg-[#101010]/90 text-white rounded-full font-medium transition-colors cursor-pointer text-sm"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
