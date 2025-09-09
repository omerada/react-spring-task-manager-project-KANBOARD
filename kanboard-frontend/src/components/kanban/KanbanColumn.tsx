import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Column } from "../../types/column";
import { Task } from "../../types/task";
import { TaskCard } from "./TaskCard";
import { CreateTaskModal } from "./CreateTaskModal";
import { Button } from "../ui/Button";

interface KanbanColumnProps {
  column: Column;
  boardId: string;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
  onDrop: (columnId: string, position: number) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  boardId,
  onDragStart,
  onDragEnd,
  onDrop,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item: { id: string; task: Task }, monitor) => {
        if (!monitor.didDrop()) {
          const newPosition = column.tasks.length;
          onDrop(column.id, newPosition);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [column.id, column.tasks.length, onDrop]
  );

  const getColumnColor = (title: string) => {
    switch (title.toLowerCase()) {
      case "to do":
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200";
      case "in progress":
        return "bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200";
      case "done":
        return "bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-200";
      default:
        return "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200";
    }
  };

  const getColumnIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "to do":
        return "⏳";
      case "in progress":
        return "🚀";
      case "done":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <div
      ref={drop as any}
      className={`flex-shrink-0 w-80 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
        isOver
          ? "border-blue-400 bg-blue-50 shadow-xl"
          : getColumnColor(column.title)
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getColumnIcon(column.title)}</div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {column.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {column.tasks.length} tasks
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 hover:bg-white hover:shadow-md rounded-xl"
          >
            <PlusIcon className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="space-y-4 min-h-[300px] max-h-[600px] overflow-y-auto scrollbar-hide">
          {column.tasks
            .sort((a, b) => a.position - b.position)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 rounded-xl py-3"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusIcon className="h-5 w-5 mr-2 text-gray-500" />
          <span className="text-gray-600 font-medium">Yeni Task Ekle</span>
        </Button>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        columnId={column.id}
        boardId={boardId}
      />
    </div>
  );
};
