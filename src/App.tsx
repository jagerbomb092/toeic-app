import "./App.scss";
import "antd/dist/antd.css";
import React from "react";
import { QuickLink } from "./01.module/QuickLink/QuickLink";
import StoryStudent from "./01.module/StoryStudent/EmployeeOfTheMonth";



function App() {
  return (
    <div className="HomePage">
    <QuickLink/>
    <StoryStudent/>
    </div>
  );
}

export default App;
