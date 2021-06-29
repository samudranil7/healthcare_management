import React, { Component } from 'react'
import UserService from '../services/UserService'
import AuthService from '../services/auth.service'

export default class UserShowAppointmentDetails extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
             appoints:[]
        }
        this.clickConfirmHandler = this.clickConfirmHandler.bind(this)
        this.clickPresHandler = this.clickPresHandler.bind(this);
        this.clickShowHandler = this.clickShowHandler.bind(this);
    }
    clickShowHandler(id,name)
    {
        this.props.history.push({
            pathname: '/show_prescription',
            state: { 
               appoint_id:id,
               pat_name: name,
               nav: "Patient"
            }
        })
    }
    clickConfirmHandler(id)
    {
        UserService.acceptAppoint(id).then(res=>{
            window.location.reload(); 
        });
    }
    clickPresHandler(id,name)
    {
        this.props.history.push({
            pathname: '/doctor_prescription',
            state: { 
               appoint_id:id,
               pat_name: name
            }
        })
    }

    componentDidMount() 
    {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser)
        {
            this.props.history.push("/login")
        }
        else if(!currentUser.roles.includes("ROLE_MODERATOR"))
        {
            this.props.history.push("/profile")
        }
        else
        { 
            this.setState({ currentUser: currentUser })
            UserService.getDocAppointDetails(currentUser.id).then(res=>{
                this.setState({
                    appoints:res.data
                }) 
            });
        }
      }
    render() {
        return (
            <div>
                <h2 className="text-center"> Appointment Details </h2>
                <div className="row">
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Date </th>
                                <th> Slot Details </th>
                                <th> Patient Name </th>
                                <th> Patient Contact </th>
                                <th> Appointment Status </th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.appoints.map(
                                    appoint=>
                                    <tr key={appoint.id}>
                                        <td> {appoint.date}</td>
                                        <td> {appoint.sldet}</td>
                                        <td> {appoint.name} </td>
                                        <td> {appoint.num} </td>
                                        <td> {appoint.status} </td>
                                        {appoint.status==="Pending" && (
                                            <td> <button className="btn btn-primary" onClick={ () => this.clickConfirmHandler(appoint.id) }> Confirm Slot </button></td>
                                        )}
                                        {appoint.status==="Accepted" && (
                                            <td> <button className="btn btn-primary" onClick={ () => this.clickPresHandler(appoint.id,appoint.name) }> Make Prescription </button></td>
                                        )}
                                        {appoint.status==="Closed" && (
                                            <td> <button className="btn btn-primary" onClick={ () => this.clickShowHandler(appoint.id,appoint.name) }> Show Prescription </button></td>
                                        )}
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
