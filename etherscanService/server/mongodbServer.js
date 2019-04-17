
var web3Server = require('../server/web3Server');
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
            MongoClient.connect(config.databaseUrl, (err, db) => {
                if (err) reject(err);
                //
                var dbo = db.db(config.databaseName);

                // insert
                dbo.collection(config.tableName).insertOne(response, (err, res) => {
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
    initDatabaseData: () => {
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(config.databaseUrl, (err, db) => {
                //
                if (err) reject(err);
                var dbo = db.db(config.databaseName);
                var initData = {dataBaselocalBlockNumber: 0, dataBaselocalTransationIndex: 0};
                dbo.collection(config.tableName).insertOne(initData, (err, res) => {
                    //
                    if (err) reject(err);
                    console.log("Init database data success.");
                    db.close();
                    resolve();
                });
            });
        });
    },

    //更新数据库的dataBaselocalBlockNumber和dataBaselocalTransationInde
    updateDataBaselocalBlockNumber:(localBlockNumber,transationIndex)=>{
        //
        return new Promise((resolve, reject) =>{
            //
            MongoClient.connect(config.databaseUrl,(err,db)=>{
                //
                if(err) reject(err);
                //
                var dbo = db.db(config.databaseName);
                //
                var whereStr = {
                    dataBaselocalBlockNumber: {
                        $exists:true
                    }
                }
                var updateStr = {
                    $set: {
                        dataBaselocalBlockNumber: localBlockNumber,
                        dataBaselocalTransationIndex: transationIndex
                    }
                };
                dbo.collection(config.tableName).updateOne(whereStr,updateStr,(err,res)=>{
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

    getLatestLocalBlockNum:()=>{
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(config.databaseUrl,(err,db)=>{
                if (err)reject(err);

                var dbo = db.db(config.databaseName);
                dbo.collection(config.tableName).find({
                    dataBaselocalBlockNumber:{
                        $exists: true
                    }
                }).toArray(async (err,result)=>{
                    //
                    if (err) reject(err);
                    var localBlockNumber;
                    var localTransationIndex;

                    //
                    // 先判断数据库的blockNum字段和transationIndex字段是否有值，没有的话都设为0
                    if (result.length ===0){
                        //不同步创世区块(block[0])
                        localBlockNumber = 0;
                        localTransationIndex = 0;
                    }else{
                        //if have
                        localBlockNumber = result[0].dataBaselocalBlockNumber;
                        localTransationIndex =  result[0].dataBaselocalTransationIndex;
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
    getLatestLocalTransationIndex:()=>{
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(config.databaseUrl,(err,db)=>{
                //
                if (err) reject(err);
                //
                var dbo = db.db(config.databaseName);

                dbo.collection(config.databaseName).find({
                    //
                    dataBaselocalTransationIndex:{
                        //
                        $exists:true
                    }
                }).toArray(async (err,result)=>{
                    //
                    if (err) reject(err);
                    //
                    var localBlockNumber;
                    var localTransationIndex;
                    //
                    if (result.length ===0){
                        //
                        localBlockNumber =0;
                        localTransationIndex = 0;

                    } else{
                        //if have
                        localBlockNumber = result[0].dataBaselocalBlockNumber;
                        localTransationIndex =  result[0].dataBaselocalTransationIndex;
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
    queryAccountTransationData:async (account)=>{
        //
        return new Promise((resolve, reject) => {
            //
            MongoClient.connect(config.databaseUrl,(err,db)=>{
                //
                if (err) reject(err);
                var dbo = db.db(config.databaseName);
                var whereStr = {
                    $or:[{
                        form:account
                    },{
                        to:account
                    }]
                };
                //
                dbo.collection(config.tableName).find(whereStr).toArray((err,result)=>{
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
    }
}



//
//dao chu
module.exports = ActionMongoDB;