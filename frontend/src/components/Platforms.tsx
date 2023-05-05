import {useContext, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import { retrievePlatforms } from "../data/getPlatforms";
import {Alert, Tooltip} from "react-bootstrap"
import {Switch} from "antd";
import { PageContext } from "../App"
import { IPlatform } from "../data/dataTypes";
import { platform } from "os";

const PlatformToggleSwitch = ({name}: any) => {

  const {pageState, dispatch} = useContext(PageContext);

  const [checked, setChecked] = useState(true);

  const handleChange = (checked: boolean, event: any) => {
    console.log(name + " selected is " + checked) ;
    setChecked(checked);
    
    pageState.platforms.forEach((platform) => {
      if (platform.name === name) {
        platform.selected = checked;
      
        const action = {
          type : "filterPlatforms",
        }
        dispatch(action) ;

        return;
      }
    })

  }

  return (
    <Switch className="filter-switch"
      id = {name}
      checked = {checked}
      checkedChildren={name}
      unCheckedChildren={name}
      onClick={handleChange}
    />
  )

}


export const Platforms  = () => {

  const {pageState, dispatch} = useContext(PageContext);

    const platforms = pageState.platforms;

    retrievePlatforms(platforms, dispatch);
    
    if (platforms == null) {
        return <Alert variant = "" className="platforms-container">Loading Platforms!</Alert>
    } 

    return (
      <div className="platforms-container" role="platforms-container">
          <p className ="title-filter">Narrow your search to your fav. platforms</p>

        {/* <Alert variant = "" className="title">Your Platforms:</Alert> */}
        <div className="list-container">
          {/* {platforms.map((platform) => (
                        <div className = "one-platform" key={platform.id}>
                            <input value={platform.name} type="checkbox" />
                            <span>{platform.name} </span>
                        </div>
                    ))} */}

        {platforms.map((platform: IPlatform) => (
          <PlatformToggleSwitch name={platform.name} key={platform.name} />
        ))}

        </div>
      </div>
    );

};

