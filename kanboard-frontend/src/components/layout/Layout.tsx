import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <Sidebar />
          </aside>
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
};
