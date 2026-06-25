import "./AddTaskButton.scss";

function AddTaskButton({
  type,
  setBoard,
}) {
  const addTask = () => {
    const newTask = {
      id: crypto.randomUUID(),
      title: "New task",
      description: "",
      priority: "medium",
      completed: false,
    };

    setBoard((prevBoard) => ({
      ...prevBoard,
      [type]: [
        ...prevBoard[type],
        newTask,
      ],
    }));
  };

  return (
    <button
      className="add-task-button"
      onClick={addTask}
    >
      + Add Task
    </button>
  );
}

export default AddTaskButton;
