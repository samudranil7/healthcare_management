package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class PrescriptionDetails 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private int appointId;
	private String suggestion;
	public PrescriptionDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PrescriptionDetails(int id, int appointId, String suggestion) {
		super();
		this.id = id;
		this.appointId = appointId;
		this.suggestion = suggestion;
	}
	public long getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAppointId() {
		return appointId;
	}
	public void setAppointId(int appointId) {
		this.appointId = appointId;
	}
	public String getSuggestion() {
		return suggestion;
	}
	public void setSuggestion(String suggestion) {
		this.suggestion = suggestion;
	}
	
}
