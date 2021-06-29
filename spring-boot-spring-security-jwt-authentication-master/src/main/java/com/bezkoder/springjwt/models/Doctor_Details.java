package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class Doctor_Details 
{
	@Id
	private long id;

	private String name;
	private String contact_no;
	private String speciality;
	private String email;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContact_no() {
		return contact_no;
	}
	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}
	public String getSpeciality() {
		return speciality;
	}
	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Doctor_Details(long id, String name, String contact_no, String speciality, String email) {
		super();
		this.id = id;
		this.name = name;
		this.contact_no = contact_no;
		this.speciality = speciality;
		this.email = email;
	}
	public Doctor_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
}
