package com.example.springboot.repository;

import com.example.springboot.model.Settings;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Repository;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static java.nio.charset.StandardCharsets.UTF_8;

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

        File file = new File("logfolder/logs.txt");
        FileInputStream fis = new FileInputStream(file);
        byte[] data = new byte[(int) file.length()];
        fis.read(data);
        fis.close();
        String str = new String(data, "UTF-8");
        return str;
//
//        try (Reader reader = new InputStreamReader(res.getInputStream(), UTF_8)) {
//            return FileCopyUtils.copyToString(reader);
//        } catch (IOException e) {
//            throw new UncheckedIOException(e);
//        }
        //return (new String(res.getInputStream().readAllBytes()));



    }
}
