package com.example.lms_backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class DemoController {
    @GetMapping("/")
    public String helloWorld() {
        return "Backend API is running on";
    }

}
