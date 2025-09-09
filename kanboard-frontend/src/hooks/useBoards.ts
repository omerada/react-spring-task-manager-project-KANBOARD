import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Board, BoardRequest } from "../types/board";
import { boardService } from "../services/boardService";
import toast from "react-hot-toast";

export const useBoards = () => {
  const queryClient = useQueryClient();

  const boardsQuery = useQuery({
    queryKey: ["boards"],
    queryFn: boardService.getBoards,
    staleTime: 5 * 60 * 1000,
  });

  const createBoardMutation = useMutation<Board, any, BoardRequest>({
    mutationFn: (data: BoardRequest) => boardService.createBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board başarıyla oluşturuldu!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Board oluşturulurken hata oluştu"
      );
    },
  });

  const deleteBoardMutation = useMutation<void, any, string>({
    mutationFn: (id: string) => boardService.deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board başarıyla silindi!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Board silinirken hata oluştu"
      );
    },
  });

  return {
    boards: boardsQuery.data || [],
    isLoading: boardsQuery.isLoading,
    error: boardsQuery.error,
    createBoard: (createBoardMutation as any).mutate,
    deleteBoard: (deleteBoardMutation as any).mutate,
    isCreating: (createBoardMutation as any).isLoading ?? false,
    isDeleting: (deleteBoardMutation as any).isLoading ?? false,
  };
};

export const useBoardDetail = (boardId: string) => {
  const queryClient = useQueryClient();

  const boardQuery = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => boardService.getBoardById(boardId),
    enabled: !!boardId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    board: boardQuery.data,
    isLoading: boardQuery.isLoading,
    error: boardQuery.error,
    refetch: boardQuery.refetch,
  };
};
