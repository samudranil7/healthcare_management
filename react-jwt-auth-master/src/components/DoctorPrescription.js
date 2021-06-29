import React, { Component } from 'react'
import UserService from '../services/UserService'

export default class DoctorPrescription extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
             id:"",
             name:"",
             pres:""
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange=(event)=>
    {
        this.setState({
            pres:event.target.value
        })
    }
    clickHandler=(event)=>
    {
        let appoint = {appointId:this.state.id,suggestion:this.state.pres};
        UserService.addPrescription(appoint).then(res=>{
            this.props.history.push("/show_doc_appoint_details")
        });
    }
    componentWillMount()
    {
        this.setState({
            id: this.props.location.state.appoint_id,
            name:this.props.location.state.pat_name
        })
    }
    render() {
        const {id,name} = this.state
        return (
            <div>
                <h2>New Prescription </h2>
                <h3>Appointment Id: {id}</h3>
                <h3>Patient Name: {name}</h3>
                <h3>Suggestions: {name}</h3>
                <textarea className="form-control" value={this.state.pres} onChange={this.handleChange}/>
                <br></br>
                <button type="button" class="btn btn-primary" onClick={this.clickHandler}>Confirm</button>
            </div>
        )
    }
}
