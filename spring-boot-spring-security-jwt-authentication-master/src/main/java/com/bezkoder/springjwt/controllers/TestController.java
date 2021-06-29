package com.bezkoder.springjwt.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController 
{
	@GetMapping("/all")
	public String allAccess() 
	{
		return "Healthcare Managament create booking and manage appointmnets in a single place";
	}
}
