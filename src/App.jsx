
// import { useState } from "react";
// import { Outlet } from "react-router";
// import Layout from "./layouts/Layouts";
// import './App.css'
// import SidebarResponsive from './components/Sidebar'
// import StoreLocator from "./pages/Storelocation";
// function App() {

// 	return (
// 		<>
// 			{/* <SidebarResponsive /> */}
// 			<div className="App">
// 			<StoreLocator />

// 			</div>
// 			<Outlet />
// 		</>
// 	);
// }

// export default App

import { useState } from "react";
import { Outlet } from "react-router";
import Layout from "./layouts/Layouts";
import './App.css'

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App


