import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome/welcome"
import Login from "./pages/login/login"
import WaitingRoom from "./pages/waiting-room/waiting-room";
import UserList from "./pages/user-list/user-list";
import Nivel1 from "./pages/niveles/nivel1/nivel1";
import Nivel2 from "./pages/niveles/nivel2/nivel2";
import Nivel3 from "./pages/niveles/nivel3/nivel3";



const RouterPage = () => {

    return (


            <Routes>
                <Route exact path = '/' element = {<Welcome/>} />
                <Route exact path = '/home' element = {<Welcome/>} />
                <Route exact path = '/login' element = {<Login/>} />
                <Route exact path = '/user-list' element = {<UserList/>} />
                <Route exact path = '/waiting-room' element = {<WaitingRoom/>} />
                <Route exact path = '/nivel1' element = {<Nivel1/>} />
                <Route exact path = '/nivel2' element = {<Nivel2/>} />
                <Route exact path = '/nivel3' element = {<Nivel3/>} />
            </Routes>


    )
}



export default RouterPage;