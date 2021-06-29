import axios from 'axios'
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';
class GetbankDetails
{
    addPatient(patient)
    {
        return axios.post(API_URL+ 'add_patient_details',patient);
    }
    addDoctor(doctor)
    {
        return axios.post(API_URL+ 'add_doc_details',doctor,{ headers: authHeader() });
    }
    addSlot(obj)
    {
        return axios.post(API_URL+"add_slot_details/",obj,{ headers: authHeader() });
    }
    getDoctorDetails()
    {
        return axios.get(API_URL+"show_doctor_details", { headers: authHeader() })
    }
    getSlotDetails(id)
    {
        return axios.get(API_URL+"get_slot_details/"+id,{ headers: authHeader() })
    }
    bookSlot(booking)
    {
        return axios.post(API_URL+"book_slot/",booking,{ headers: authHeader() });
    }
    getAppointDetails(id)
    {
        return axios.get(API_URL+"get_appoint_details/"+id,{ headers: authHeader() })
    }
    getDocAppointDetails(id)
    {
        return axios.get(API_URL+"get_doc_appoint_details/"+id,{ headers: authHeader() })
    }
    acceptAppoint(id)
    {
        return axios.get(API_URL+"change_appoint_status/"+id,{ headers: authHeader() })
    }
    addPrescription(obj)
    {
        return axios.post(API_URL+"add_prescription/",obj,{ headers: authHeader() });
    }
    getPrescription(id)
    {
        return axios.get(API_URL+"get_prescription/"+id,{ headers: authHeader() })
    }
}

export default new GetbankDetails();