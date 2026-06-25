import "./ColumnHeader.scss";

function ColumnHeader({ title, icon, count }) {
  return (
    <div className="column-header">
      <div className="column-header__info">
        <span>{icon}</span>
        <h3>{title}</h3>
      </div>

      <span>{count}</span>
    </div>
  );
}

export default ColumnHeader;