var func = require('../config/configFunctionList');
var mongodbServer = require('../server/mongodbServer');

//
var funcquery = async (ftype, funcName, fdata) => {
    //

    console.log("funcquery");
    var result;
    switch (ftype) {
        case func.queryToken:
            console.log(func.queryToken);
        break;
            case func.dbServer.fNo:
            console.log("dbServer",func.dbServer);
            result = queryMethodMongodb(funcName, fdata);
            break;
        case func.fabricBlock:
            console.log(func.fabricBlock);
        break;
            case func.listenBlock:
            console.log(func.listenBlock);
        //
            break;

    }
    return result;

}

var queryMethodToken = (funcName, fdata) => {
    //
    switch (funcName) {
        case func.queryToken:

    }
}


var queryMethodMongodb = (funcName, fdata) => {
    //
    console.log("queryMethodMongodb");
    var result = '';
    switch (funcName) {
        case func.dbServer.func.initDatabaseData:
            result = mongodbServer.init.initDatabaseData(fdata);
            break;
        case func.dbServer.func.initDatafMasterdata:
            result = mongodbServer.init.initDatafMasterdata(fdata);
            break;
        case func.dbServer.func.initDatafTrandata:
            break;
            result = mongodbServer.init.initDatafMasterdata(fdata);
            break;
        case func.dbServer.func.initDatafTrandetaileddata:
            result = mongodbServer.init.initDatafTrandetaileddata(fdata);
            break;
        case func.dbServer.func.initDatafRank:
            result = mongodbServer.init.initDatafRank(fdata);
            break;
        default:
            result = { err:"no find funcname "};
    }
    return result;
}


//
module.exports = funcquery;