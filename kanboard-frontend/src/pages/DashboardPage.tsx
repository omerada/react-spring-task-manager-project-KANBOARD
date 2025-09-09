import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useBoards } from "../hooks/useBoards";
import { Layout } from "../components/layout/Layout";
import { BoardCard } from "../components/board/BoardCard";
import { CreateBoardModal } from "../components/board/CreateBoardModal";
import { Button } from "../components/ui/Button";
import { Loading } from "../components/ui/Loading";

export const DashboardPage: React.FC = () => {
  const { boards, isLoading, deleteBoard } = useBoards();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Board'larım</h1>
            <p className="text-gray-600">Tüm projelerinizi buradan yönetin</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Yeni Board
          </Button>
        </div>

        {boards.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <PlusIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz board'unuz yok
            </h3>
            <p className="text-gray-600 mb-6">
              İlk board'unuzu oluşturarak başlayın
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              İlk Board'u Oluştur
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
