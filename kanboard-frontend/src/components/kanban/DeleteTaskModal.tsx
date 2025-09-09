import React from "react";
import { Modal } from "../ui/Modal";
import { Task } from "../../types/task";
import { Button } from "../ui/Button";
import { taskService } from "../../services/taskService";

export const DeleteTaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}> = ({ isOpen, onClose, task }) => {
  const handleDelete = async () => {
    try {
      await taskService.deleteTask(task.id);
      onClose();
    } catch (e) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Sil">
      <p>"{task.title}" silinsin mi?</p>
      <div className="flex justify-end mt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="mr-2"
        >
          İptal
        </Button>
        <Button type="button" variant="danger" onClick={handleDelete}>
          Sil
        </Button>
      </div>
    </Modal>
  );
};
