const router = require('koa-router')();


//
var mongodbServer = require('../server/mongodbServer');



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
router.get('/',async(ctx,next)=>{
    //
    if (!ctx.request.query.account){
        //
        ctx.body = await Promise.resolve({
            code:20002,
            data:{},
            message:'address'
        });
    }
    //
    var transations = await  mongodbServer.queryAccountTransationData(ctx.request.query.account);
    ctx.body = await  Promise.resolve({
        code:1000,
        transations:transations,
        message:'ok',
    });
});

//
router.get('/newblock',async(ctx,next)=>{
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
    var transations = await  mongodbServer.getPrevBlockNum();
    // ctx.body = await  Promise.resolve({
    //     code:1000,
    //     transations:transations,
    //     message:'ok',
    // });
    ctx.body = transations;
});

//
router.get('/transation/syncTransations',async (ctx,next)=>{
    //
    //todo
// 01. 防止重复请求重复同步
// 02. 如果数据库中不存在本地区块号，先初始化数据库区块号数据
    console.log('=====> Checking database data has init?');
    var localBlockNumber = await  mongodbServer.getLatestLocalBlockNum();
    if (localBlockNumber == 0){
        //
        console.log('The local blockNum in the database does not exist.');
        await mongodbServer.initDatabaseData();
    }else{
        //
        console.log('The database data has already init before.');
    }
    console.log('============================================================');

    //判断上一次本地最新区块下的交易是否同步完成，若未完成，先同步完该区块交易
    console.log('============================================================');
    console.log('=====> Checking last local block transations has complete sync?');
    var transactionCount = await  mongodbServer.getBlockTransactionCounts(localBlockNumber);
    console.log('localBlockNumber[' + localBlockNumber + ']' + ' transactionCount on mainNet is ' + transactionCount);

    if (transactionCount == 0){
        console.log('Block ' + localBlockNumber + ' has no transation data.');
    }else{
        //
        // 如果有，判断是否需要继续同步
        if ((transactionCount-1)>await mongodbServer.getLatestLocalTransationIndex()){
            //
            console.log('Not all of transations, Continue sync block transations... ...');

            tools.isSync = true;

            //

            //从最后一条交易记录的下一条开始获取并插入
            for (var i=(await mongodbServer.getLatestLocalTransationIndex()+1);i<transactionCount;i++){
                //
                await web3.eth.getTransactionFromBlock(localBlockNumber,i)
                    .then(async response=>{
                        //
                        // 插入交易数据
                        await  mongodbServer.insertTransationData(response,localBlockNumber,i);
                        // 更新数据库的dataBaselocalBlockNumber和dataBaselocalTransationIndex
                        await mongodbServer.updateDataBaselocalBlockNumber(localBlockNumber,i);

                        //
                        console.log(moment().format('LLLL'));
                    });
            }
            //
            console.log('Complete sync block ' +
                localBlockNumber + ' of ' + transactionCount + ' transations.');
            tools.isSync = false;
        }else{
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
    while (await mongodbServer.getPrevBlockNum()>await mongodbServer.getLatestLocalBlockNum()){
        //
        console.log('Not the latested, Prepare Sync......');

        //
        tools.isSync = true;

        //获取数据库最新一条交易记录的区块号的下一个区块号
        blockTransactionCount = await mongodbServer.getBlockTransactionCounts(nextLocalBlockNumber);
        //
        //
        // 判断区块内是否包含交易，如果为0，只需要更新下数据库的区块号
        if (blockTransactionCount ==0){
            //
            console.log('Block ' + nextLocalBlockNumber + ' has no transation data.');

            await  mongodbServer.updateDataBaselocalBlockNumber(nextLocalBlockNumber,0);

        }else{
            //
            console.log('Block ' + nextLocalBlockNumber + ' isSyncing......');

            // 获取该区块下的交易数据

            for (var i = 0;i<blockTransactionCount;i++){
                //
                await  web3.eth.getTransactionFromBlock(nextLocalBlockNumber,i)
                    .then(async response=>{
                        //
                        // 插入交易数据
                        await mongodbServer.insertTransationData(response,nextLocalBlockNumber,i);
                        // 更新数据库的dataBaselocalBlockNumber和dataBaselocalTransationIndex
                        await mongodbServer.updateDataBaselocalBlockNumber(nextLocalBlockNumber,i);

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



//
module.exports = router.routes();