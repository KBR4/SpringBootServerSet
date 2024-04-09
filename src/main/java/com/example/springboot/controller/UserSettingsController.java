package com.example.springboot.controller;

import com.example.springboot.model.Settings;
import com.example.springboot.service.SettingsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/settings")
public class UserSettingsController {
    private final SettingsService service;
    public UserSettingsController(SettingsService service) {
        this.service = service;
    }

    @GetMapping
    public String getSettings() throws IOException {
        return service.getAllSettings();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/update")
    public String updateSetting(@RequestBody String text) throws IOException {
        return service.updateSetting(text);
    }

    @GetMapping("/readlog")
    public String readLogFile() throws IOException {
        return service.readLogFile();
    }
}
