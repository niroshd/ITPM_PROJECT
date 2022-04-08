import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';


export default function ViewOneEmployee() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);



    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [birthDay, setbirthDay] = useState("");
    const [gender, setGender] = useState("");
    const [mail, setmail] = useState("");
    const [materialStatus, setmaterialStatus] = useState("");
    const [Department, setDepartment] = useState("");
    const [TypeofEmployee, setTypeofEmployee] = useState("");


    const { id } = useParams();

    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/employee/${id}`)).data.data
                setfName(result[0].fName);
                setlName(result[0].lName)
                setmail(result[0].mail);
                setbirthDay(result[0].birthDay)
                setGender(result[0].gender);
                setmaterialStatus(result[0].materialStatus)
                setDepartment(result[0].Department);
                setTypeofEmployee(result[0].TypeofEmployee)

                setLoaderStatus(true)
                setTableStatus(false)
                console.log(fName,materialStatus)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        try {
            e.preventDefault();
            const newDetails = {
                fName,lName,birthDay,gender,mail,materialStatus,Department,TypeofEmployee
            }
            const data = await (await axios.put(`http://localhost:5000/employee/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Something went wrong.. plz try again later",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }
        } catch (err) {

        }

    }

    function edit(e) {
        e.preventDefault();
        setTextState(false)
        setBtnGroupstate1(false)
        setBtnGroupstate2(true)
    }

    function cancel(e) {
        e.preventDefault();
        setTextState(true)
        setBtnGroupstate1(true)
        setBtnGroupstate2(false)
    }


    //This function is used to delete specific user
    function deleteUser(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:5000/employee/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/employeeManager/view"
                            },

                        });
                    }
                } catch (err) {
                    SoloAlert.alert({
                        title: "Oops!",
                        body: "Something went wrong",
                        icon: "error",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },

                    });
                }
            },
            onCancel: function () {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "You canceled delete request",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },

                });
            },

        })
    }
    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


            <div hidden={tebleStatus}>
                <h3>ADD-SERVICE-DETAILS</h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">First name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={fName}
                        onChange={(e) => { setfName(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={lName}
                        onChange={(e) => { setlName(e.target.value) }} disabled={textState}/>
                </div><br />
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Mail Address</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setmail(e.target.value) }} defaultValue={mail} disabled={textState}/>
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip04" class="form-label">Material State</label>
                    <select class="form-select" id="validationTooltip04" required disabled={textState} onChange={(e) => { setmaterialStatus(e.target.value) }}>
                        <option selected disabled>{materialStatus}</option>
                        <option>Single</option>
                        <option>Married</option>
                    </select>
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Department</label>
                    <input type="text" class="form-control" id="validationTooltip03" disabled={textState} required defaultValue={Department}
                        onChange={(e) => { setDepartment(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip04" class="form-label">Employee Type</label>
                    <select class="form-select" id="validationTooltip04" disabled={textState} onChange={(e) => { setTypeofEmployee(e.target.value) }}>
                        <option selected disabled value="">{TypeofEmployee}</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Permanent">Permanent</option>
                    </select>
                </div>

                <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                        <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                            disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                        <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={(e) => { deleteUser(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                    </div>
            </form>
            </div>

        </div>
    )
}
