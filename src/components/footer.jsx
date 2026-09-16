import Link from "next/link.js";
import { store } from "../data/store.js";

export default function Footer() {
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
    <footer className="min-h-[70dvh] w-full bg-primary text-[#ffffff] mt-32 px-6 md:px-12 lg:px-20 py-12 flex flex-col justify-between">
      {/* Top */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div className="flex flex-col justify-between gap-16">
          {/* Brand */}
          <div>
            <h2 className=" w-fit text-5xl py-3 lg:text-7xl text-gradient2 font-semibold text-start col-end-4">
              {store.name}{" "}
            </h2>

            <p className="mt-6 max-w-md text-lg text-[#ffffff]/80 leading-relaxed">
              Pakai iPhone terbaru tanpa harus membelinya. Sewa dengan proses
              mudah, cepat, dan transparan.
            </p>
          </div>

          {/* Navigation + Contact */}
          <div className="grid grid-cols-2 gap-12">
            {/* Navigation */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-5">
                Navigasi
              </h3>

              <nav className="flex flex-col gap-3 text-[#ffffff]/80">
                {menu.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.url}
                      className="hover:text-[#ffffff] transition-colors"
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-5">
                Hubungi Kami
              </h3>

              <div className="flex flex-col gap-3 text-[#ffffff]/80">
                <a
                  target="_blank"
                  href={`https://wa.me/${store.whatsapp}`}
                  className="hover:text-[#ffffff] transition-colors"
                >
                  WhatsApp
                </a>

                <Link
                  href={store.instagram}
                  className="hover:text-[#ffffff] transition-colors"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[400px] lg:h-full min-h-[400px] overflow-hidden rounded-3xl">
          <iframe
            title="Map lokasi sewa iphone"
            src={store.maps}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-sm text-[#ffffff]/80">
        <p>
          © {new Date().getFullYear()} {store.name}
        </p>

        <p>Sewa iPhone di {store.city}</p>

        <p>Built with care.</p>
      </div>
    </footer>
  );
}
