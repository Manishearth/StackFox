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
    api_site_parameter: "stackoverflow"
    high_resolution_icon_url: "http://cdn.sstatic.net/stackoverflow/img/apple-touch-icon@2.png"
    icon_url: "http://cdn.sstatic.net/stackoverflow/img/apple-touch-icon.png"
    logo_url: "http://cdn.sstatic.net/stackoverflow/img/logo.png"
    name: "Stack Overflow"
    site_type: "main_site"
    site_url: "http://stackoverflow.com"
}
*/

Endpoints.sites = function (callback) {
    api.fetch("sites", {pagesize: 200},"!*l7am1hhhNWy0gYFMR(C8vQ7", function(data){
        var data2=[]
        for (key in data.items) {
            if(data.items[key].site_type == "main_site") {
                data2.push(data.items[key])
            }
        }
        callback(data2)
    })
}
