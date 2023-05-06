import {useContext, useEffect, useState} from "react"
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

    useEffect (() => {
        retrievePlatforms(platforms, dispatch);
      }
    )

    if (platforms == null) {
        return <Alert variant = "" className="platforms-container">Loading Platforms!</Alert>
    } 

    return (
      <div className="platforms-container" role="platforms-container">
          <div className ="title-filter">Platforms</div>
          <div className ="subtitle-filter">Narrow your search to your favorite platforms</div>

        {/* <Alert variant = "" className="title">Your Platforms:</Alert> */}
        <div className="list-container">
          {platforms.map((platform: IPlatform) => (
            <PlatformToggleSwitch name={platform.name} key={platform.name} />
          ))}

        </div>
      </div>
    );

};

