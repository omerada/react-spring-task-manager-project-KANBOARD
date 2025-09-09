import React from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { useSEO } from "../hooks/useSEO";

export const LoginPage: React.FC = () => {
  useSEO({
    title: "Giriş Yap - Kanboard",
    description:
      "Kanboard hesabınıza güvenli giriş yapın. Modern proje yönetimi ve takım çalışması araçlarına erişim sağlayın.",
    keywords: "kanboard giriş, login, proje yönetimi giriş, kanban login",
    ogTitle: "Kanboard'a Giriş Yap",
    ogDescription:
      "Projelerinizi yönetmek için Kanboard'a güvenli giriş yapın.",
  });

  return <LoginForm />;
};
