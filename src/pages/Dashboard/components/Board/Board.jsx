import { useEffect, useState } from "react";
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

// import defaultBoard from "../../../../data/defaultBoard";
import { saveBoard } from "../../../../utils/storage";

import "./Board.scss";

function Board({
  board,
  setBoard,
}) {

  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    saveBoard(board);
  }, [board]);

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

    setBoard((prev) => ({
      ...prev,

      [from]: prev[from].filter(
        (item) => item.id !== active.id
      ),

      [to]: [ ...prev[to], { ...task, completed: to === "done", }, ],
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        <Column
          title="To Do"
          icon="📝"
          type="todo"
          tasks={board.todo}
          board={board}
          setBoard={setBoard}
        />

        <Column
          title="In Progress"
          icon="🚀"
          type="progress"
          tasks={board.progress}
          board={board}
          setBoard={setBoard}
        />

        <Column
          title="Done"
          icon="✅"
          type="done"
          tasks={board.done}
          board={board}
          setBoard={setBoard}
        />
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
