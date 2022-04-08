import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topnav from './components/layouts/topnav'
import EMPSideNav from './components/layouts/EMPsidenav'
import AddEmployee from './components/employee/AddEmployee'
import ViewEmployees from './components/employee/ViewAllEmployees'
import ViewOneEmployee from './components/employee/ViewOneEmployee'
import AddSalary from './components/salary/AddSalary'
import ViewSalary from './components/salary/ViewSalary'







function App() {
  return (
    <BrowserRouter>

      <Route path = "/"><Topnav/></Route>

      {/* Employee Manager Routes */}
      <Route path = "/employeeManager"><EMPSideNav/></Route>
      <Route exact path = "/employeeManager/add"><AddEmployee/></Route>
      <Route exact path = "/employeeManager/view"><ViewEmployees/></Route>
      <Route exact path = "/employeeManager/view/:id"><ViewOneEmployee/></Route>
      <Route exact path = "/employeeManager/salary/add"><AddSalary/></Route>
      <Route exact path = "/employeeManager/salary/view"><ViewSalary/></Route>




    </BrowserRouter>
  );
}

export default App;
