package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Slot_Details 
{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long slot_id;
	private int doctor;
	private String date;
	private String slot_details;
	public Slot_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Slot_Details(long slot_id, int doctor, String date, String slot_details) {
		super();
		this.slot_id = slot_id;
		this.doctor = doctor;
		this.date = date;
		this.slot_details = slot_details;
	}
	public long getSlot_id() {
		return slot_id;
	}
	public void setSlot_id(long slot_id) {
		this.slot_id = slot_id;
	}
	public int getDoctor() {
		return doctor;
	}
	public void setDoctor(int doctor) {
		this.doctor = doctor;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getSlot_details() {
		return slot_details;
	}
	public void setSlot_details(String slot_details) {
		this.slot_details = slot_details;
	}
	
}
