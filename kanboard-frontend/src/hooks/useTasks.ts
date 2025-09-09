import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/taskService";
import { TaskRequest, TaskMoveRequest } from "../types/task";
import toast from "react-hot-toast";

export const useTasks = (boardId?: string) => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: ({ columnId, data }: { columnId: string; data: TaskRequest }) =>
      taskService.createTask(columnId, data),
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
      toast.success("Task başarıyla oluşturuldu!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Task oluşturulurken hata oluştu"
      );
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: TaskRequest }) =>
      taskService.updateTask(taskId, data),
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
      toast.success("Task başarıyla güncellendi!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Task güncellenirken hata oluştu"
      );
    },
  });

  const moveTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      moveData,
    }: {
      taskId: string;
      moveData: TaskMoveRequest;
    }) => taskService.moveTask(taskId, moveData),
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
    },
    onError: (error: any) => {
      toast.error("Task taşınırken hata oluştu");
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => taskService.deleteTask(taskId),
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
      toast.success("Task başarıyla silindi!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Task silinirken hata oluştu"
      );
    },
  });

  return {
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    moveTask: moveTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isMoving: moveTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
