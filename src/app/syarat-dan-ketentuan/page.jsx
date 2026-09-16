import React from "react";

import { store } from "../../data/store.js";
import MainLayout from "../../components/layouts/main-layout.jsx";
import TermsContent from "../../components/terms-and-condition/page.jsx";

export const metadata = {
  title: `Syarat & Ketentuan Sewa iPhone`,
  description: `Pelajari syarat dan ketentuan sewa iPhone di ${store.name} ${store.city}. Proses cepat, persyaratan transparan, dan jaminan unit original.`,
};

export default function TermsPage() {
  return (
    <MainLayout>
      <TermsContent />
    </MainLayout>
  );
}
