import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Column from "../Column/Column";
import TaskCard from "../TaskCard/TaskCard";
import transferTask from "../../../../utils/transferTask";
import BOARD_COLUMNS from "../../../../data/boardColumns";

import "./Board.scss";

function Board({
  board,
  setBoard,
}) {

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = ({ active }) => {
    const column = active.data.current.column;

    const task = board[column].find(
      (item) => item.id === active.id
    );

    setActiveTask(task);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);

    if (!over) return;

    const from = active.data.current.column;
    const to = over.data.current.column;

    if (from === to) return;

    const task = board[from].find(
      (item) => item.id === active.id
    );

    if (!task) return;

    setBoard((prev) =>
      transferTask(
        prev,
        from,
        to,
        task
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        {BOARD_COLUMNS.map((column) => (
          <Column
            key={column.type}
            title={column.title}
            icon={column.icon}
            type={column.type}
            tasks={board[column.type]}
            board={board}
            setBoard={setBoard}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            onUpdate={() => {}}
            onDelete={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;
