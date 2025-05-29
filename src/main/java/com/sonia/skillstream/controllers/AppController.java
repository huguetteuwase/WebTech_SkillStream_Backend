package com.sonia.skillstream.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("welcome")
public class AppController {
    @CrossOrigin(origins = "*")
    @GetMapping
    public String Welcome() {
        return "Welcome to SkillStream";
    }
}
