/**
 * Created by ben on 14-6-12.
 */
 
var query = require("./query.js");
query.queryArrivalForetell("2", "湾仔沙", function (err, data) {
    if (err) {
        console.log("出错啦，报错内容如下：\n" + err);
    }
    var txt = "您正在查询 " + data.queryLineName + "  的到站情况如下：\n\n",
        i,
        dataLength;
    for (i = 0, dataLength = data.foretellDetail.length; i < dataLength; i++) {
        txt += "从 " + data.foretellDetail[i].startStationName + " → " + data.foretellDetail[i].endStationName +
            "\n已到达 " + data.foretellDetail[i].vehicleStationName +
            "\n还有 " + data.foretellDetail[i].distanceStationNumber + " 个站到达 " + data.queryStationName +
            "\n-------------------------------------------------------------------------------------------\n";
    }
    console.log(txt);
});
