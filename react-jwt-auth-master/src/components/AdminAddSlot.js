import React, { Component } from 'react'
import UserService from '../services/UserService';
import AuthService from '../services/auth.service'

export default class AdminAddSlot extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            id:"",
            date:"",
            slot:"",
            doctors:[]            
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeSlotHandler = this.changeSlotHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    saveHandler(event)
    {
        event.preventDefault()
        let obj = {date:this.state.date,doctor:this.state.id,slot_details:this.state.slot}
        //alert(JSON.stringify(obj))
        UserService.addSlot(obj).then(res=>{
            this.props.history.push("/show_doctor_details")
        });
    }
    changeDateHandler(event)
    {
        this.setState({
            date:event.target.value
        })
    }
    changeSlotHandler(event)
    {
        this.setState({
            slot:event.target.value
        })
    }
    componentDidMount() 
    {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser)
        {
            this.props.history.push("/login")
        }
        else if(!currentUser.roles.includes("ROLE_ADMIN"))
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
    changeNameHandler(event) 
    {
        this.setState({
            id:event.target.value
        })
    } 
    render() {
        return (
            <div>
                 <div className='row'>
                    <div className="card col-md-6 offset md-3 offset md-3">
                        <h3 className='text-center'> Add Doctor Slot </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>
                                        Pick Doctor Name:
                                        <select value={this.state.id} className="form-select form-select-lg mb-2" onChange={this.changeNameHandler}>
                                        <option>Select</option>
                                        {this.state.doctors.map(
                                            doctor=>
                                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>)}
                                        </select>
                                    </label>
                                    <br></br>
                                    <label> Date </label>
                                    <input type='Date' placeholder='Enter Date of Slot' className='form-control'
                                        value={this.state.date} onChange={this.changeDateHandler}/>
                                    <label> Slot Details </label>
                                    <input placeholder='Enter Slot Details' className='form-control'
                                        value={this.state.slot} onChange={this.changeSlotHandler}/>
                                </div>
                                <button className="btn btn-success" onClick={this.saveHandler}> Save </button>
                            </form>       
                        </div>       
                    </div>
                </div>
            </div>
        )
    }

}
