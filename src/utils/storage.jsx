const STORAGE_KEY = "kanban-board";

export const loadBoard = () => {
  try {
    const board = localStorage.getItem(STORAGE_KEY);

    return board ? JSON.parse(board) : null;
  } catch (error) {
    console.error("Error loading board:", error);
    return null;
  }
};

export const saveBoard = (board) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(board)
    );
  } catch (error) {
    console.error("Error saving board:", error);
  }
};

export default STORAGE_KEY;
