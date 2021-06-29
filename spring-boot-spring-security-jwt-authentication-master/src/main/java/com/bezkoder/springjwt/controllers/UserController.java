package com.bezkoder.springjwt.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.springjwt.models.Appointment_Details;
import com.bezkoder.springjwt.models.Appointment_Details_Status;
import com.bezkoder.springjwt.models.Doctor_Details;
import com.bezkoder.springjwt.models.Patient_Details;
import com.bezkoder.springjwt.models.PrescriptionDetails;
import com.bezkoder.springjwt.models.Slot_Details;
import com.bezkoder.springjwt.models.Slot_Details_Status;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.Appointment_Details_Dao;
import com.bezkoder.springjwt.repository.Doctor_Details_Dao;
import com.bezkoder.springjwt.repository.Patient_Details_Dao;
import com.bezkoder.springjwt.repository.PrescriptionDetailsDao;
import com.bezkoder.springjwt.repository.Slot_Details_Dao;
import com.bezkoder.springjwt.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController 
{
	@Autowired
	Doctor_Details_Dao ddd;
	
	@Autowired
	Patient_Details_Dao pdd;
	
	@Autowired
	Slot_Details_Dao sd;

	@Autowired
	Appointment_Details_Dao ad;
	
	@Autowired
	PrescriptionDetailsDao pd;
	
	@Autowired
	UserRepository ur;
	
	@PostMapping("/add_patient_details")
	public String add_patient_details(@RequestBody Patient_Details obj)
	{
		List<User> temp = ur.findByEmail(obj.getEmail());
		long id = temp.get(0).getId();
		obj.setId(id);
		pdd.save(obj);
		return "True";
	}
	
	@PostMapping("/add_doc_details")
	@PreAuthorize("hasRole('ADMIN')")
	public String add_doc_details(@RequestBody Doctor_Details obj)
	{
		List<User> temp = ur.findByEmail(obj.getEmail());
		long id = temp.get(0).getId();
		obj.setId(id);
		ddd.save(obj);
		return "True";
	}
	
	@GetMapping("/show_doctor_details")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Doctor_Details> show_doctor()
	{
		return ddd.findAll();
	}
	
	@GetMapping("/change_appoint_status/{id}")
	@PreAuthorize("hasRole('MODERATOR')")
	public String changeStatus(@PathVariable("id") int x)
	{
		System.out.println("Helloo");
		ad.setStatusForAppointment_Details("Accepted",x);
		return "true";
	}
	
	@PostMapping("/add_prescription")
	@PreAuthorize("hasRole('MODERATOR')")
	public String add_pres(@RequestBody PrescriptionDetails obj)
	{
		pd.save(obj);
		ad.setStatusForAppointment_Details("Closed",obj.getAppointId());
		return "true";
	}
	
	@GetMapping("/get_prescription/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR')")
	public List<PrescriptionDetails> getPres(@PathVariable("id") int x)
	{
		return pd.findByAppointId(x);
	}
	
	@GetMapping("/get_doc_appoint_details/{id}")
	@PreAuthorize("hasRole('MODERATOR')")
	public List<Appointment_Details_Status> getDocAppointment(@PathVariable("id") int x)
	{
		List<Appointment_Details> lis = ad.findByDoctor_id(x);
		List<Appointment_Details_Status> newl= new ArrayList<Appointment_Details_Status>();
		for(int i=0;i<lis.size();i++)
		{
			int slot = lis.get(i).getSlotid();
			int doc = lis.get(i).getPatient_id();
			List<Slot_Details> sdob = sd.findBySlot_id(slot);
			String date = sdob.get(0).getDate();
			String sldet = sdob.get(0).getSlot_details();
			List<Patient_Details> ldoc = pdd.findById(doc);
			String name = ldoc.get(0).getName();
			String num = ldoc.get(0).getContact_no();
			String stat = lis.get(i).getStatus();
			Appointment_Details_Status ads = new Appointment_Details_Status((int)lis.get(i).getId(),date,sldet,name,num,stat);
			newl.add(ads);
		}
		return newl;
	}
	
	@GetMapping("/get_appoint_details/{id}")
	@PreAuthorize("hasRole('USER')")
	public List<Appointment_Details_Status> getAppointment(@PathVariable("id") int x)
	{
		List<Appointment_Details> lis = ad.findByPatient_id(x);
		List<Appointment_Details_Status> newl= new ArrayList<Appointment_Details_Status>();
		for(int i=0;i<lis.size();i++)
		{
			int slot = lis.get(i).getSlotid();
			int doc = lis.get(i).getDoctor_id();
			List<Slot_Details> sdob = sd.findBySlot_id(slot);
			String date = sdob.get(0).getDate();
			String sldet = sdob.get(0).getSlot_details();
			List<Doctor_Details> ldoc = ddd.findById(doc);
			String name = ldoc.get(0).getName();
			String num = ldoc.get(0).getContact_no();
			String stat = lis.get(i).getStatus();
			Appointment_Details_Status ads = new Appointment_Details_Status((int)lis.get(i).getId(),date,sldet,name,num,stat);
			newl.add(ads);
		}
		return newl;
	}
	
	@GetMapping("/get_slot_details/{id}")
	@PreAuthorize("hasRole('USER')")
	public List<Slot_Details_Status> getbyid(@PathVariable("id") int x)
	{
		List<Slot_Details_Status> obj = new ArrayList<Slot_Details_Status>();
		List<Slot_Details> lis = sd.findByDoctor(x);
		for(int i=0;i<lis.size();i++)
		{
			int j = (int) lis.get(i).getSlot_id();
			String add = "";
			if(ad.findBySlotid(j).size()==0)
			{
				add = add + "Available";
			}
			else
			{
				add = add + "Not Available";
			}
			Slot_Details_Status temp = new Slot_Details_Status((int)lis.get(i).getSlot_id(),lis.get(i).getDoctor(),lis.get(i).getDate(),lis.get(i).getSlot_details(),add);
			obj.add(temp);
		}
		return obj;
	}
	
	@PostMapping("/add_doctor_details")
	@PreAuthorize("hasRole('ADMIN')")
	public String add_doctor_details(@RequestBody Doctor_Details obj)
	{
		ddd.save(obj);
		return "True";
	}
	
	@PostMapping("/add_slot_details")
	@PreAuthorize("hasRole('ADMIN')")
	public String add_slot_details(@RequestBody Slot_Details obj)
	{
		sd.save(obj);
		return "True";
	}
	
	@PostMapping("/book_slot")
	@PreAuthorize("hasRole('USER')")
	public String add_appointment_details(@RequestBody Appointment_Details obj)
	{
		ad.save(obj);
		return "True";
	}
}
