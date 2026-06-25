import { NavLink } from "react-router-dom";

import "./Sidebar.scss";

const menu = [
  {
    id: 1,
    title: "Dashboard",
    icon: "📋",
    path: "/",
  },
  {
    id: 2,
    title: "Boards",
    icon: "📁",
    path: "/boards",
  },
  {
    id: 3,
    title: "Calendar",
    icon: "📅",
    path: "/calendar",
  },
  {
    id: 4,
    title: "Favorites",
    icon: "⭐",
    path: "/favorites",
  },
  {
    id: 5,
    title: "Settings",
    icon: "⚙️",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <h2>Kanban</h2>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__item ${
                    isActive
                      ? "sidebar__item--active"
                      : ""
                  }`
                }
              >
                <span className="sidebar__icon">
                  {item.icon}
                </span>

                <span className="sidebar__text">
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
