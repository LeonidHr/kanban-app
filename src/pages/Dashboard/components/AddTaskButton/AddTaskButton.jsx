import { memo, useCallback } from "react";

import defaultTask from "../../../../data/defaultTask";

import "./AddTaskButton.scss";

function AddTaskButton({
  type,
  setBoard,
}) {
  const addTask = useCallback(() => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      [type]: [
        ...prevBoard[type],
        defaultTask,
      ],
    }));
  }, [type, setBoard]);

  return (
    <button
      className="add-task-button"
      onClick={addTask}
    >
      + Add Task
    </button>
  );
}

export default memo(AddTaskButton);
