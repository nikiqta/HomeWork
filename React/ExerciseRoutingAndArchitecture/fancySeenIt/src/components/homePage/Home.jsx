import React from 'react';
import NavBar from "../NavigationBar/NavBar.jsx";
import ViewComponent from "../viewComponent/viewComponent";

export default function Home(props) {
       return (
            <div>
                <NavBar/>
                <ViewComponent/>
            </div>
       );
}