/**
 * Created by ben on 14-6-12.
 */

var http = require("http");
var xmlreader = require("xmlreader");

var reqSite = (function () {
    var analytical = function (url) {
        var re = /(.+\.[a-z]{2,6}):?(\d{0,4})?(\/.+)/i;
        var urlMeta = re.exec(url);
        return{
            "host": urlMeta[1],
            "port": urlMeta[2] ? urlMeta[2] : "80",
            "path": urlMeta[3]
        }
    };
    return{
        getData: function (url, callback) {
            var meta = analytical(url);
            var options = {
                host: meta.host,
                port: meta.port,
                path: meta.path,
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.1) Gecko/20090624 Firefox/3.5"
                }
            };
            var req = http.request(options, function (res) {
                var data = "";
                res.setEncoding("utf8");
                res.on("data", function (chunk) {
                    data += chunk;
                });
                res.on("end", function () {
                    return callback(false, data);
                });
            });
            req.on("error", function (err) {
                return callback(err, false);
            });
            req.end();
        },
        getJsonData: function (url, callback) {
            this.getData(url, function (err, data) {
                if (err) {
                    return callback(err, false);
                }
                xmlreader.read(data, function (err, res) {
                    if (err) {
                        return callback(err, false);
                    }
                    return callback(false, res);
                });
            });
        }
    }
}());

exports.getData = reqSite.getData;
exports.getJsonData = reqSite.getJsonData;
