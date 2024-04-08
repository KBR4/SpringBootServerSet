url_settings='http://localhost:8080/api/v1/settings';
url_logfile='http://localhost:8080/api/v1/settings/readlog';
url_update_settings='http://localhost:8080/api/v1/settings/update';

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
    return {settings: settings, searchKey: '', logfile: '', IsEdit:false };
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
             console.log(tabIndex, newTab.title, oldTab.title);
			 if (newTab.title === "Логи")
			 {
				 this.readLogfile();
			 }	 
      },
      updateLogs()
      {
        console.log("UpdateLogs started!");
      },
	  setEditMode()
	  {
		  this.IsEdit = true;
		  
		  //router.push('/');
	  },
	  setViewMode()
	  {
		  settings = this.settings;
		  var jsonset = this.settings;
		  var objj = {};
		  objj.settings = jsonset;
		  putAxios(url_update_settings, objj);
		  this.IsEdit = false;
		  //router.push('/');
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

var Setting = Vue.extend({
  template: '#setting',
  data: function () {
    return {setting: findSetting(this.$route.params.setting_name)};
  }
});


var router = new VueRouter({routes:[
  { path: '/', component: List},
  { path: '/setting/:setting_name', component: Setting, name: 'setting'}
]});
app = new Vue({
  router:router
}).$mount('#app')