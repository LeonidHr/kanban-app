import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TaskCard from "../TaskCard/TaskCard";

function SortableTaskCard(props) {
  const {
    task,
    column,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.25 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
    >
      <TaskCard
        {...props}
        dragListeners={listeners}
        dragAttributes={attributes}
      />
    </div>
  );
}

export default SortableTaskCard;
