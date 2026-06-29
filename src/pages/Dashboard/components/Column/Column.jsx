import { memo, useMemo, useCallback } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ColumnHeader from "../ColumnHeader/ColumnHeader";
import SortableTaskCard from "../SortableTaskCard/SortableTaskCard";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import transferTask from "../../../../utils/transferTask";
import BOARD_COLUMNS from "../../../../data/boardColumns";

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

  const sortableItems = useMemo(
    () => tasks.map((task) => task.id),
    [tasks]
  );

  const findTask = useCallback((taskId) => {
    return tasks.find((task) => task.id === taskId);
  }, [tasks]);

  const updateTask = useCallback((taskId, updatedTask) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      [type]: prevBoard[type].map((task) =>
        task.id === taskId ? updatedTask : task
      ),
    }));
  }, [setBoard, type]);

  const deleteTask = useCallback((taskId) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      [type]: prevBoard[type].filter(
        (task) => task.id !== taskId
      ),
    }));
  }, [setBoard, type]);

  const moveTask = useCallback((direction, taskId) => {
    const task = findTask(taskId);

    if (!task) return;

    const currentIndex =
      BOARD_COLUMNS.indexOf(type);

    const offset =
      direction === "left" ? -1 : 1;

    const targetColumn =
      BOARD_COLUMNS[currentIndex + offset];

    if (!targetColumn) return;

    setBoard((prevBoard) =>
      transferTask(
        prevBoard,
        type,
        targetColumn,
        task
      )
    );
  }, [type, findTask, setBoard]);


  const toggleComplete = useCallback((taskId) => {
    const task = findTask(taskId);

    if (!task) return;

    const targetColumn =
      type === "done"
        ? "progress"
        : "done";

    setBoard((prevBoard) =>
      transferTask(
        prevBoard,
        type,
        targetColumn,
        task
      )
    );
  }, [type, findTask, setBoard]);

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
        items={sortableItems}
        strategy={verticalListSortingStrategy}
      >
        <div className="column__body">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              column={type}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onComplete={toggleComplete}
              onMove={moveTask}
              onUpdate={updateTask}
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

export default memo(Column);
