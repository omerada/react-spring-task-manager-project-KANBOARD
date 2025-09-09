import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-10 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full opacity-10 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Header />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <Sidebar />
          </aside>
          <main className="lg:col-span-3 order-1 lg:order-2">{children}</main>
        </div>
      </div>
    </div>
  );
};
