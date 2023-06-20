import { AppstoreOutlined} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical p-4"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Card View",
            icon: <AppstoreOutlined />,
            key: "/card-view",
          },
          {
            label: "Year",
            icon: <AppstoreOutlined />,
            key: "/year",
          },
          {
            label: "Region",
            icon: <AppstoreOutlined />,
            key: "/region",
          },
          {
            label: "Data Insights",
            icon: <AppstoreOutlined />,
            key: "/data-insights",
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
