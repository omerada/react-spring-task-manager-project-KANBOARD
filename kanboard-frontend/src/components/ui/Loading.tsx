import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
        <div className="absolute inset-0 animate-ping h-12 w-12 border-4 border-blue-300 rounded-full opacity-20"></div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Yükleniyor...</h3>
        <p className="text-gray-500">Veriler alınıyor, lütfen bekleyin</p>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};
