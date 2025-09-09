import React from "react";
import { Modal } from "../ui/Modal";
import { Task } from "../../types/task";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { taskService } from "../../services/taskService";

export const EditTaskModal: React.FC<{ isOpen: boolean; onClose: () => void; task: Task }> = ({ isOpen, onClose, task }) => {
  const { register, handleSubmit } = useForm<{ title: string; description?: string }>({ defaultValues: { title: task.title, description: task.description } });

  const onSubmit = async (data: { title: string; description?: string }) => {
    try {
      await taskService.updateTask(task.id, { title: data.title, description: data.description });
      onClose();
    } catch (e) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Düzenle">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} className="form-input" placeholder="Başlık" />
        <textarea {...register("description")} className="form-input" placeholder="Açıklama" />
        <div className="flex justify-end">
          <Button type="button" variant="ghost" onClick={onClose} className="mr-2">İptal</Button>
          <Button type="submit">Kaydet</Button>
        </div>
      </form>
    </Modal>
  );
};
