
import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/header";
import Body from "./components/body";
import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./Home";
import Web from "./apicall/devapi";

 function App() {
    return (
        <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="/web" element={<Web></Web>}></Route>
          </Routes>
          </BrowserRouter>
           
        </>
    );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App></App>)
