//
const funcList = {

    queryEth: {
        fNo: 1,
        func: {}

    },
    queryToken: 2,
    listenBlock: 3,
    fabricBlock: 4,
    dbServer: {
        fNo: 5,
        func: {
            initDatabaseData: "dbServer/initDatabaseData",
            initDatafMasterdata: "dbServer/initDatafMasterdata",
            initDatafTrandata: "dbServer/initDatafTrandata",
            initDatafTrandetaileddata: "dbServer/initDatafTrandetaileddata",
            initDatafRank: "dbServer/initDatafRank",
            insertData: "dbServer/insertData"
        },
        funcType:{
            Master:"Master",
            fTran:"fTran",
            fTrandetailed:"fTrandetailed",
            Rank:"Rank"
        }
    }
}

//
module.exports = funcList;