import { useState, useCallback, memo } from "react";
import {
  GripVertical,
  ArrowLeft,
  ArrowRight,
  Trash2,
} from "lucide-react";

import autoResize from "../../../../utils/utils";
import priorities from "../../../../data/priorities";

import "./TaskCard.scss";

function TaskCard({
  task,
  onUpdate,
  onDelete,
  onComplete,
  onMove,
  dragListeners,
  dragAttributes,
  disableMoveButtons = false,
}) {
  const [showPriorities, setShowPriorities] = useState(false);

  const updateTask = useCallback(
    (changes) => {
      onUpdate(task.id, {
        ...task,
        ...changes,
      });
  }, [task, onUpdate]);

  const updateTitle = useCallback(
    (title) => {
      updateTask({ title });
    }, [updateTask]
  );
    
  const updateDescription = useCallback(
    (description) => {
      updateTask({ description });
    },
    [updateTask]
  );

  const updatePriority = useCallback(
    (priority) => {
      updateTask({ priority });
      setShowPriorities(false);
    },
    [updateTask]
  );

  const handleTitleChange = useCallback(
    (e) => {
      updateTitle(e.target.value);
      autoResize(e);
    },
    [updateTitle]
  );

  const handleDescriptionChange = useCallback(
    (e) => {
      updateDescription(e.target.value);
      autoResize(e);
    },
    [updateDescription]
  );

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
        onChange={() => onComplete(task.id)}
      />

        <div className="task-card__actions">
          <button
            onClick={() => onMove("left", task.id)}
            disabled={disableMoveButtons}
          >
            <ArrowLeft size={16} />
          </button>

          <button
            onClick={() => onMove("right", task.id)}
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
          onChange={handleTitleChange}
        />

        <textarea
          className="task-card__description"
          rows={2}
          placeholder="Task description..."
          value={task.description}
          onChange={handleDescriptionChange}
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
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default memo(TaskCard);
