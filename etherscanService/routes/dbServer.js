const router = require('koa-router')();
const uuidv4 = require('uuid/v4');

//
var mongodbServer = require('../server/mongodbServer');
var func = require('../config/configFunctionList');
var funcMethodList = require('../server/server');
var model = require('../config/configDBdata');


//
router.get('/', async (ctx) => {
    //
    console.log("1");
});
router.post('/add', async (ctx) => {
    console.log("333");
    //
    testdata.insert({name: "zhangsan", age: "33"});
    //s
    console.log("insert is ok ");

});

//
router.get('/', async (ctx, next) => {
    //
    if (!ctx.request.query.account) {
        //
        ctx.body = await Promise.resolve({
            code: 20002,
            data: {},
            message: 'address'
        });
    }
    //
    var transations = await mongodbServer.queryAccountTransationData(ctx.request.query.account);
    ctx.body = await Promise.resolve({
        code: 1000,
        transations: transations,
        message: 'ok',
    });
});

//
router.get('/newblock', async (ctx, next) => {
    //
    // if (!ctx.request.query.account){
    //     //
    //     // ctx.body = await Promise.resolve({
    //     //     code:20002,
    //     //     data:{},
    //     //     message:'address'
    //     // });
    // }
    //
    var transations = await mongodbServer.getPrevBlockNum();
    // ctx.body = await  Promise.resolve({
    //     code:1000,
    //     transations:transations,
    //     message:'ok',
    // });
    ctx.body = transations;
});

//
router.get('/transation/syncTransations', async (ctx, next) => {
    //
    //todo
// 01. 防止重复请求重复同步
// 02. 如果数据库中不存在本地区块号，先初始化数据库区块号数据
    console.log('=====> Checking database data has init?');
    var localBlockNumber = await mongodbServer.getLatestLocalBlockNum();
    if (localBlockNumber == 0) {
        //
        console.log('The local blockNum in the database does not exist.');
        await mongodbServer.initDatabaseData();
    } else {
        //
        console.log('The database data has already init before.');
    }
    console.log('============================================================');

    //判断上一次本地最新区块下的交易是否同步完成，若未完成，先同步完该区块交易
    console.log('============================================================');
    console.log('=====> Checking last local block transations has complete sync?');
    var transactionCount = await mongodbServer.getBlockTransactionCounts(localBlockNumber);
    console.log('localBlockNumber[' + localBlockNumber + ']' + ' transactionCount on mainNet is ' + transactionCount);

    if (transactionCount == 0) {
        console.log('Block ' + localBlockNumber + ' has no transation data.');
    } else {
        //
        // 如果有，判断是否需要继续同步
        if ((transactionCount - 1) > await mongodbServer.getLatestLocalTransationIndex()) {
            //
            console.log('Not all of transations, Continue sync block transations... ...');

            tools.isSync = true;

            //

            //从最后一条交易记录的下一条开始获取并插入
            for (var i = (await mongodbServer.getLatestLocalTransationIndex() + 1); i < transactionCount; i++) {
                //
                await web3.eth.getTransactionFromBlock(localBlockNumber, i)
                    .then(async response => {
                        //
                        // 插入交易数据
                        await mongodbServer.insertTransationData(response, localBlockNumber, i);
                        // 更新数据库的dataBaselocalBlockNumber和dataBaselocalTransationIndex
                        await mongodbServer.updateDataBaselocalBlockNumber(localBlockNumber, i);

                        //
                        console.log(moment().format('LLLL'));
                    });
            }
            //
            console.log('Complete sync block ' +
                localBlockNumber + ' of ' + transactionCount + ' transations.');
            tools.isSync = false;
        } else {
            //
            console.log('No need sync.Local block has full of ' + transactionCount + ' transations.');
        }
    }
    //  先查看该区块中是否有交易
    console.log('============================================================');


    //比较主网和本地的区块号并决定是否进行同步
    console.log('============================================================');
    console.log('=====> Checking local block is the latested?');

    //
    var nextLocalBlockNumber;
    var blockTransactionCount;

    //
    while (await mongodbServer.getPrevBlockNum() > await mongodbServer.getLatestLocalBlockNum()) {
        //
        console.log('Not the latested, Prepare Sync......');

        //
        tools.isSync = true;

        //获取数据库最新一条交易记录的区块号的下一个区块号
        blockTransactionCount = await mongodbServer.getBlockTransactionCounts(nextLocalBlockNumber);
        //
        //
        // 判断区块内是否包含交易，如果为0，只需要更新下数据库的区块号
        if (blockTransactionCount == 0) {
            //
            console.log('Block ' + nextLocalBlockNumber + ' has no transation data.');

            await mongodbServer.updateDataBaselocalBlockNumber(nextLocalBlockNumber, 0);

        } else {
            //
            console.log('Block ' + nextLocalBlockNumber + ' isSyncing......');

            // 获取该区块下的交易数据

            for (var i = 0; i < blockTransactionCount; i++) {
                //
                await web3.eth.getTransactionFromBlock(nextLocalBlockNumber, i)
                    .then(async response => {
                        //
                        // 插入交易数据
                        await mongodbServer.insertTransationData(response, nextLocalBlockNumber, i);
                        // 更新数据库的dataBaselocalBlockNumber和dataBaselocalTransationIndex
                        await mongodbServer.updateDataBaselocalBlockNumber(nextLocalBlockNumber, i);

                        console.log(moment().form('LLLL'));
                    });
            }
        }
    }
    //
    tools.isSync == false;

    //
    console.log('The current local block is the latest.');
    console.log('Finish Sync.');
    console.log('============================================================');

});

