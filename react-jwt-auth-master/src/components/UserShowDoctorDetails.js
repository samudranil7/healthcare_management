import React, { Component } from 'react'
import UserService from '../services/UserService';
import AuthService from '../services/auth.service'

export default class UserShowDoctorDetails extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = 
        {
            currentUser:undefined,
            doctors:[]     
        }
        this.clickHandler = this.clickHandler.bind(this)
    }
    componentDidMount() 
    {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser)
        {
            this.props.history.push("/login")
        }
        else if(!currentUser.roles.includes("ROLE_USER"))
        {
            this.props.history.push("/profile")
        }
        else
        { 
            this.setState({ currentUser: currentUser })
            UserService.getDoctorDetails().then((res)=> 
            {
                this.setState({doctors:res.data});
            });
        }
    }
    clickHandler(id,name,speciality)
    {
        this.props.history.push({
            pathname: '/show_slot_details',
            state: { 
                doctor_id: id, 
                doctor_name: name,
                doctor_speciality:speciality,
            }
          })
    }
    render() {
        return (
            <div>
                <h2 className="text-center"> Details of Doctors Available </h2>
                <div className="row">
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Name </th>
                                <th> Speciality </th>
                                <th> Contact No </th>
                                <th> Email </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.doctors.map(
                                    doctor=>
                                    <tr key={doctor.id}>
                                        <td> {doctor.name}</td>
                                        <td> {doctor.speciality}</td>
                                        <td> {doctor.contact_no} </td>
                                        <td> {doctor.email} </td>
                                        <td> <button className="btn btn-primary" onClick={ () => this.clickHandler(doctor.id,doctor.name,doctor.speciality) }> Book Appointment </button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
