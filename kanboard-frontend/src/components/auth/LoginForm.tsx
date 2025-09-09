import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginRequest } from "../../types/auth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { getDemoCredentials, isDemoEnvironment } from "../../mocks/initialize";

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location as any).state?.from?.pathname || "/dashboard";
  const isDemoMode = isDemoEnvironment();
  const demoCredentials = getDemoCredentials();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: isDemoMode ? demoCredentials : {},
  });

  // Otomatik demo bilgileri doldurma
  useEffect(() => {
    if (isDemoMode) {
      setValue("username", demoCredentials.username);
      setValue("password", demoCredentials.password);
    }
  }, [isDemoMode, demoCredentials, setValue]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      // handled in context
    }
  };

  const fillDemoCredentials = () => {
    setValue("username", demoCredentials.username);
    setValue("password", demoCredentials.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Kanboard'a Hoş Geldiniz
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hesabınıza giriş yapın
          </p>
          <p className="mt-1 text-center text-sm text-gray-600">
            Hesabınız yok mu?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Kayıt olun
            </Link>
          </p>
        </div>

        {isDemoMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  🚀 Demo Modu Aktif
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Demo bilgileri otomatik olarak dolduruldu. Hemen giriş
                  yapabilirsiniz!
                </p>
              </div>
              <Button
                type="button"
                onClick={fillDemoCredentials}
                variant="secondary"
                size="sm"
              >
                Yenile
              </Button>
            </div>
            <div className="mt-3 text-xs text-blue-600 bg-blue-100 p-2 rounded">
              <p>
                <strong>Demo Hesaplar:</strong>
              </p>
              <p>👤 demo / demo123 (önerilen)</p>
              <p>👤 admin / admin123</p>
            </div>
          </div>
        )}

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
              placeholder={isDemoMode ? "demo" : "Kullanıcı adınızı girin"}
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
              placeholder={isDemoMode ? "demo123" : "Şifrenizi girin"}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>

          {isDemoMode && (
            <p className="text-center text-xs text-gray-500 mt-4">
              Bu bir demo uygulamasıdır. Gerçek kullanıcı verileri saklanmaz.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
