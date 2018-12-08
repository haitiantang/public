var HttpRequest = function() {};

module.exports = HttpRequest;

HttpRequest.prototype.get = (url, cb) => {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            if (cb !== null) {
                cb(JSON.parse(xhr.responseText));
            }
        }
    };
    var url =  "http://"+ Globals.localConfig.gate + ":" + Globals.localConfig.httpport + url;
    console.log(url);
    xhr.open('GET', url, true);
    if (cc.sys.isNative) {
        xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
    }
    xhr.timeout = 3000;  //3s.
    xhr.send();
}

HttpRequest.prototype.post = function(url,params,callback){  
    
    var url =  "http://"+ Globals.localConfig.httpurl + ":" + Globals.localConfig.httpport + url;
    var nums = arguments.length  
    if(nums == 2){  
        callback = arguments[1];  
        params = "";  
    }  
    var xhr = cc.loader.getXMLHttpRequest();  
    xhr.open("POST", url);  
    xhr.timeout = 3000;
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");  
    xhr.onreadystatechange = function () {
        console.log("xhr..........:",xhr);
        console.log("params.....:",params) 
        var err = false;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            err = false;  
        }else{  
            err = true;  
        }  
        var response = xhr.responseText;  
        callback(err,response);  
    };  
    xhr.send(params);  
}