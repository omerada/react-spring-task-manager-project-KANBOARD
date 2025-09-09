import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { RegisterRequest } from "../types/auth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage: React.FC = () => {
  const { register: authRegister, isLoading } = useAuth();
  const { register, handleSubmit } = useForm<RegisterRequest>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await authRegister(data);
      navigate("/dashboard");
    } catch (e) {
      // handled by context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Hesap Oluştur
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Zaten hesabınız var mı?{" "}
            <Link to="/login" className="text-blue-600">
              Giriş yap
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Kullanıcı Adı"
              type="text"
              {...register("username", { required: true })}
            />
            <Input
              label="Email"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Şifre"
              type="password"
              {...register("password", { required: true })}
            />
            <Input
              label="Şifre (Tekrar)"
              type="password"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Kayıt Ol
          </Button>
        </form>
      </div>
    </div>
  );
};
