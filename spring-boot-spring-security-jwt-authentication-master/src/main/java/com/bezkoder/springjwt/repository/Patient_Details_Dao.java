package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Patient_Details;

@Service
public interface Patient_Details_Dao extends JpaRepository<Patient_Details,Long>
{
	List<Patient_Details> findById(long i);
}
