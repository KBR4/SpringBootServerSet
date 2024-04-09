package com.example.springboot.service;

import com.example.springboot.model.Settings;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

public interface SettingsService {
    String getAllSettings() throws IOException;
    String updateSetting(String text) throws IOException;
    String readLogFile() throws IOException;
}
