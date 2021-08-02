import React from "react";
import { Icon } from "semantic-ui-react";

import "../../../Stylesheet/Home/SingleMenu.css";
export default function Menu(props) {
  let logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    window.location.href = "/login";
  };
  return (
    <div
      className={props.active ? "menu active" : "menu"}
      title={props.title}
      onClick={props.action === "logout" ? logout : ""}
    >
      <Icon style={{ marginLeft: "3px" }} name={props.icon}></Icon>
    </div>
  );
}
