import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Board from "./components/Board/Board";

import defaultBoard from "../../data/defaultBoard";
import { loadBoard, saveBoard } from "../../utils/storage";

import "./Dashboard.scss";

function Dashboard() {
  const [board, setBoard] = useState(() => {
    return loadBoard() || defaultBoard;
  });

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard__content">
        <Header board={board} />

        <Board
          board={board}
          setBoard={setBoard}
        />
      </main>
    </div>
  );
}

export default Dashboard;




