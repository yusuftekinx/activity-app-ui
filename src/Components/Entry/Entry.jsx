import React, { useEffect, useState } from "react";
import "../../Stylesheet/Entry/Entry.css";
import { Button, Form, Header, Icon, Input, Progress } from "semantic-ui-react";
import EntryImage from "../../assets/entry.svg";
import AppIcon from "../../assets/puzzle.png";
import SetName from "../SetNameComponent/SetName.jsx";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import {ToastContainer} from 'react-toastify'
function Entry() {
  let [progressbarvalue, setprogressbarvalue] = useState(1);
  let [label,setLabel] = useState("");
  const changePBValue =  () => {
    setprogressbarvalue(progressbarvalue+=1);
  }

  const goStart = () => {
    setprogressbarvalue(1)
  }

  const changeLabel = (label) => {
    setLabel(label);
  }



  const components = [
    {key:1,component:<SetName valueAction = {changePBValue} title = {"Etkinlik oluşturmaya başla"} />},
    {key:2,component:<PhoneNumber title={"Telefon numarası"} changeLabel = {changeLabel} changePBValue = {changePBValue} value = {progressbarvalue} goStart = {goStart}/>}
  ]


  return (
    <div id="entry-page">
      <ToastContainer />
      <div id="navbar">
        <img src={AppIcon}></img>
        <Header id="head">aktivity.app</Header>
      </div>
      <div id="component">
        <Progress size = {'tiny'} value = {progressbarvalue}  total = "3" indicating style = {{width:"70%"}} ><span style={{color:"white"}}>{label}</span></Progress>
        {
          components.filter(component => component.key === progressbarvalue).map(component => (component.component))
        }
      </div>
      <img id="image" src={EntryImage} />
    </div>
  );
}
export default Entry;
