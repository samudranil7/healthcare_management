package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.PrescriptionDetails;

@Service
public interface PrescriptionDetailsDao extends JpaRepository<PrescriptionDetails, Long> 
{
	List<PrescriptionDetails> findByAppointId(int id);
}
