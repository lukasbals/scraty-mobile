import Board from "../../models/Board";

export const getBoards = (state: any): Board[] => state.boards.boards;

export const getLoading = (state: any): boolean => state.boards.loading;
