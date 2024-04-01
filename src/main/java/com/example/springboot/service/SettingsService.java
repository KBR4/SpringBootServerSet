package com.example.springboot.service;

import com.example.springboot.model.Settings;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

public interface SettingsService {
    String getAllSettings() throws IOException;
    Settings saveSetting(Settings setting);
    Settings findByName(String name);
    Settings updateSetting(Settings setting);
    //полагаю что реализация crud целиком нам не нужна - функция удаления настройки не нужна, добавления и сохранения тоже.
}
