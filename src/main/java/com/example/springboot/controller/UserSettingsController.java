package com.example.springboot.controller;

import com.example.springboot.model.Settings;
import com.example.springboot.service.SettingsService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/settings")
public class UserSettingsController {
    private final SettingsService service; //создание тесной связи между прикладными компонентами

    public UserSettingsController(SettingsService service) {
        this.service = service;
    }

    @GetMapping             //todo предполагаю что Get должен считывать информацию из settings.json ?
    public String getSettings() throws IOException {
        return service.getAllSettings();
    }

    @PostMapping("save_setting")
    public Settings saveSetting(@RequestBody Settings setting) {
        return service.saveSetting(setting);
    }

    @GetMapping("/{name}")
    public Settings findByName(@PathVariable String name) {
        return service.findByName(name);
    }

    @PutMapping("update_setting")
    public Settings updateSetting(Settings setting) {
        return service.updateSetting(setting);
    }
}
