package com.bezkoder.springjwt.models;

public class Slot_Details_Status 
{
	private int slot_id;
	private int doctor;
	private String date;
	private String slot_details;
	private String status;
	public long getSlot_id() {
		return slot_id;
	}
	public void setSlot_id(int slot_id) {
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Slot_Details_Status(int slot_id, int doctor, String date, String slot_details, String status) {
		super();
		this.slot_id = slot_id;
		this.doctor = doctor;
		this.date = date;
		this.slot_details = slot_details;
		this.status = status;
	}
	public Slot_Details_Status() {
		super();
		// TODO Auto-generated constructor stub
	}
}
