package com.bezkoder.springjwt.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.bezkoder.springjwt.models.Appointment_Details;



public interface Appointment_Details_Dao extends JpaRepository<Appointment_Details, Long> 
{
	List<Appointment_Details> findBySlotid(int i);
	@Query(value = "SELECT * FROM appointment_details WHERE patient_id=?1", nativeQuery = true)
	List<Appointment_Details> findByPatient_id(int i);
	
	@Query(value = "SELECT * FROM appointment_details WHERE doctor_id=?1", nativeQuery = true)
	List<Appointment_Details> findByDoctor_id(int i);
	
	@Transactional
	@Modifying
	@Query(value="update appointment_details ad set ad.status = ?1 "+"where ad.id = ?2 ", nativeQuery = true)
	void setStatusForAppointment_Details(String status,int id);
}

