import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between py-4">
      <div className="text-xl font-bold">Kanboard</div>
      <div className="flex items-center space-x-4">
        {user && <div className="text-sm">{user.username}</div>}
        <Button variant="ghost" onClick={logout}>
          Çıkış
        </Button>
      </div>
    </header>
  );
};