// 初始化数据库
router.get('/init', async (ctx, next) => {

    let a = "1";
    let uuid = uuidv4();
    let data = model.fMasterdata;
    console.log("data=>", data, uuid);
    //data
    data.fUUID = uuid;
    data.fNo = 1;
    data.fToken = 'drcToken';
    data.fType = 3;
    data.fIsListening = true;

    //
    let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Rank, func.dbServer.func.initDatafMasterdata, data);
    // let result = await  funcMethodList(func.dbServer.fNo, func.dbServer.func.initData, a);

    // let result = mongodbServer.initDatabaseData();
    // result
    //     .then(res => {
    //         console.log("res=>", res);
    //     })
    //     .catch(err => {
    //         console.warn("err=>", err);
    //
    //     })

    ctx.body = result;
});

//初始化 代币信息主表
router.get('/initfMasterdata', async (ctx, next) => {

    let a = "1";
    let uuid = uuidv4();
    let data = model.fMasterdata;
    console.log("data=>", data, uuid);
    //data
    data.fUUID = uuid;
    data.fNo = 1;
    data.fToken = 'drcToken';
    data.fType = 3;
    data.fIsListening = true;

    //
    let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Rank, func.dbServer.func.initDatafMasterdata, data);
    // let result = await  funcMethodList(func.dbServer.fNo, func.dbServer.func.initData, a);

    // let result = mongodbServer.initDatabaseData();
    // result
    //     .then(res => {
    //         console.log("res=>", res);
    //     })
    //     .catch(err => {
    //         console.warn("err=>", err);
    //
    //     })

    ctx.body = result;
});

//初始化 代币交易信息列表
router.get('/initfTrandata', async (ctx, next) => {
    //
    console.log("============================================================>initfTrandata");

    //获取参数
    let uuid = uuidv4();
    let requestData = model.fTrandata;
    console.log("============================================================data");

    //拼接对象
    requestData.fNo = 2;
    requestData.fUUID = uuid;
    requestData.fTpye = 1;
    requestData.fMasterID = uuid;
    requestData.fSelect = true;
    requestData.fTime = '2019-04-18 13:34:23';
    requestData.fFrom = '0x38a8DC14edE1DEf9C437bB3647445eEec06fF105';
    requestData.fTo = '0xA9af645Ce31AF413b24a3b913f1a5Bf57A7a1C50';
    requestData.fVlaue = '80000000';
    requestData.fSize = '8';
    requestData.fBlocknum = '49894323';
    requestData.fBlockHash = '0xe11082ff379692fbad18a5f03430de7d611481685ba727920c8421a28f2a93a7';
    requestData.fTransactionHash = '0x9f2460428f0ba4fe12dedc1f6c9557da0b3c6538a6e116e192b8922f9183a578';

    console.log("============================================================");

    //请求业务函数
    let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Rank, func.dbServer.func.initDatafTrandata, requestData);

    //返回调用
    ctx.body = result;
});

