import React, { useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EMPSideNav() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/employeeManager/add">ADD EMPLOYEE</Link>
                <Link to="/employeeManager/view">VIEW EMPLOYEE</Link>
                <Link to="/employeeManager/salary/add">ADD SALARY</Link>
                <Link to="/employeeManager/salary/view">VIEW SALARY</Link>
            </div>


        </div>
    )
}
