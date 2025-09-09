import React from "react";
import { useSEO } from "../hooks/useSEO";
import { Layout } from "../components/layout/Layout";
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export const AnalyticsPage: React.FC = () => {
  useSEO({
    title: "Analytics - Kanboard",
    description:
      "Proje performansınızı ve ekip üretkenliğinizi analiz edin. Detaylı istatistikler ve raporlarla işlerinizi optimize edin.",
    keywords:
      "analytics, istatistik, performans, rapor, verimlilik, proje analizi, takım performansı",
    ogTitle: "Kanboard Analytics - Proje Performans Analizi",
    ogDescription: "Proje ve takım performansınızı detaylı raporlarla analiz edin.",
  });

  // Mock data for analytics
  const stats = [
    {
      title: "Toplam Task",
      value: "156",
      change: "+12%",
      changeType: "increase" as const,
      icon: ChartBarIcon,
      color: "bg-blue-500",
    },
    {
      title: "Tamamlanan",
      value: "89",
      change: "+8%",
      changeType: "increase" as const,
      icon: CheckCircleIcon,
      color: "bg-green-500",
    },
    {
      title: "Devam Eden",
      value: "45",
      change: "-3%",
      changeType: "decrease" as const,
      icon: ClockIcon,
      color: "bg-yellow-500",
    },
    {
      title: "Takım Üyeleri",
      value: "12",
      change: "+2",
      changeType: "increase" as const,
      icon: UsersIcon,
      color: "bg-purple-500",
    },
  ];

  const weeklyProgress = [
    { day: "Pzt", completed: 12, created: 15 },
    { day: "Sal", completed: 18, created: 12 },
    { day: "Çar", completed: 14, created: 20 },
    { day: "Per", completed: 22, created: 18 },
    { day: "Cum", completed: 16, created: 14 },
    { day: "Cmt", completed: 8, created: 6 },
    { day: "Paz", completed: 4, created: 3 },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                Analytics
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Proje performansınızı ve takım üretkenliğinizi analiz edin
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4" />
              <span>Son 30 gün</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Progress Chart */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Haftalık İlerleme
              </h3>
              <ArrowTrendingUpIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 text-sm font-medium text-gray-600">
                    {day.day}
                  </div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(day.completed / Math.max(day.created, day.completed)) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 min-w-0">
                      {day.completed}/{day.created}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Status */}
          <div className="glass-effect rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Proje Durumu
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-900">Tamamlandı</span>
                </div>
                <span className="text-green-700 font-semibold">57%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-yellow-900">Devam Ediyor</span>
                </div>
                <span className="text-yellow-700 font-semibold">29%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Beklemede</span>
                </div>
                <span className="text-gray-700 font-semibold">14%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Son Aktiviteler
          </h3>
          <div className="space-y-4">
            {[
              {
                action: "Task tamamlandı",
                task: "API entegrasyonu",
                user: "Ahmet Demir",
                time: "2 saat önce",
                type: "completed",
              },
              {
                action: "Yeni task eklendi",
                task: "UI/UX iyileştirmeleri",
                user: "Ayşe Kaya",
                time: "4 saat önce",
                type: "created",
              },
              {
                action: "Task güncellendi",
                task: "Veritabanı optimizasyonu",
                user: "Mehmet Özkan",
                time: "6 saat önce",
                type: "updated",
              },
              {
                action: "Yorum eklendi",
                task: "Mobil responsive tasarım",
                user: "Fatma Yılmaz",
                time: "1 gün önce",
                type: "comment",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "completed"
                      ? "bg-green-500"
                      : activity.type === "created"
                      ? "bg-blue-500"
                      : activity.type === "updated"
                      ? "bg-yellow-500"
                      : "bg-purple-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}:{" "}
                    <span className="font-medium">{activity.task}</span>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
