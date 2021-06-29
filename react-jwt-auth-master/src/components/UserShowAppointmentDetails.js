import React, { Component } from 'react'
import UserService from '../services/UserService'
import AuthService from '../services/auth.service'


export default class UserShowAppointmentDetails extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
             appoints:[],
             currentUser: undefined
        }
        this.clickShowHandler = this.clickShowHandler.bind(this)
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
            UserService.getAppointDetails(currentUser.id).then(res=>{
                this.setState({
                    appoints:res.data
                }) 
            });
        }
      }
    clickShowHandler(id,name)
    {
        this.props.history.push({
            pathname: '/show_prescription',
            state: { 
               appoint_id:id,
               pat_name: name,
               nav: "Doctor"
            }
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Appointment Details </h2>
                {this.state.appoints.length!==0 &&
                (<div className="row">
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Date </th>
                                <th> Slot Details </th>
                                <th> Doctor Name </th>
                                <th> Doctor Contact </th>
                                <th> Appointment Status </th>
                                <th> Actions </th>
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
                                            <td> No Actions </td>
                                        )}
                                        {appoint.status==="Accepted" && (
                                            <td> No Actions </td>
                                        )}
                                        {appoint.status==="Closed" && (
                                            <td> <button className="btn btn-primary" onClick={ () => this.clickShowHandler(appoint.id,appoint.name) }> Show Prescription </button></td>
                                        )}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>)
                }
                {
                    this.state.appoints.length===0 && (
                    <h2 className="text-center"> No Appointment Details Found</h2>
                    )}
            </div>
        )
    }
}
