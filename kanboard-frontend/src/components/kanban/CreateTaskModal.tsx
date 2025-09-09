import React from "react";
import { Modal } from "../ui/Modal";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { taskService } from "../../services/taskService";

export const CreateTaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  columnId: string;
  boardId: string;
}> = ({ isOpen, onClose, columnId }) => {
  const { register, handleSubmit } = useForm<{
    title: string;
    description?: string;
  }>();

  const onSubmit = async (data: { title: string; description?: string }) => {
    try {
      await taskService.createTask(columnId, {
        title: data.title,
        description: data.description,
      });
      onClose();
    } catch (e) {
      // ignore in placeholder
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni Task Oluştur">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          className="form-input"
          placeholder="Başlık"
        />
        <textarea
          {...register("description")}
          className="form-input"
          placeholder="Açıklama"
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="mr-2"
          >
            İptal
          </Button>
          <Button type="submit">Oluştur</Button>
        </div>
      </form>
    </Modal>
  );
};
