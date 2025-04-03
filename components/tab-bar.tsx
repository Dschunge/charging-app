"use client";

import React from "react";
import { Button } from "./ui/button";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex h-16 z-10">
      <Button
        variant="ghost"
        className={`flex-1 flex flex-col items-center justify-center rounded-none h-full ${
          activeTab === "payment" ? "bg-primary/10" : ""
        }`}
        onClick={() => onTabChange("payment")}
      >
        <span className="text-xl mb-1">💳</span>
        <span className="text-xs">Payment</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex-1 flex flex-col items-center justify-center rounded-none h-full ${
          activeTab === "info" ? "bg-primary/10" : ""
        }`}
        onClick={() => onTabChange("info")}
      >
        <span className="text-xl mb-1">ℹ️</span>
        <span className="text-xs">Infos</span>
      </Button>
    </div>
  );
}
