"use client";

import { Header } from "@/components/header";
import { InfoSection } from "@/components/info-section";
import { PaymentMethods } from "@/components/payment-methods";
import { TabBar } from "@/components/tab-bar";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("payment");

  return (
    <main className="min-h-screen flex flex-col pb-16">
      <Header />
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {activeTab === "payment" ? <PaymentMethods /> : <InfoSection />}
      </div>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
