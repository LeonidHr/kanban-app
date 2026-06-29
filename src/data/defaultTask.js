const defaultTask = () => ({
  id: crypto.randomUUID(),
  title: "New task",
  description: "",
  priority: "medium",
  completed: false,
});

export default defaultTask;