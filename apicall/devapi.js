
import React from "react"
import ReactDOM from "react-dom/client";
import { Outlet,Link } from "react-router";

export default function Web(){
    return(
        <>
        <header>
            <div className="head">
                <div className="headline">
                    <h1>Ai Agent </h1>
                </div>
                <div className="but">
                    <Link to={"/"}>
                    <button>Home</button>
                   </Link>
                   <Link to={"/web"}>
                    <button>Website</button>
                    </Link>
                    <a href="">
                    <button>Contact</button>
                    </a>
                </div>
            </div>
        </header>
        <div style={{backgroundColor:"rgba(6, 9, 40, 0.945)", height:"100vh"}}></div>
        </>
    )
}
