import { store } from "../../data/store.js";
import MainLayout from "../../components/layouts/main-layout.jsx";
import CtaSection from "../../components/home/cta-section.jsx";
import LegalContent from "../../components/legal/page.jsx";

export const metadata = {
  title: `Legalitas & Dokumen Resmi | ${store.name}`,
  description: `Informasi legalitas, dokumen resmi, dan transparansi layanan sewa iPhone ${store.name} di ${store.city}.`,
  openGraph: {
    title: `Legalitas | ${store.name}`,
    description: `Dokumen resmi dan legalitas operasi ${store.name}.`,
    url: "/legal",
    siteName: store.name,
    locale: "id_ID",
    type: "website",
  },
};

export default function LegalPage() {
  return (
    <MainLayout>
      <LegalContent store={store} />
      <CtaSection></CtaSection>
    </MainLayout>
  );
}
