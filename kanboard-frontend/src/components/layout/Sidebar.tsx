import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, RectangleStackIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { 
      to: "/dashboard", 
      label: "Dashboard", 
      icon: HomeIcon,
      description: "Ana sayfa" 
    },
    { 
      to: "/", 
      label: "Boards", 
      icon: RectangleStackIcon,
      description: "Tüm projeler" 
    },
    { 
      to: "/analytics", 
      label: "Analytics", 
      icon: ChartBarIcon,
      description: "İstatistikler" 
    },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Navigasyon</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
      </div>
      
      <nav className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" 
                  : "text-gray-700 hover:bg-white hover:shadow-md hover:-translate-y-1"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-500"} transition-colors`} />
              <div className="flex-1">
                <div className={`font-medium text-sm ${isActive ? "text-white" : "text-gray-900"}`}>
                  {item.label}
                </div>
                <div className={`text-xs ${isActive ? "text-blue-100" : "text-gray-500"}`}>
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="text-sm text-gray-600 mb-2">💡 İpucu</div>
        <div className="text-xs text-gray-500">
          Sürükle-bırak ile task'ları kolayca taşıyabilirsin!
        </div>
      </div>
    </div>
  );
};
