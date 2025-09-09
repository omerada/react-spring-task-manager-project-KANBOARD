import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Task } from "../../types/task";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";

interface TaskCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onDragEnd }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    begin: () => onDragStart(task),
    end: () => onDragEnd(),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div ref={drag as any} className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow group ${isDragging ? "opacity-50" : "opacity-100"}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
            {task.description && <p className="text-sm text-gray-600 mb-3">{task.description}</p>}
            <div className="text-xs text-gray-500">{new Date(task.createdAt).toLocaleDateString("tr-TR")}</div>
          </div>

          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); setIsEditModalOpen(true); }} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
              <PencilIcon className="h-4 w-4" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true); }} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <EditTaskModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} task={task} />

      <DeleteTaskModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} task={task} />
    </>
  );
};
