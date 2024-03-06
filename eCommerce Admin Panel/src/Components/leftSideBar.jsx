// LeftSidebar.js

import { useState } from "react";
import "./leftSideBar.css"
const LeftSidebar = () => {
  const [sidebarHidden, setSidebarHidden] = useState(true); // State to manage sidebar visibility
  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  }
  return (
    // eslint-disable-next-line react/prop-types
    <div className={`sidebar ${sidebarHidden ? "sidebar-hidden" : ""}`}>
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li>Customer</li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
