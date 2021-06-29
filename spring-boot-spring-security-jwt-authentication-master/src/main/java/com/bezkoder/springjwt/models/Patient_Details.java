package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class Patient_Details 
{
	@Id
	private long id;
	
	private String name;
	private String sex;
	private String age;
	private String email;
	private String contact_no;
	
	
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
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContact_no() {
		return contact_no;
	}
	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}
	public Patient_Details(long id, String name, String sex, String age, String email, String contact_no) {
		super();
		this.id = id;
		this.name = name;
		this.sex = sex;
		this.age = age;
		this.email = email;
		this.contact_no = contact_no;
	}
	public Patient_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
