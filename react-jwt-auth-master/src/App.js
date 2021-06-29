import React, { Component } from "react";
import { Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import UserShowAppointmentDetails from "./components/UserShowAppointmentDetails";
import UserShowDoctorDetails from "./components/UserShowDoctorDetails";
import UserShowSlotDetails from "./components/UserShowSlotDetails"
import DoctorPrescription from "./components/DoctorPrescription";
import ShowPrescription from "./components/ShowPrescription";
import DoctorShowAppointmentDetails from "./components/DoctorShowAppointmentDetails";
import AdminAddSlot from "./components/AdminAddSlot";
import AdminAddNewDoctor from "./components/AdminAddNewDoctor";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showDoctorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showDoctorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showDoctorBoard, showAdminBoard ,showUserBoard} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Healthcare System
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showDoctorBoard && (
              <li className="nav-item">
                <Link to={"/show_doc_appoint_Details"} className="nav-link">
                  Show Appointment Details
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/add_doctor_details"} className="nav-link">
                  Add Doctor
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin_add_slot"} className="nav-link">
                  Add New Slot
                </Link>
              </li>
            )}

            {(showUserBoard) && (
              <li className="nav-item">
                <Link to={"/show_doctor_details"} className="nav-link">
                  Show Doctors
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/show_appoint_details"} className="nav-link">
                  Show Appointments
                </Link>
              </li>
            )}  

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/show_doctor_details" component = {UserShowDoctorDetails}></Route>
            <Route exact path="/add_doctor_details" component = {AdminAddNewDoctor}></Route>
            <Route exact path="/show_slot_details" render={(props) => <UserShowSlotDetails {...props}/>}/>
            <Route exact path="/show_appoint_details" component = {UserShowAppointmentDetails}></Route>
            <Route exact path="/doctor_prescription" render={(props) => <DoctorPrescription {...props}/>}/>
            <Route exact path="/show_prescription" render={(props) => <ShowPrescription {...props}/>}/>
            <Route exact path="/show_doc_appoint_details" component = {DoctorShowAppointmentDetails}></Route>
            <Route exact path="/admin_add_slot" component = {AdminAddSlot}></Route>

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
