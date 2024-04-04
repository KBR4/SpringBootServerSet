package com.example.springboot.repository;

import com.example.springboot.model.Settings;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
@Repository
public class InMemoryDAOSettings {
    private final List<Settings> SETTINGS = new ArrayList<>();
    @Autowired
    ResourceLoader resourceLoader;
    public String getAllSettings() throws IOException {
        Resource res = resourceLoader.getResource("classpath:settings.json");
        return (new String(res.getInputStream().readAllBytes()));
    }

    public String updateSetting(String text) throws IOException {
        try {
            String path = "classpath:settings.json";
            FileWriter fw = new FileWriter("src\\main\\resources\\settings.json");
            fw.write(text);
            fw.flush();
            fw.close();
            return text;
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String readLogFile() throws IOException {
        Resource res = resourceLoader.getResource("classpath:log.txt");
        return (new String(res.getInputStream().readAllBytes()));
    }
}
