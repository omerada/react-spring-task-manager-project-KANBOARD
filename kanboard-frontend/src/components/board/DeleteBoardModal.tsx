import React from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export const DeleteBoardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  boardName?: string;
}> = ({ isOpen, onClose, onConfirm, boardName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Board Sil">
      <p>"{boardName}" silinsin mi?</p>
      <div className="flex justify-end mt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="mr-2"
        >
          İptal
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm}>
          Sil
        </Button>
      </div>
    </Modal>
  );
};