//初始化 代币交易信息详细表
router.get('/initfTrandetaileddata', async (ctx, next) => {
    console.log("============================================================>initfTrandetaileddata");

    //获取参数
    let uuid = uuidv4();
    let data = model.fTrandetaileddata;


    /*
    *                     fTrandetaileddata: {
                        fNo: 0,
                        Block: {blockNumber: 0, blockHash: 0, blockIndex: 0, TransactionHash: 0},
                        Row: {form: "", to: "", value: "", time: '', fabrichash: ''},
                        Remark: {fText: " rmake"},
                        Token: {fTokenName: '', fTokenUUID: '', fType: ''},
                        Fcount: {fBlockNumber: '', fTime: '', fNo: ''},
                        Fabric: {fHash: '', fID: ''},
                        Drcc: {vip: 0, type: ''},
                        fUNMB: {fNo: 0, fUUID: '', fTpye: 1, fMasterID: '', fBz: '', fSelect: true}
                    },
    * */
    //data
    //拼接对象
    data.fNo = 4593;
    data.Block = {
        blockNumber: 4000000,
        blockHash: "0xe11082ff379692fbad18a5f03430de7d611481685ba727920c8421a28f2a93a7",
        blockIndex: 14,
        TransactionHash: "0x9f2460428f0ba4fe12dedc1f6c9557da0b3c6538a6e116e192b8922f9183a578"
    };
    data.Row = {
        form: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        to: "0xA9af645Ce31AF413b24a3b913f1a5Bf57A7a1C50",
        value: "30000000",
        time: '2019-04-18 13:23:34',
        fabrichash: 'sdf34jo3o4ij38fj23o4j2983j42'
    };
    data.Remark = {fText: "我今天转给了张山18个以太币"};
    data.Token = {fTokenName: 'drcc', fTokenUUID: uuid, fType: '2'};
    data.Fcount = {fBlockNumber: '3498902034', fTime: '2019-01-21 18:23:19', fNo: '233'};
    data.Fabric = {fHash: 'sdf34jo3o4ij38fj23o4j2983j42', fID: 'sdf34jo3o4ij38fj23o4j2983j42'};
    data.Drcc = {vip: 1, type: '2'};
    data.fUNMB = {fNo: 23243, fUUID: uuid, fTpye: 1, fMasterID: uuid, fBz: 'one good ', fSelect: true};

    //请求业务函数
    let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Rank, func.dbServer.func.initDatafTrandetaileddata, data);

    //返回调用
    ctx.body = result;
});

//初始化 代币持有量排名表
router.get('/initfRank', async (ctx, next) => {
    console.log("============================================================>initfRank");
    //
    let uuid = uuidv4();
    let data = model.fRank;

    //data
    data.fNo = 30012;
    data.fName = '张山';
    data.fAddress = 'drcToken';
    data.fHaveSum = 238923;
    data.fTransactionSum = 3434;
    data.fBz = '今天作下测试，排名测试';
    data.fToken = 'drccS';
    data.fUUID = uuid;

    //
    let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Rank, func.dbServer.func.initDatafRank, data);
    //


    ctx.body = result;
});


/*写入数据
*   1.路由对4类数据集写入MONGODB 中 4个参数
* */
router.get('/insertdata', async (ctx, next) => {
    console.log("============================================================>initfRank");
    //
    var a = 'ok';
    for (var i = 1; i < 1000; i++) {
        var uuid = uuidv4();
        var data = model.fRank;

        //data
        data._id = uuid;
        data.fNo = 600000 + i;
        data.fName = '张山';
        data.fAddress = 'drcToken';
        data.fHaveSum = 20000+i;
        data.fTransactionSum = 3000;
        data.fBz = '今天作下测试，排名测试';
        data.fToken = 'drccS'+i;
        data.fUUID = uuid;
        let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Rank, func.dbServer.func.insertData, data);
        // let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Master, func.dbServer.func.insertData, data);
        // let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.fTran, func.dbServer.func.insertData, data);
        // let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.fTrandetailed, func.dbServer.func.insertData, data);
        // let result = await funcMethodList(func.dbServer.fNo, func.dbServer.funcType.Rank, func.dbServer.func.insertData, data);
        console.log("==>", i);
    }

    ctx.body = a;
});

//
module.exports = router.routes();