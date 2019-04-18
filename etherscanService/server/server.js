var func = require('../config/configFunctionList');
var mongodbServer = require('../server/mongodbServer');

//
var funcquery = async (ftype, funcType, funcName, fdata) => {
    //

    console.log("funcquery");
    var result;
    switch (ftype) {
        case func.queryToken:
            console.log(func.queryToken);
            break;
        case func.dbServer.fNo:
            console.log("============================================================dbServer=>", ftype);
            result = queryMethodMongodb(funcType, funcName, fdata);
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


var queryMethodMongodb = (funcType, funcName, fdata) => {
    //
    // console.log("queryMethodMongodb");
    console.log("============================================================queryMethodMongodb=>", funcName);


    var result = '';
    switch (funcName) {
        case func.dbServer.func.initDatabaseData:
            result = mongodbServer.init.initDatabaseData(fdata);
            break;
        case func.dbServer.func.initDatafMasterdata:
            result = mongodbServer.init.initDatafMasterdata(fdata);
            break;
        case func.dbServer.func.initDatafTrandata:
            result = mongodbServer.init.initDatafTrandata(fdata);
            break;
        case func.dbServer.func.initDatafTrandetaileddata:
            result = mongodbServer.init.initDatafTrandetaileddata(fdata);
            break;
        case func.dbServer.func.initDatafRank:
            result = mongodbServer.init.initDatafRank(fdata);
            break;
        case func.dbServer.func.insertData:
            result = insertData(funcType, fdata);
            break;
        default:
            result = {err: "no find funcname "};
    }
    return result;
}

var insertData = (funcType, fdata) => {
    //
    var result = '';
    switch (funcType) {
        case func.dbServer.funcType.Master:
            result = mongodbServer.insert.insertfMasterdata(fdata);
            break;
        case func.dbServer.funcType.fTran:
            result = mongodbServer.insert.insertfTrandata(fdata);
            break;
        case func.dbServer.funcType.fTrandetailed:
            result = mongodbServer.insert.insertfTrandetaileddata(fdata);
            break;
        case func.dbServer.funcType.Rank:
            result = mongodbServer.insert.insertfRank(fdata);
            break;
        default:
            result = {err: "no find funcname "};
            break;
    }
    return result;
}

//
module.exports = funcquery;