/* mongoDB 参数设置*/

var configDB ={
    databaseUrl:'mongodb://localhost:27017/',// 数据库url
    databaseName:'drcbase',// 数据库名称
    tableName:{
        fMasterdata:"fMasterdata",
        fTrandata:'fTrandata',
        fTrandetaileddata:'fTrandetaileddata',
        fRank:'fRank'
    }
}

/*
* // 数据库url
databaseUrl: 'mongodb://localhost:27017/',
// 数据库名称
databaseName: 'blockTransationsDB',
// 数据表表名称
tableName: 'transations',
* */
module.exports = configDB;
