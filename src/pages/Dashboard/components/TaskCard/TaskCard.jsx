import { useState } from "react";
import {
  GripVertical,
  ArrowLeft,
  ArrowRight,
  Trash2,
} from "lucide-react";

import autoResize from "../../../../utils/utils";

import "./TaskCard.scss";

const priorities = ["low", "medium", "high"];

function TaskCard({
  task,
  onUpdate,
  onDelete,
  onComplete,
  onMoveLeft,
  onMoveRight,
  dragListeners,
  dragAttributes,
  disableMoveButtons = false,
}) {
  const [showPriorities, setShowPriorities] = useState(false);

  const updateTitle = (value) => {
    onUpdate(task.id, {
      ...task,
      title: value,
    });
  };

  const updateDescription = (value) => {
    onUpdate(task.id, {
      ...task,
      description: value,
    });
  };

  const updatePriority = (priority) => {
    onUpdate(task.id, {
      ...task,
      priority,
    });

    setShowPriorities(false);
  };

  return (
    <div
      className={`task-card ${
        task.completed ? "task-card--completed" : ""
      }`}
    >
      <div className="task-card__top">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onComplete ?? (() => {})}
      />

        <div className="task-card__actions">
          <button
            onClick={onMoveLeft}
            disabled={disableMoveButtons}
          >
            <ArrowLeft size={16} />
          </button>

          <button
            onClick={onMoveRight}
            disabled={disableMoveButtons}
          >
            <ArrowRight size={16} />
          </button>

          <button
            className="task-card__drag"
            {...dragListeners}
            {...dragAttributes}
          >
            <GripVertical size={18} />
          </button>
        </div>
      </div>

      <div className="task-card__content">
        <textarea
          className="task-card__title"
          rows={1}
          value={task.title}
          onChange={(e) => {
            updateTitle(e.target.value);
            autoResize(e);
          }}
        />

        <textarea
          className="task-card__description"
          rows={2}
          placeholder="Task description..."
          value={task.description}
          onChange={(e) => {
            updateDescription(e.target.value);
            autoResize(e);
          }}
        />
      </div>

      <div className="task-card__footer">
        <div className="task-card__priority">
          {showPriorities ? (
            <div className="task-card__priority-list">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  className={`task-card__badge task-card__badge--${priority}`}
                  onClick={() => updatePriority(priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
          ) : (
            <button
              className={`task-card__badge task-card__badge--${task.priority}`}
              onClick={() =>
                setShowPriorities(true)
              }
            >
              {task.priority}
            </button>
          )}
        </div>

        <button
          className="task-card__delete"
          onClick={onDelete}
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

