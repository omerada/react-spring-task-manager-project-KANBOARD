import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginRequest } from "../../types/auth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location as any).state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      // handled in context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Hesabınıza giriş yapın
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hesabınız yok mu?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Kayıt olun
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Kullanıcı Adı"
              type="text"
              {...register("username", {
                required: "Kullanıcı adı gereklidir",
                minLength: {
                  value: 3,
                  message: "Kullanıcı adı en az 3 karakter olmalıdır",
                },
              })}
              error={errors.username?.message}
            />

            <Input
              label="Şifre"
              type="password"
              {...register("password", {
                required: "Şifre gereklidir",
                minLength: {
                  value: 6,
                  message: "Şifre en az 6 karakter olmalıdır",
                },
              })}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  );
};
