package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Appointment_Details 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private int slotid;
	private int patient_id;
	private int doctor_id;
	private String status;
	public Appointment_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Appointment_Details(long id, int slotid, int patient_id, int doctor_id, String status) {
		super();
		this.id = id;
		this.slotid = slotid;
		this.patient_id = patient_id;
		this.doctor_id = doctor_id;
		this.status = status;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getSlotid() {
		return slotid;
	}
	public void setSlotid(int slotid) {
		this.slotid = slotid;
	}
	public int getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}
	public int getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
