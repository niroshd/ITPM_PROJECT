import axios from 'axios'
import React from 'react'
import "./TopNav.css"



export default function topnav() {

    return (
        <div>
            <div id="navbar">
                <a href="#default" id="logo">EMPLOYEE MANEGMENT SYSTE</a>
                <div id="navbar-right">
                    <a class="active" href="#"><i class="fa fa-fw fa-home"></i> Home</a>
                    <a href="#"><i class="fa fa-eject"></i> About</a>
                    <a href="#"><i class="fa fa-fw fa-wrench"></i> Services</a>
                    <a href="#"><i class="fa fa-fw fa-envelope"></i>Contact</a>
                    <a href="#"><i class="fa fa-fw fa-user"></i>Feedback</a>
                </div>
            </div>

        </div>
    )
}

