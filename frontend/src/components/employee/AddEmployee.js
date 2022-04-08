import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'



export default function AddEmployee() {

    const [isLoading, setLoading] = useState(false);

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [birthDay, setbirthDay] = useState("");
    const [gender, setGender] = useState("");
    const [mail, setmail] = useState("");
    const [materialStatus, setmaterialStatus] = useState("");
    const [Department, setDepartment] = useState("");
    const [empID, setempID] = useState("");
    const [TypeofEmployee, setTypeofEmployee] = useState("");

    async function submitData(e) {
        setLoading(true)
        try {
            e.preventDefault();
            if (!fName || !lName || !birthDay || !gender || !mail || !materialStatus || !Department || !TypeofEmployee || !empID) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else if (!validation.isEmail(mail)) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid mail address",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                const newDetails = {
                    fName, lName, birthDay, gender, mail, materialStatus, Department, TypeofEmployee,empID
                }
                const data = await (await axios.post("http://localhost:5000/employee/", newDetails)).status
                if (data === 200) {
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "Data added successfully",
                        icon: "success",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },
                    });
                }

            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    function clear() {

    }
    return (
        <div className="content">
            <h3>ADD-EMPLOYEE-DETAILS</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip01" class="form-label">First name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setfName(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip02" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setlName(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip01" class="form-label">Employee ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setempID(e.target.value) }} />
                </div>

                <br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Mail Address</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setmail(e.target.value) }} />
                </div>
                <div class="col-md-2 position-relative">
                    <div class="form-check" style={{ marginTop: "20px", marginLeft: "30px" }}>
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="male"
                            onChange={(e) => { setGender(e.target.value) }} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div class="form-check" style={{ marginLeft: "30px" }}>
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="female"
                            onChange={(e) => { setGender(e.target.value) }} />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Female
                        </label>
                    </div>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip04" class="form-label">Material State</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setmaterialStatus(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>Single</option>
                        <option>Married</option>
                    </select>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">Birth Day</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setbirthDay(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">Department</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setDepartment(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip04" class="form-label">Employee Type</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setTypeofEmployee(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Permanent">Permanent</option>
                    </select>
                </div>

                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i> Clear form</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Submit form'}</button>
                </div>
            </form>

        </div>
    )
}



{/* <div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male"
    onChange={(e) => { setMobile(e.target.value) }} />
<label class="form-check-label" for="inlineRadio1">1</label>
</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female"
    onChange={(e) => { setMobile(e.target.value) }} />
<label class="form-check-label" for="inlineRadio2">2</label>
</div>

<select class="form-select" multiple aria-label="multiple select example"  onChange={(e) => { setAddress(e.target.value) }} >
<option selected>Open this select menu</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option>
</select>
<button onClick={(e) => { SubmitEvent(e) }}>Submit</button> */}