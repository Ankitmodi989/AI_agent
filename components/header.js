import React from "react";
import { Outlet,Link } from "react-router";
function Header(){
    return (
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
                    <button>About</button>
                    </Link>
                    <a href="">
                    <button>Contact</button>
                    </a>
                </div>
            </div>
        </header>
        </>
    );
}

export default Header;