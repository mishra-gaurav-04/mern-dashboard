import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../../Pages/Home';
import CardView from '../../Pages/CardView';
import Year from '../../Pages/Year';
import DataInsights from '../../Pages/DataInsights';
import Region from '../../Pages/Region';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/card-view" element={<CardView />}></Route>
      <Route path="/year" element={<Year />}></Route>
      <Route path="/region" element={<Region />}></Route>
      <Route path="/data-insights" element={<DataInsights/>}></Route>
    </Routes>
  );
}
export default AppRoutes;
