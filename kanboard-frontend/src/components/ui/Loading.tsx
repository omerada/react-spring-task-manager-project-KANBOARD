import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
};
