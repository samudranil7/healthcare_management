package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Doctor_Details;



@Service
public interface Doctor_Details_Dao extends JpaRepository<Doctor_Details,Long>
{
	List<Doctor_Details> findById(long i);
}
