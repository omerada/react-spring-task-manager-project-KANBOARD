import React from "react";
import { Header } from "./Header";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        {children}
      </div>
    </div>
  );
};
