url_settings='http://localhost:8080/api/v1/settings';
url_logfile='http://localhost:8080/api/v1/settings/readlog';
url_update_settings='http://localhost:8080/api/v1/settings/update';

GlobalSettings = [];
const TAB_SETTINGS = 0;
const TAB_LOGS = 1;
ConnectError= '';

function findSetting (settingName) {
  return GlobalSettings[findSettingKey(settingName)];
};

function findSettingKey (settingName) {
	for (var key = 0; key < GlobalSettings.length; key++) {
		if (GlobalSettings[key].name == settingName) {
		return key;
		}
	}
};

var List = Vue.extend({
	template: '#setting-list',
	data: function () {
	if(GlobalSettings.length == 0)
	{
		this.init();
	}  
		return {settings: JSON.parse(JSON.stringify(GlobalSettings)), searchKey: '', logfile: '', IsEdit:false,  errorText: '' };
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
        ConnectError='';
        this.errorText='';

        axios.get(url)
			.then(response => ( callback(response)))
			.catch(error => {console.log(error);
			ConnectError=error.message;
			this.errorText=error.message;
			})
        },
        putAxios(url, data) {
           try {
                ConnectError='';
                    axios.put(url,data)
                    .then(function (response) {  console.log(response);  })          
                    .catch(error => {
                    console.log(error);
                    ConnectError=error.message;
                    this.errorText="Update Settings: " +error.message;
                    })
                    .finally(function () { console.log('Finished put') });
         
            } catch (error)
				{
					console.error(error);
				}          
		},
        init() {
            let that = this
            that.loadAxios(url_settings, function (response) {
                console.log(response);
                that.settings = response.data.settings;
                GlobalSettings = response.data.settings;
            });
            this.readLogfile();
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
            switch(tabIndex)
			{
				case TAB_SETTINGS:
					this.settings = JSON.parse(JSON.stringify(GlobalSettings));
					this.IsEdit = false;
					break;
				case TAB_LOGS:
				this.readLogfile();
				break;
			}
		},
		updateLogs()
		{
			console.log("UpdateLogs started!");
		},
		setEditMode()
		{
		this.IsEdit = true; 
		},
		setViewMode()
		{
			GlobalSettings = JSON.parse(JSON.stringify(this.settings));
			var jsonset = this.settings;
			var objj = {};
			objj.settings = jsonset;
			this.errorText='';
			this.IsEdit = false;
			this.putAxios(url_update_settings, objj);
		}
    },
});


var router = new VueRouter({routes:[
	{ path: '/', component: List}
]});
app = new Vue({
	router:router
}).$mount('#app')