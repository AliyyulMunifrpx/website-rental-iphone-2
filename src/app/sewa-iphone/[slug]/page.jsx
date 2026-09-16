import { notFound } from "next/navigation";

import { iPhones } from "../../../data/iphones.js";
import { store } from "../../../data/store.js";
import MainLayout from "../../../components/layouts/main-layout.jsx";
import CtaSection from "../../../components/home/cta-section.jsx";
import IphoneDetailContent from "../../../components/iPhone/detail.jsx";

function formatPrice(price) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function getPhone(slug) {
  return iPhones.find((item) => slugify(item.name) === slug);
}

export function generateStaticParams() {
  return iPhones.map((item) => ({
    slug: slugify(item.name),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const phone = getPhone(slug);

  if (!phone) {
    return { title: `iPhone tidak ditemukan` };
  }

  const title = `Sewa ${phone.name} di ${store.city}`;
  const description = `Sewa ${phone.name} di ${store.city}, cocok untuk kebutuhan ngonten, event, liburan atau yang lain, mulai dari ${formatPrice(
    phone.prices[0].price,
  )}. Proses cepat, syarat gampang.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/sewa-iphone/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/sewa-iphone/${slug}`,
      siteName: store.name,
      locale: "id_ID",
      type: "website",
      images: phone.url ? [{ url: phone.url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: phone.url ? [phone.url] : undefined,
    },
  };
}

export default async function IphoneDetailPage({ params }) {
  const { slug } = await params;
  const phone = getPhone(slug);

  if (!phone) {
    notFound();
  }

  return (
    <MainLayout>
      <IphoneDetailContent phone={phone} slug={slug} />
      <CtaSection></CtaSection>
    </MainLayout>
  );
}
