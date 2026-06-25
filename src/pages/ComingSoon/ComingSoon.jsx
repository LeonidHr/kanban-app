import Sidebar from "../../components/Sidebar/Sidebar";

import "./ComingSoon.scss";

function ComingSoon() {
  return (
    <div className="coming-soon">
      <Sidebar />
      <div className="coming-soon__content">
        <h1>🚧 Page in development</h1>

        <p>This page is currently under development.</p>
      </div>
    </div>
  );
}

export default ComingSoon;


