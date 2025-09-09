import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RegisterRequest } from "../../types/auth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const RegisterForm: React.FC = () => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const password = watch("password");

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUser(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Hesap oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Zaten hesabınız var mı?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Giriş yapın
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
                maxLength: {
                  value: 20,
                  message: "Kullanıcı adı en fazla 20 karakter olabilir",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Kullanıcı adı sadece harf, rakam ve _ içerebilir",
                },
              })}
              error={errors.username?.message}
            />

            <Input
              label="E-posta"
              type="email"
              {...register("email", {
                required: "E-posta gereklidir",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Geçerli bir e-posta adresi giriniz",
                },
              })}
              error={errors.email?.message}
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
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir",
                },
              })}
              error={errors.password?.message}
            />

            <Input
              label="Şifre Tekrar"
              type="password"
              {...register("confirmPassword", {
                required: "Şifre tekrarı gereklidir",
                validate: (value) =>
                  value === password || "Şifreler eşleşmiyor",
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Kayıt Ol
          </Button>
        </form>
      </div>
    </div>
  );
};
