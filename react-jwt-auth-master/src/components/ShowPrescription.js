import React, { Component } from 'react'
import UserService from '../services/UserService'

export default class DoctorPrescription extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
             id:"",
             name:"",
             pres:"",
             sugg: []
        }
    }
    componentWillMount()
    {
        this.setState({
            id: this.props.location.state.appoint_id,
            name:this.props.location.state.pat_name,
            nav:this.props.location.state.nav
        })
    }
    componentDidMount()
    {
        UserService.getPrescription(this.state.id).then(res=>
            {
                this.setState({
                    sugg : res.data
                })
        });
    }
    render() {
        const {id,name,sugg,nav} = this.state
        return (
            <div>
                <h2>View Prescription </h2>
                <h3>Appointment Id: {id}</h3>
                <h3>{nav} Name: {name}</h3>
                <h3> Suggestions </h3>
                <h3>
                {sugg.map(item => (
                    item.suggestion
                ))}
                </h3>
                   
            </div>
        )
    }
}
