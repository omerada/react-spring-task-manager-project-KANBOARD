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

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDragStart,
  onDragEnd,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: () => {
        onDragStart(task);
        return { id: task.id, task };
      },
      end: () => onDragEnd(),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task, onDragStart, onDragEnd]
  );

  return (
    <>
      <div
        ref={drag as any}
        className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-move hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 ${
          isDragging ? "opacity-50 rotate-3 scale-105" : "opacity-100"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{new Date(task.createdAt).toLocaleDateString("tr-TR")}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {task.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditModalOpen(true);
              }}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteModalOpen(true);
              }}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Priority indicator */}
        <div className="mt-3 flex justify-end">
          <div className="w-full h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        task={task}
      />
    </>
  );
};
