"use client";
import Image from "next/image";
import Link from "next/link.js";
function formatPrice(price) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}
export function PhoneCard({
  url,
  name,
  price,
  badge,
  basePath = "/sewa-iphone",
  priceSuffix,
  index,
}) {
  const slug = slugify(name);

  return (
    <div className="w-full h-auto ">
      <Link
        href={`${basePath}/${slug}`}
        className="w-full h-full p-2 lg:p-4 flex flex-col gap-4 backdrop-blur-md bg-primary/50 border-1 border-white/20 rounded-2xl hover:shadow-xl shadow-primary2/20"
      >
        <div className="w-full h-fit aspect-[3/2] bg-primary2/10 rounded-2xl p-2 flex items-center justify-center transition ease-out lg:hover:scale-105">
          <Image
            alt={name}
            src={url}
            width={400}
            height={400}
            className="w-auto h-full aspect-square object-contain transition ease-out"
          />
        </div>

        <h4 className="text-white w-full text-center font-bold text-md lg:text-2xl">
          {name}
        </h4>

        <div className="flex gap-4 w-full h-full justify-between items-center">
          <div className="flex flex-col items-start">
            {priceSuffix ? (
              <p className="text-sm lg:text-md text-white/80">{priceSuffix}</p>
            ) : (
              <p className="text-sm lg:text-md text-white/80">Mulai</p>
            )}

            <div className="flex items-baseline gap-1">
              <p className="text-md lg:text-xl text-white font-bold">
                {formatPrice(price)}
              </p>
            </div>
          </div>
        </div>
        <span className="px-4 py-2 whitespace-nowrap text-center rounded-full bg-gradient2 hover:bg-gradient2/90 text-primary text-sm lg:text-md">
          Sewa Sekarang
        </span>
      </Link>
    </div>
  );
}
