// import "./index.css";
// // import AppRouter from "./routes/AppRouter.jsx";
// import { createRoot } from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import App from "./App.jsx";

// import 'leaflet/dist/leaflet.css';

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// createRoot(document.getElementById("root")).render(
//   <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//     <App />
//     {/* <AppRouter /> */}
//     <ToastContainer position="top-center" style={{ zIndex: 9999 }} />
//   </ClerkProvider>
// );


// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App';

// // Include Leaflet CSS
// import 'leaflet/dist/leaflet.css';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from "./routes/AppRouter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Include Leaflet CSS
import 'leaflet/dist/leaflet.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppRouter />
    <ToastContainer position="top-center" style={{ zIndex: 9999 }} />
  </React.StrictMode>
);