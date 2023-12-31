import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { change_password, logOut_user } from "../../actions/userActions";
import { change_theme_setting } from "../../actions/settingAction";
import useSizing from "../../hooks/useSizing";
import HeaderComp from "../layout/HeaderComp/HeaderComp";
import ToolsPage from "../Tools/toolsPage";
import "./Setting.css";

import Updates from "../updates/Updates"

const Setting = (props) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const windowSizing = useSizing();

  const { user, isAuthenticated, logedOut } = useSelector(
    (state) => state.user
  );
  const { theme } = useSelector((state) => state.settings);

  const [Password_collection, setPassword_collection] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
   const { oldPassword, newPassword, confirmPassword } = Password_collection;

  // color theme setter
  const changeTheme = (e) => {
    if (localStorage.getItem("theme") === "light_theme") {
      localStorage.setItem("theme", "dark_theme");
      dispatch(change_theme_setting("dark_theme"));
    } else {
      localStorage.setItem("theme", "light_theme");
      dispatch(change_theme_setting("light_theme"));
    }
  };

  //udate password

  const InformationUpdator = (e) => {
    setPassword_collection({
      ...Password_collection,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = () => {
    dispatch(
      change_password(
        {
          id: user._id,
          oldPassword: oldPassword,
          confirmPassword: confirmPassword,
          newPassword: newPassword,
        },
        user
      )
    );
    
  };

   

  //logout
  const logout = () => {
    dispatch(logOut_user());
  };

  
   
  

  return (
    <Fragment>
      {windowSizing.innerWidth >= 768 ? (
        <div className="userAcountMainDiv" style={props.main.main}>
          <ToolsPage></ToolsPage>

          <div className="div4661" style={props.main.sub_body}></div>
        </div>
      ) : (
        <div className="mobleDiv4865" style={props.main.main}>
        
          <HeaderComp type="Profile"></HeaderComp>
          <div className=" mobileDiv5656 boxShodow" style={props.main.sub_body}>
            <div>
              <h4>Dark Mode</h4>
              {isAuthenticated ? (
                <label class="switch ">
                  <input
                    type="checkbox"
                    checked={theme === "dark_theme" ? "checked" : null}
                    onChange={changeTheme}
                  />
                  <span class="slider round"></span>
                </label>
              ) : null}
            </div>

            <div>
              <h4>Change Password</h4>

              <div>
                <label
                  className="custom-field one"
                  style={props.main.input.label}
                >
                  <input
                    type="text"
                    style={props.main.input.input}
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={InformationUpdator}
                  />
                  <span class="placeholder" style={props.main.input.span}>
                    Old pasword
                  </span>
                </label>
                <label
                  className="custom-field one"
                  style={props.main.input.label}
                >
                  <input
                    type="text"
                    style={props.main.input.input}
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={InformationUpdator}
                  />
                  <span class="placeholder" style={props.main.input.span}>
                    New passowrd
                  </span>
                </label>
                <label
                  className="custom-field one"
                  style={props.main.input.label}
                >
                  <input
                    type="text"
                    required
                    style={props.main.input.input}
                    name="confirmPassword"
                    onChange={InformationUpdator}
                  />
                  <span class="placeholder" style={props.main.input.span}>
                    Confirm password
                  </span>
                </label>

                <div>
                  <button className="btn_ligth" onClick={changePassword}>
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h4>Logout</h4>
              <div>
                <button onClick={logout} className="btn_ligth">
                  Log Out
                </button>
              
              </div>
            </div>
            <Updates></Updates>
            <div className="fakeDiv_setting"></div>
          </div>

          <ToolsPage></ToolsPage>
        </div>
      )}
    </Fragment>
  );
};

export default Setting;
