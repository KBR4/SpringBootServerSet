package com.example.springboot.repository;

import com.example.springboot.model.Settings;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
@Repository
public class InMemoryDAOSettings {
    private final List<Settings> SETTINGS = new ArrayList<>();
    public List<Settings> getAllSettings() {
        return SETTINGS;
    }
    public Settings saveSetting(Settings setting) {
        SETTINGS.add(setting);
        return setting;
    }
    public Settings findByName(String name) {
        return SETTINGS.stream()
                .filter(t -> t.getName().equals(name))
                .findFirst()
                .orElse(null);
    }
    public Settings updateSetting(Settings setting) {
        var settingIndex = IntStream.range(0, SETTINGS.size())
                .filter(t-> SETTINGS.get(t).getName().equals(setting.getName()))
                .findFirst()
                .orElse(-1);
        if (settingIndex > 1) {
            SETTINGS.set(settingIndex, setting);
            return setting;
        }
        return null;
    }
}
