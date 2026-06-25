const defaultBoard = {
  todo: [
    {
      id: crypto.randomUUID(),
      title: "Brainstorm 100 new shades of blue",
      description: "Create a new color palette for the application.",
      priority: "medium",
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Research competitors",
      description: "Analyze the best Kanban applications.",
      priority: "low",
      completed: false,
    },
  ],

  progress: [
    {
      id: crypto.randomUUID(),
      title: "Build Dashboard",
      description: "Create the main dashboard layout.",
      priority: "medium",
      completed: false,
    },
  ],

  done: [
    {
      id: crypto.randomUUID(),
      title: "Project initialization",
      description: "React project created successfully.",
      priority: "high",
      completed: true,
    },
  ],
};

export default defaultBoard;
