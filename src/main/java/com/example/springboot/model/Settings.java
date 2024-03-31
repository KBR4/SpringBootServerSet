package com.example.springboot.model;

public class Settings {
    private String name;
    private String description;
    private String value;
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }

    public Settings()
    {
        name = "Undefined";
        description = "Empty description";
        value = "No value";
    }
    public Settings(String nm, String desc, String val)
    {
        setName(nm);
        setDescription(desc);
        setValue(val);
    }
}
