const MongoClient = require('mongodb').MongoClient;

/* 子模块 */
var web3Server = require('../server/web3Server');
var REQconfigDB = require('../config/configDB');
var web3 = web3Server.init_web3();
//
var ActionMongoDB = {
    //
    //获取当前最新区块的前一个区块数
    getPrevBlockNum: async () => {
        //
        var currentBlockNum = await web3.eth.getBlockNumber();
        //
        var prevBlockNum = currentBlockNum - 1;
        console.log('===================================');
        console.log('currentBlockNum: ' + currentBlockNum);
        console.log('prevBlockNum: ' + prevBlockNum);
        return prevBlockNum;
    },

    getBlockTransactionCounts: async (blockNum) => {
        //获取当前区块前一个区块下的所有交易数量
        var transationCountByBlockNum = await web3.eth.getBlockTransactionCount(blockNum);

        //
        if (transationCountByBlockNum == null) throw 'Error: The transationCountByBlockNum is null, please try again later.';
        console.log('blockNum:' + blockNum + 'transationCountByBlockNum' + transationCountByBlockNum);
        //
        return transationCountByBlockNum;
    },

    //向数据库插入交易记录
    insertTransationData: async (response, blockNum, index) => {
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(REQconfigDB.databaseUrl, (err, db) => {
                if (err) reject(err);
                //
                var dbo = db.db(REQconfigDB.databaseName);

                // insert
                dbo.collection(REQconfigDB.tableName).insertOne(response, (err, res) => {
                    //
                    if (err) reject(err);
                    console.log("Insert success! BlockNum: " + blockNum + ' index: ' + index);
                    //
                    db.close();
                    resolve();
                });
            });
        });
    },

    //  初始化数据库，插入第一条数据，将dataBaselocalBlockNumber和dataBaselocalTransationIndex设为0
    initDatabaseData: (data) => {
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                //
                if (err) reject(err);
                var dbo = client.db(REQconfigDB.databaseName);
                var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                dbo.collection(REQconfigDB.tableName).insertOne(initData, (err, res) => {
                    //
                    if (err) reject(err);
                    console.log("Init database data success.");
                    client.close();
                    resolve();
                });
            });
        });
    },

    //更新数据库的dataBaselocalBlockNumber和dataBaselocalTransationInde
    updateDataBaselocalBlockNumber: (localBlockNumber, transationIndex) => {
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(REQconfigDB.databaseUrl, (err, db) => {
                //
                if (err) reject(err);
                //
                var dbo = db.db(REQconfigDB.databaseName);
                //
                var whereStr = {
                    dataBaselocalBlockNumber: {
                        $exists: true
                    }
                }
                var updateStr = {
                    $set: {
                        dataBaselocalBlockNumber: localBlockNumber,
                        dataBaselocalTransationIndex: transationIndex
                    }
                };
                dbo.collection(REQconfigDB.tableName).updateOne(whereStr, updateStr, (err, res) => {
                    //
                    if (err) reject(err);

                    //
                    console.log("Update dataBaselocalBlockNumber: " + localBlockNumber +
                        " dataBaselocalTransationIndex: " + transationIndex);
                    db.close();
                    resolve();
                });
            });
        });
    },

    // 获取数据库记录的已同步的区块号

    getLatestLocalBlockNum: () => {
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(REQconfigDB.databaseUrl, (err, db) => {
                if (err) reject(err);

                var dbo = db.db(REQconfigDB.databaseName);
                dbo.collection(REQconfigDB.tableName).find({
                    dataBaselocalBlockNumber: {
                        $exists: true
                    }
                }).toArray(async (err, result) => {
                    //
                    if (err) reject(err);
                    var localBlockNumber;
                    var localTransationIndex;

                    //
                    // 先判断数据库的blockNum字段和transationIndex字段是否有值，没有的话都设为0
                    if (result.length === 0) {
                        //不同步创世区块(block[0])
                        localBlockNumber = 0;
                        localTransationIndex = 0;
                    } else {
                        //if have
                        localBlockNumber = result[0].dataBaselocalBlockNumber;
                        localTransationIndex = result[0].dataBaselocalTransationIndex;
                    }
                    console.log('Latest localBlockNumber: ' + localBlockNumber +
                        ' & localTransationIndex ' + localTransationIndex);

                    //
                    db.close();
                    resolve(localBlockNumber);
                });
            });
        });
    },

    // 获取数据库记录的已同步的区块号的交易index
    getLatestLocalTransationIndex: () => {
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(REQconfigDB.databaseUrl, (err, db) => {
                //
                if (err) reject(err);
                //
                var dbo = db.db(REQconfigDB.databaseName);

                dbo.collection(REQconfigDB.databaseName).find({
                    //
                    dataBaselocalTransationIndex: {
                        //
                        $exists: true
                    }
                }).toArray(async (err, result) => {
                    //
                    if (err) reject(err);
                    //
                    var localBlockNumber;
                    var localTransationIndex;
                    //
                    if (result.length === 0) {
                        //
                        localBlockNumber = 0;
                        localTransationIndex = 0;

                    } else {
                        //if have
                        localBlockNumber = result[0].dataBaselocalBlockNumber;
                        localTransationIndex = result[0].dataBaselocalTransationIndex;
                        console.log('localTransationIndex ' + localTransationIndex);
                        //
                        db.close();
                        resolve(localTransationIndex);
                    }
                });
            });
        });
    },

    // 在数据库中查询指定账号的交易
    queryAccountTransationData: async (account) => {
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(REQconfigDB.databaseUrl, (err, db) => {
                //
                if (err) reject(err);
                var dbo = db.db(REQconfigDB.databaseName);
                var whereStr = {
                    $or: [{
                        form: account
                    }, {
                        to: account
                    }]
                };
                //
                dbo.collection(REQconfigDB.tableName).find(whereStr).toArray((err, result) => {
                    //
                    if (err) reject(err);
                    //
                    console.log('Transations by account ' + account + ':');
                    console.log(result);
                    //
                    db.close();
                    resolve(result);
                });
            });
        });
    },
    init: {
        initDatabaseData: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                    dbo.collection(REQconfigDB.tableName).insertOne(initData, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database data success.");
                        client.close();
                        resolve();
                    });
                });
            });

        },

        //
        initDatafMasterdata: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    dbo.collection(REQconfigDB.tableName.fMasterdata).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database fMasterdata data success.");
                        client.close();
                        resolve();
                    });
                });
            });

        },
        initDatafTrandata: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    dbo.collection(REQconfigDB.tableName.fTrandata).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database data success.");
                        console.log("============================================================Init database data success.");
                        client.close();
                        resolve("ok");
                    });
                });
            });

        },

        initDatafTrandetaileddata: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                    dbo.collection(REQconfigDB.tableName.fTrandetaileddata).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database fTrandetaileddata success.");
                        console.log("============================================================Init database fTrandetaileddata success.");
                        client.close();
                        resolve();
                    });
                });
            });

        },
        initDatafRank: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    dbo.collection(REQconfigDB.tableName.fRank).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database fRank success.");
                        console.log("============================================================Init database fRank success.");
                        client.close();
                        resolve("ok");
                    });
                });
            });

        }
    },
    insert: {
        //
        insertfMasterdata: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                    dbo.collection(REQconfigDB.tableName.fMasterdata).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database fMasterdata success.");
                        client.close();
                        resolve("insert is ok");
                    });
                });
            });

        },
        insertfTrandata: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                    dbo.collection(REQconfigDB.tableName.fTrandata).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database fTrandata success.");
                        client.close();
                        resolve("insert is ok");
                    });
                });
            });

        },
        insertfTrandetaileddata: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                    dbo.collection(REQconfigDB.tableName.fTrandetaileddata).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Init database fTrandetaileddata success.");
                        client.close();
                        resolve("insert is ok");
                    });
                });
            });
        },
        insertfRank: (data) => {
            return new Promise((resolve, reject) => {
                //
                MongoClient.connect(REQconfigDB.databaseUrl, {useNewUrlParser: true}, (err, client) => {
                    //
                    if (err) reject(err);
                    var dbo = client.db(REQconfigDB.databaseName);
                    var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                    dbo.collection(REQconfigDB.tableName.fRank).insertOne(data, (err, res) => {
                        //
                        if (err) reject(err);
                        console.log("Insert database fRank success.");
                        client.close();
                        resolve("insert is ok ");
                    });
                });
            });

        }
    }
}


//
//dao chu
module.exports = ActionMongoDB;