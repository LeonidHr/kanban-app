function transferTask(
  prevBoard,
  from,
  to,
  task
) {
  return {
    ...prevBoard,

    [from]: prevBoard[from].filter(
      (item) => item.id !== task.id
    ),

    [to]: [
      ...prevBoard[to],
      {
        ...task,
        completed: to === "done",
      },
    ],
  };
}
export default transferTask;