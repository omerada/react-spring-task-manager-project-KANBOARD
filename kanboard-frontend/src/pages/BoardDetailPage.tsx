import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useBoardDetail } from "../hooks/useBoards";
import { Layout } from "../components/layout/Layout";
import { KanbanBoard } from "../components/kanban/KanbanBoard";
import { Loading } from "../components/ui/Loading";

export const BoardDetailPage: React.FC = () => {
  const { boardId } = useParams();
  const { board, isLoading, error } = useBoardDetail(boardId! as string);

  if (!boardId) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error || !board) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Board bulunamadı</h2>
          <p className="text-gray-600">Bu board mevcut değil veya erişim izniniz yok.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
          <p className="text-gray-600">Oluşturulma: {new Date(board.createdAt).toLocaleDateString("tr-TR")}</p>
        </div>

        <KanbanBoard board={board} />
      </div>
    </Layout>
  );
};
