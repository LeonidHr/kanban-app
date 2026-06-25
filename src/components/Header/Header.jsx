import "./Header.scss";

function Header({ board }) {
  const totalTasks =
    board.todo.length +
    board.progress.length +
    board.done.length;

  const completedTasks = board.done.filter(
    (task) => task.completed
  ).length;

  const percent =
    totalTasks === 0
      ? 0
      : (completedTasks / totalTasks) * 100;

  return (
    <header className="header">
      <div className="header__info">
        <span className="header__hello">
          👋 Hello, Leonid
        </span>

        <h1 className="header__title">
          Let's kick off the day
        </h1>
      </div>

      <div className="header__progress">
        <div
          className="header__circle"
          style={{
            background: `conic-gradient(
              #82D36B ${percent}%,
              #E8E8E8 ${percent}% 100%
            )`,
          }}
        >
          <div className="header__circle-inner">
            {completedTasks}/{totalTasks}
          </div>
        </div>

        <span className="header__done">
          Done
        </span>
      </div>
    </header>
  );
}

export default Header;
