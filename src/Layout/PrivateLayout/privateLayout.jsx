import { Routes, Route } from "react-router-dom";
import { PrivateRouteList } from "../../Router/routeList";
import SideBar from "../../Component/Reusable/SideBar";
import NavBar from "../../Component/Reusable/Navbar";

function PrivateLayout() {
  const handleRouting = () => {
    return PrivateRouteList.map((item) => {
      return (
        <Route path={item?.path} element={item?.component} key={item?.path} />
      );
    });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NavBar />
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: "1" }}>
            <SideBar />
          </div>
          <div style={{ flex: "9", padding: "20px",marginTop: "-55px" }}>
            <Routes>{handleRouting()}</Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateLayout;
