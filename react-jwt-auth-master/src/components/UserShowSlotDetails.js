import React, { Component } from 'react'
import UserService from '../services/UserService'
import AuthService from '../services/auth.service'


export default class UserShowSlotDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: "",
             id:"",
             speciality:"",
             slots: []
        }
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler(slot_id)
    {
        let booking = {slotid:slot_id, patient_id:this.state.currentUser.id, doctor_id:this.state.id,status:"Pending"}
        UserService.bookSlot(booking).then(res=>{
            window.location.reload(); 
        });
    }
    componentWillMount()
    {
        this.setState({
            id: this.props.location.state.doctor_id,
            name:this.props.location.state.doctor_name,
            speciality:this.props.location.state.doctor_speciality
        })
      
    }
    componentDidMount() 
    {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser)
        {
            this.setState({ redirect: "/home" });
        }
        else if(!currentUser.roles.includes("ROLE_USER"))
        {
            this.props.history.push("/profile")
        }
        else
        { 
            this.setState({ currentUser: currentUser })
            UserService.getSlotDetails(this.state.id).then((res)=> 
            {
                this.setState({
                    slots: res.data
                })
            });
        }
      }
    
    render() {
        const {name,speciality} = this.state
        return (
            <div>
                <h2 className="text-center">{name} {speciality}</h2>
                <h2 > Showing Available Slots </h2>
                <div className="row">
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Date </th>
                                <th> Slot Details </th>
                                <th> Slot Status </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                
                                this.state.slots.map(
                                    slot=>
                                    <tr key={slot.slot_id}> 
                                        <td>{slot.date}</td>
                                        <td>{slot.slot_details}</td>
                                        <td>{slot.status}</td>
                                        {slot.status==="Available" && (
                                            <td> <button className="btn btn-primary" onClick={ () => this.clickHandler(slot.slot_id) }> Book Slot </button></td>
                                        )}
                                        {slot.status==="Not Available" && (
                                            <td> Slot Not Available </td>
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
