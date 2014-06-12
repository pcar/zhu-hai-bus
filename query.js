/**
 * Created by ben on 14-6-12.
 */

var req = require("./reqSite.js");

var busQuery = (function () {
    var queryArrivalForetell = function (line, station, callback) {
        var url = "zhgj.zhuhai.gd.cn:8090/BusTransfer/brewMobile/queryArrivalForetell?lineName=" + line + "路&stationName=" + station;
        req.getJsonData(url, function (err, data) {
            if (err) return callback(err, false);
            var meat = {},
                result = data.Result,
                foretellDetailList = [],
                empty = result.lineEmpty;
            if (empty) return callback(false, empty.text());
            meat.queryLineName = result.queryLineName.text();
            meat.queryStationName = result.queryStationName.text();
            result.foretellDetail.each(function (i, w) {
                foretellDetailList.push({"startStationName": w.startStationName.text(),
                    "endStationName": w.endStationName.text(),
                    "vehicleStationName": w.vehicleStationName.text(),
                    "distanceStationNumber": w.distanceStationNumber.text()});
            });
            meat.foretellDetail = foretellDetailList;
            return callback(false, meat);
        });
    };
    return{
        queryArrivalForetell: queryArrivalForetell
    }
}());

exports.queryArrivalForetell = busQuery.queryArrivalForetell;
