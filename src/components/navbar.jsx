"use client";

import { useState } from "react";
import Link from "next/link.js";
import { store } from "../data/store.js";
import Image from "next/image.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    {
      name: "Beranda",
      url: "/",
    },
    {
      name: "iPhone",
      url: "/sewa-iphone",
    },
    {
      name: "Syarat dan ketentuan",
      url: "/syarat-dan-ketentuan",
    },
    {
      name: "Kontak",
      url: "/kontak",
    },
    {
      name: "Legal",
      url: "/legal",
    },
  ];

  return (
    <div className="w-full h-16 flex items-center px-4 lg:px-40 pt-8">
      <div className="relative w-full h-16 bg-black/30 lg:bg-black/30 backdrop-blur-md px-4 md:px-8 lg:px-16 border-[0.5px] border-white/30 rounded-full">
        <div className="absolute left-2  top-2 flex gap-2 items-center font-bold text-[#101010] text-2xl">
          <Image
            alt={store.name + "logo"}
            width={50}
            height={50}
            src="/assets/logo wave.webp"
          ></Image>
          {/* <Link
          href="/"
          className="font-bold text-[#101010] text-2xl"
          onClick={() => setIsOpen(false)}
        >
          {store.name}{" "}
        </Link> */}
        </div>

        {/* Desktop menu — posisi & layout persis seperti semula, cuma disembunyikan di bawah lg */}
        <div className="hidden lg:flex w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 gap-16 justify-end pr-16 xl:justify-center xl:pr-0">
          {menu.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.url}
                className=" tracking-wide text-white font-extralight"
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Hamburger — cuma muncul di bawah lg, gak ganggu layout desktop */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden absolute right-4 md:right-8 top-4 w-8 h-8 flex flex-col items-center justify-center gap-[4px]"
        >
          <span
            className={`block w-8 h-[2px] bg-white transition-transform duration-200 ${
              isOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-8 h-[2px] bg-white transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-8 h-[2px] bg-white transition-transform duration-200 ${
              isOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Dropdown mobile/tablet */}
        <div
          className={`lg:hidden absolute top-16 left-0 w-full bg-black/30 rounded-2xl backdrop-blur-md overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isOpen ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-8 px-4 md:px-8 py-8">
            {menu.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="tracking-wide text-white"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
