package com.bezkoder.springjwt.models;

public class Appointment_Details_Status 
{
	private int id;
	private String date;
	private String sldet;
	private String name;
	private String num;
	private String status;
	public Appointment_Details_Status(int id, String date, String sldet, String name, String num, String status) {
		super();
		this.id = id;
		this.date = date;
		this.sldet = sldet;
		this.name = name;
		this.num = num;
		this.status = status;
	}
	public Appointment_Details_Status() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getSldet() {
		return sldet;
	}
	public void setSldet(String sldet) {
		this.sldet = sldet;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
