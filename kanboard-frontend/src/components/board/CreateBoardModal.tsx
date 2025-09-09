import React from "react";
import { Modal } from "../ui/Modal";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { useBoards } from "../../hooks/useBoards";

export const CreateBoardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { createBoard, isCreating } = useBoards();
  const { register, handleSubmit } = useForm<{ name: string }>();

  const onSubmit = (data: { name: string }) => {
    createBoard({ name: data.name } as any);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni Board Oluştur">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          className="form-input"
          placeholder="Board adı"
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
          <Button type="submit" isLoading={isCreating}>
            Oluştur
          </Button>
        </div>
      </form>
    </Modal>
  );
};
