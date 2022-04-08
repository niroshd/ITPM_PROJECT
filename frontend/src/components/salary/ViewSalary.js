import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jspdf from 'jspdf'
import "jspdf-autotable"
import '../Home.css'

export default function ViewSalary() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [allSalary, setSalary] = useState([]);





    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/salary/")).data.data
                setSalary(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }
       
        getDetails();
    },[])


    //This useEffect method is used to perform a searching function
    useEffect(() => {
        console.log(allSalary)
        setfiltered(
            allSalary.filter(items => {
                return items.mail.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, allSalary])


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Emplyee ID", "Hour rate", "Work hour(per day)","Worked day","OT Rate","OT Hour","Monthly Salary"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.empID,
                ticket.ratePerHour,
                ticket.workedHour,
                ticket.workingDay,
                ticket.otRate,
                ticket.otPerHour,
                ticket.total

            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Employee-Salary-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Employee-Salary-Report_${dateStr}.pdf`);

    }


    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{width: "10rem", height: "10rem",  marginTop:"100px"}} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div hidden={tebleStatus}>{/* This part used to get all users data into table */}
                <nav className="navbar bg-white" >
                    <div className="container-fluid">
                        <h3>VIEW-SALARY</h3>
                        <button type="button" className="btn btn-outline-danger" id="pdfButton" onClick={(e) => { generatePDF(allSalary) }}><i className="fa fa-file-pdf"></i>  PDF</button>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-white table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Hour rate</th>
                                <th scope="col">Work hour(per day)</th>
                                <th scope="col">Worked day</th>
                                <th scope="col">OT Rate</th>
                                <th scope="col">OT Hour</th>
                                <th scope="col">Monthly Salary</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((salary) => {
                                return <tr>
                                    <td>{salary.mail}</td>
                                    <td> {salary.ratePerHour}</td>
                                    <td> {salary.workedHour}</td>
                                    <td> {salary.workingDay}</td>
                                    <td> {salary.otRate}</td>
                                    <td> {salary.otPerHour}</td>
                                    <td> {salary.total}</td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
