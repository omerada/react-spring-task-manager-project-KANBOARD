import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService";
import { Task, TaskMoveRequest } from "../types/task";
import toast from "react-hot-toast";

export const useDragAndDrop = (boardId: string) => {
  const queryClient = useQueryClient();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const moveTaskMutation = useMutation({
    mutationFn: ({ taskId, moveData }: { taskId: string; moveData: TaskMoveRequest }) => taskService.moveTask(taskId, moveData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
    onError: (error: any) => {
      toast.error("Task taşınırken hata oluştu");
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
  });

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = async (columnId: string, position: number) => {
    if (!draggedTask) return;

    const moveData: TaskMoveRequest = {
      columnId,
      position,
    };

  (moveTaskMutation as any).mutate({ taskId: draggedTask.id, moveData });
  };

  return {
    draggedTask,
    handleDragStart,
    handleDragEnd,
    handleDrop,
  isMoving: (moveTaskMutation as any).isLoading,
  };
};
