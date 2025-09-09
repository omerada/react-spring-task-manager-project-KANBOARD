import React from "react";
import { Board } from "../../types/board";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export const BoardCard: React.FC<{ board: Board; onDelete?: () => void }> = ({ board, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{board.name}</h3>
          <p className="text-sm text-gray-500">{new Date(board.createdAt).toLocaleDateString("tr-TR")}</p>
        </div>

        <div className="flex space-x-2">
          <Button onClick={() => navigate(`/boards/${board.id}`)}>Aç</Button>
          <Button variant="danger" onClick={onDelete}>Sil</Button>
        </div>
      </div>
    </div>
  );
};
