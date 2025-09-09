import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useBoards } from "../hooks/useBoards";
import { useSEO } from "../hooks/useSEO";
import { Layout } from "../components/layout/Layout";
import { BoardCard } from "../components/board/BoardCard";
import { CreateBoardModal } from "../components/board/CreateBoardModal";
import { Button } from "../components/ui/Button";
import { Loading } from "../components/ui/Loading";

export const DashboardPage: React.FC = () => {
  const { boards, isLoading, deleteBoard } = useBoards();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Keyboard shortcut for creating new board
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "n") {
        event.preventDefault();
        setIsCreateModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useSEO({
    title: "Dashboard - Kanboard",
    description:
      "Kanboard dashboard'unda tüm projelerinizi görüntüleyin ve yönetin. Yeni board'lar oluşturun, mevcut projelerinizi düzenleyin.",
    keywords:
      "dashboard, proje dashboard, kanban board, proje yönetimi, board listesi",
    ogTitle: "Kanboard Dashboard - Projelerinizi Yönetin",
    ogDescription: "Tüm projelerinizi tek yerden yönetin ve takip edin.",
  });

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="glass-effect rounded-2xl p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                Board'larım
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Tüm projelerinizi buradan yönetin ve takip edin
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    {boards.length} aktif proje
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Son güncelleme: bugün
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-end space-y-3">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Yeni Board Oluştur
              </Button>
              <div className="text-sm text-gray-500 text-center sm:text-right">
                <span className="hidden sm:inline">
                  Ctrl + N ile hızlı oluştur
                </span>
                <span className="sm:hidden">Hızlı oluştur</span>
              </div>
            </div>
          </div>
        </div>

        {boards.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 animate-float">
              <PlusIcon className="h-16 w-16 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Henüz board'unuz yok
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              İlk board'unuzu oluşturarak proje yönetimi yolculuğunuza başlayın.
              Kanban metodolojisi ile işlerinizi daha etkili organize edin.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="text-lg px-8 py-3 shadow-xl hover:shadow-2xl"
              >
                <PlusIcon className="h-6 w-6 mr-3" />
                İlk Board'u Oluştur
              </Button>
              <div className="text-sm text-gray-500">
                veya klavye kısayolu:{" "}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">
                  Ctrl + N
                </kbd>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {boards.map((board: any) => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={() => deleteBoard(board.id)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Layout>
  );
};
