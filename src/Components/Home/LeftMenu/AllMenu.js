import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../Stylesheet/Home/AllMenu.css";
import Home from "../Home";
import Menu from "./Menu";
export default function AllMenu() {
  const [menuValue, setMenuValue] = useState(1);
  
  const menus = [
    {
      key: 1,
      icon: "home",
      active: false,
      title: "Ev",
      component: (key) => <Home key={key} />,
      path: "/home",
    },
    {
      key: 2,
      icon: "trophy",
      active: false,
      title: "Tüm Etkinliklerim",
      component: (key) => <Home key={key} />,
      path: "/myActivities",
    },
    {
      key: 3,
      icon: "plus",
      active: false,
      title: "Etkinlik Oluştur",
      component: (key) => <Home key={key} />,
      path: "/createActivity",
    },
    {
      key: 4,
      icon: "sign-out",
      active: false,
      title: "Oturumu Kapat",
      path: "/login",
      action:"logout"
    },
  ];

  return (
    <div>
      <div className="left-menu">
        {menus.map((menu) => (
          <Menu title={menu.title} icon={menu.icon} action={menu.action} />
        ))}
      </div>
    </div>
  );
}
