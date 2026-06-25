import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ColumnHeader from "../ColumnHeader/ColumnHeader";
import SortableTaskCard from "../SortableTaskCard/SortableTaskCard";
import AddTaskButton from "../AddTaskButton/AddTaskButton";

import "./Column.scss";

function Column({
  title,
  icon,
  type,
  tasks,
  board,
  setBoard,
}) {
  const { setNodeRef } = useDroppable({
    id: type,
    data: {
      column: type,
    },
  });

  const updateTask = (taskId, updatedTask) => {
    setBoard((prevBoard) => ({
      ...prevBoard,

      [type]: prevBoard[type].map((task) =>
        task.id === taskId ? updatedTask : task
      ),
    }));
  };

  const deleteTask = (taskId) => {
    setBoard((prevBoard) => ({
      ...prevBoard,

      [type]: prevBoard[type].filter(
        (task) => task.id !== taskId
      ),
    }));
  };

  const moveTask = (direction, taskId) => {
    const columns = ["todo", "progress", "done"];

    const currentIndex = columns.indexOf(type);

    let targetColumn = null;

    if (direction === "left" && currentIndex > 0) {
      targetColumn = columns[currentIndex - 1];
    }

    if (
      direction === "right" &&
      currentIndex < columns.length - 1
    ) {
      targetColumn = columns[currentIndex + 1];
    }

    if (!targetColumn) return;

    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    setBoard((prevBoard) => ({
      ...prevBoard,

      [type]: prevBoard[type].filter(
        (item) => item.id !== taskId
      ),

      [targetColumn]: [
        ...prevBoard[targetColumn],
        {
          ...task,
          completed: targetColumn === "done",
        },
      ],
    }));
  };


  const toggleComplete = (taskId) => {
    const task = tasks.find(
      (item) => item.id === taskId
    );

    if (!task) return;

    if (type === "done") {
      setBoard((prevBoard) => ({
        ...prevBoard,

        done: prevBoard.done.filter(
          (item) => item.id !== taskId
        ),

        progress: [
          ...prevBoard.progress,
          {
            ...task,
            completed: false,
          },
        ],
      }));

      return;
    }

    setBoard((prevBoard) => ({
      ...prevBoard,

      [type]: prevBoard[type].filter(
        (item) => item.id !== taskId
      ),

      done: [
        ...prevBoard.done,
        {
          ...task,
          completed: true,
        },
      ],
    }));
  };

  return (
    <div
      ref={setNodeRef}
      className={`column column--${type}`}
    >
      <ColumnHeader
        title={title}
        icon={icon}
        count={tasks.length}
      />

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="column__body">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              column={type}
              onUpdate={updateTask}
              onDelete={() => deleteTask(task.id)}
              onComplete={() => toggleComplete(task.id)}
              onMoveLeft={() =>
                moveTask("left", task.id)
              }
              onMoveRight={() =>
                moveTask("right", task.id)
              }
            />
          ))}
        </div>
      </SortableContext>

      <AddTaskButton
        type={type}
        board={board}
        setBoard={setBoard}
      />
    </div>
  );
}

export default Column;
