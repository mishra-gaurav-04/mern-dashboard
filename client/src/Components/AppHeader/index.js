import {  Image,Typography } from "antd";

function AppHeader() {
  return (
    <div className="AppHeader">
      <Image width={100} height={100} src="https://i.ibb.co/3mnvG8T/Blackcoffer-logo-new.png"/>
      <Typography.Title style={{marginTop : "15px"}}>Blackcoffer</Typography.Title> 
    </div>
  );
}
export default AppHeader;
