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
//        return List.of(
//                new Settings("LOG_LEVEL", "Уровень логирования(10/20/30)", "10"),
//                new Settings("EXTERNAL_ADDRESS", "Внешний вид приложения", "app.dna-tech.dev"),
//                new Settings("DATABASE_HOST", "Адрес сервера баз данных", "127.0.0.1")
//        );
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
