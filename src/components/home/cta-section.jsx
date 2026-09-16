import Image from "next/image.js";
import Link from "next/link.js";

export default function CtaSection() {
  return (
    <div className="mt-40 w-full px-4 lg:px-16 lg:h-[70dvh] flex items-end rounded-2xl">
      <div className="w-full h-[50dvh] bg-gradient2 grid grid-cols-1 lg:grid-cols-2 grid-rows-1 rounded-3xl relative">
        <div className="col-start-1 flex flex-col justify-center px-4 lg:pl-16 items-center">
          <p className="text-primary w-full text-3xl lg:text-4xl font-extralight text-center">
            iPhone yang kamu mau, <br />
            <span className=" w-full text-2xl lg:text-4xl text-primary font-semibold text-center col-end-4">
              {" "}
              siap dipakai hari ini.
            </span>
          </p>

          <div className="flex mt-8">
            <Link
              href="/sewa"
              className=" px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90"
            >
              Isi Formulir
            </Link>
          </div>
        </div>

        <div className="hidden lg:block col-start-2 relative w-full h-full ">
          <div className="absolute bottom-0 left-0 w-full h-[160%] overflow-hidden rounded-br-3xl flex items-end">
            <Image
              alt="iphone"
              src="/assets/cta-section/iphone.webp"
              width={800}
              height={800}
              className="w-full translate-y-[5%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
