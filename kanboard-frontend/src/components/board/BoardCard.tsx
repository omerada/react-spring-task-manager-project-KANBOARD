import React from "react";
import { Board } from "../../types/board";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  TrashIcon,
  CalendarDaysIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

export const BoardCard: React.FC<{ board: Board; onDelete?: () => void }> = ({
  board,
  onDelete,
}) => {
  const navigate = useNavigate();
  const taskCount =
    board.columns?.reduce(
      (total, column) => total + (column.tasks?.length || 0),
      0
    ) || 0;

  return (
    <div className="group card-hover relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <RectangleStackIcon className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {board.name}
              </h3>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>
                  {new Date(board.createdAt).toLocaleDateString("tr-TR")}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{taskCount} task</span>
              </div>
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <RectangleStackIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>İlerleme</span>
            <span>
              {taskCount > 0 ? Math.round((taskCount / 10) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${
                  taskCount > 0 ? Math.min((taskCount / 10) * 100, 100) : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={() => navigate(`/boards/${board.id}`)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            Görüntüle
          </Button>
          <Button
            variant="danger"
            onClick={onDelete}
            className="px-3 hover:scale-105 transition-transform duration-200"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
