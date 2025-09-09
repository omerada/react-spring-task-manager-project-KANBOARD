import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="glass-effect rounded-2xl px-4 sm:px-6 py-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base sm:text-lg">K</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl sm:text-2xl font-bold gradient-text">
              Kanboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Proje Yönetim Sistemi
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {user && (
            <div className="hidden sm:flex items-center space-x-3 bg-white bg-opacity-50 rounded-full px-4 py-2">
              <UserCircleIcon className="h-6 w-6 text-gray-600" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user.username}</div>
                <div className="text-gray-500">Aktif Kullanıcı</div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 transition-colors px-2 sm:px-4"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Çıkış</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
