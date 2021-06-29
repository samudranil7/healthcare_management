package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Slot_Details;

@Service
public interface Slot_Details_Dao extends JpaRepository<Slot_Details,Long>
{
	List<Slot_Details> findByDoctor(int i);
	
	@Query(value = "SELECT * FROM slot_details WHERE slot_id=?1", nativeQuery = true)
	List<Slot_Details> findBySlot_id(int i);
}
