package com.jasonlawrie;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller 
public class GuitarController {

	@RequestMapping("/")
	public String displayGreeting() {
		//I want to give the user a SINGLE, RANDOM chord
		String[] keyOptions = new String[12];
		return "guitar";
	}
}
