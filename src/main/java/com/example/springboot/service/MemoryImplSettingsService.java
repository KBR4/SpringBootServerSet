package com.example.springboot.service;

import com.example.springboot.model.Settings;
import com.example.springboot.repository.InMemoryDAOSettings;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MemoryImplSettingsService implements SettingsService {

    private final InMemoryDAOSettings repo;

    public MemoryImplSettingsService(InMemoryDAOSettings repo) {
        this.repo = repo;
    }

    @Override
    public String getAllSettings() throws IOException {
        return repo.getAllSettings();
    }
    @Override
    public String updateSetting(String text) throws IOException {
        return repo.updateSetting(text);
    }

    @Override
    public String readLogFile() throws IOException {
        return repo.readLogFile();
    }
}
