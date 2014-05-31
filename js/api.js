function API(){
    this.apiURL = "https://api.stackexchange.com/2.2/";
    this.key="d*n0gDGjxMCov*oj1BwscQ(("
}
API.prototype.fetch = function(endpoint, data, filter, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            callback(JSON.parse(this.response))
        }
    }
    dataQuery=""
    for (key in data) {
        dataQuery += "&"+encodeURIComponent(key)+"="+encodeURIComponent(data[key])
    }
    xhr.open("get", this.apiURL + endpoint + "?key=" + this.key + "&filter=" + filter+dataQuery)
    xhr.send()
}
api = new API();

var Endpoints = {};

/*
Returns an array of data:
{
      "high_resolution_icon_url": "http://cdn.sstatic.net/stackoverflow/img/apple-touch-icon@2.png",
      "icon_url": "http://cdn.sstatic.net/stackoverflow/img/apple-touch-icon.png",
      "audience": "professional and enthusiast programmers",
      "site_url": "http://stackoverflow.com",
      "api_site_parameter": "stackoverflow",
      "logo_url": "http://cdn.sstatic.net/stackoverflow/img/logo.png",
      "name": "Stack Overflow",
      "site_type": "main_site"
}
*/

Endpoints.sites = function (callback) {
    api.fetch("sites", {pagesize: 200},"!*l7am1hhhNWy0gVy6Tw6o3-c", function(data){
        var data2=[]
        for (key in data.items) {
            if(data.items[key].site_type == "main_site") {
                data2.push(data.items[key])
            }
        }
        callback(data2)
    })
}
/*
Returns an array:
{
        "tags": ["php", "json"],
        "owner": {
            "user_id": 3522725,
            "user_type": "registered",
            "display_name": "user3522725"
        },
        "answer_count": 1,
        "score": 0,
        "last_activity_date": 1401547194,
        "question_id": 23971265,
        "title": "blah"
}
*/
Endpoints.site = function(site, callback) {
  api.fetch('questions' , {site: site, pagesize: 20, order:"desc", sort: "activity"}, 
            "!1PUEWfbg-(rVIo(iy.1XGkGfm4SJhhIUg", function(data) {
                                                    callback(data.items)
  })
}
