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
        return "bg-gray-100 border-gray-300";
      case "in progress":
        return "bg-yellow-50 border-yellow-300";
      case "done":
        return "bg-green-50 border-green-300";
      default:
        return "bg-blue-50 border-blue-300";
    }
  };

  return (
    <div
      ref={drop as any}
      className={`flex-shrink-0 w-80 bg-white rounded-lg border-2 ${
        isOver ? "border-blue-400 bg-blue-50" : getColumnColor(column.title)
      } transition-colors duration-200`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            {column.title}
            <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              {column.tasks.length}
            </span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="p-1"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 min-h-[200px]">
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
          className="w-full mt-3 border-2 border-dashed border-gray-300 hover:border-gray-400"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Task Ekle
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
