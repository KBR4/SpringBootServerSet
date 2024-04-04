let url_settings='http://127.0.0.1/unhackme/help/settings.json';
let url_logfile='http://127.0.0.1/unhackme/help/log.txt';
let url_update_settings='http://localhost:3000/settings';

url_settings='http://localhost:8080/api/v1/settings';
url_logfile='http://localhost:8080/api/v1/settings/readlog';
url_update_settings='http://localhost:8080/api/v1/settings/update';

var  settings= [
    {
      "name": "LOG_LEVEL",
      "description": "Уровень логирования (10|20|30)",
      "value": "10"
    },
    {
      "name": "EXTERNAL_ADDRESS",
      "description": "Внешний адрес приложения",
      "value": "app.dna-tech.dev"
    },
    {
      "name": "DATABASE_HOST",
      "description": "Адрес сервера баз данных",
      "value": "127.0.0.1"
    }
    ];

 settings= [];

function findSetting (settingName) {
  return settings[findSettingKey(settingName)];
};

function findSettingKey (settingName) {
  for (var key = 0; key < settings.length; key++) {
    if (settings[key].name == settingName) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#setting-list',
  data: function () {
   if(settings.length == 0)
   {
     this.init();
   }  
    return {settings: settings, searchKey: '', logfile: ''};
  },
  computed: {
    filteredSettings: function () {
      return this.settings.filter(function (setting) {
        return this.searchKey == "" ||
          setting.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1 ||
          setting.description.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1
      },this);
    }
  },
    methods: {
        loadJSON(callback) {

            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', url_settings, true)
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        },
        loadAxios(url,callback) {
         axios.get(url)
          .then(response => ( callback(response)))
              .catch(error => console.log(error))
        },
        /*
                init() {
            let that = this
            that.loadJSON(function (response) {
                // Parse JSON string into object
                var data = JSON.parse(response);
                that.settings = data.settings
                settings= data.settings
            });
        },

        */
        init() {
            let that = this
            that.loadAxios(url_settings, function (response) {
                console.log(response);
                that.settings = response.data.settings;
                settings= response.data.settings;
            });
        },
        readLogfile() {
            let that = this
            that.loadAxios(url_logfile, function (response) {
                console.log(response);
                that.logfile = response.data;
            });
        },
     TabChange(tabIndex, newTab, oldTab){
             console.log(tabIndex, newTab.title, oldTab.title)
      },
      updateLogs()
      {
        console.log("UpdateLogs started!");
      }
    },
  
});

function putAxios(url, data) 
{
try {
         axios.put(url,data)
          .then(function (response) {  console.log(response);  })          
          .catch(error => console.log(error))
          .finally(function () { console.log('Finished put') });
          
} catch (error) 
  {
   console.error(error);
  }          
};

var Edit = Vue.extend({
  template: '#edit-list',
  data: function () {
    return {settings: settings, searchKey: ''};
  },
  computed: {
    filteredSettings: function () {
      return this.settings.filter(function (setting) {
        return this.searchKey == "" ||
          setting.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1 ||
          setting.description.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1
      },this);
    }
  },
  methods: {
    updateSettings: function () {
      settings=this.settings;
      putAxios(url_update_settings, this.settings);
      
      router.push('/');
    }
  }
  
});

var Setting = Vue.extend({
  template: '#setting',
  data: function () {
    return {setting: findSetting(this.$route.params.setting_name)};
  }
});

var SettingEdit = Vue.extend({
  template: '#setting-edit',
  data: function () {
    return {setting: findSetting(this.$route.params.setting_name)};
  },
  methods: {
    updateSetting: function () {
      var setting = this.setting;
      settings[findSettingKey(setting.name)] = {
        name: setting.name,
        name: setting.name,
        description: setting.description,
        value: setting.value
      };
      router.push('/');
    }
  }
});

var SettingDelete = Vue.extend({
  template: '#setting-delete',
  data: function () {
    return {setting: findSetting(this.$route.params.setting_name)};
  },
  methods: {
    deleteSetting: function () {
      settings.splice(findSettingKey(this.$route.params.setting_name), 1);
      router.push('/');
    }
  }
});

var AddSetting = Vue.extend({
  template: '#add-setting',
  data: function () {
    return {setting: {name: '', description: '', value: ''}}
  },
  methods: {
    createSetting: function() {
      var setting = this.setting;
      settings.push({
        name: Math.random().toString().split('.')[1],
        name: setting.name,
        description: setting.description,
        value: setting.value
      });
      router.push('/');
    }
  }
});

var router = new VueRouter({routes:[
  { path: '/', component: List},
  { path: '/setting/:setting_name', component: Setting, name: 'setting'},
  { path: '/edit', component: Edit},
  { path: '/add-setting', component: AddSetting},
  { path: '/setting/:setting_name/edit', component: SettingEdit, name: 'setting-edit'},
  { path: '/setting/:setting_name/delete', component: SettingDelete, name: 'setting-delete'}
]});
app = new Vue({
  router:router
}).$mount('#app')