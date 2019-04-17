const router = require('koa-router')();

/****
 * 子模块
 *
 * */
const Controller = require('../server/controllerServer');
const Common = require('../server/commonServer');


//
router.get('/',async (ctx)=>{
    ctx.body='/home/sunlidong/project_web/PollingService/etherscanService/routes/listenBlocksTransactions.js'

});
//three
/*      three data . DRC代币 (单) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getThreeData', async (ctx) => {
    //
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    //TODO
    //jiaoyan
    //func select
    /*
    * 	@@@
        1. 参数请求，拼接请求体
        2. 调用业务函数处理 异步
        3. 单个根据时间开始结束获取区块开始区块结束
        4. 根据区块开始结束去查找区块
        5. 校验数据，拼接数据，
        6. 返回
        @@@@
    * */
    let resposeData = {
        myAcount: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
        startTime: "2019/01/25 17:35:20",
        endTime: "2019/01/25 18:21:32",
        type: 3//2019/01/25 17:35:20
    }
    //
    let accoutdata = await Controller.getTimeTokenthreeAccountdata(resposeData);
    ctx.body = accoutdata;
});

//Poller
router.post('/Pollerdata', async (ctx) => {
    //
    let res = ctx.request.body;
    // console.log("1111123232323232");
    // ctx.body = "1212";
    //qingqiu
    let resposeData = {
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        startTime: "2019/01/25 17:35:20",
        endTime: "2019/01/25 18:21:32",
        type: 3//2019/01/25 17:35:20
    }
    let result = await Controller.PollerData(resposeData);
    //
    console.log("resutl:",result);
    // if (result.state==2){
    //     ctx.body=result
    // }
    ctx.body=result;
});


//chaxun
router.post('/Pollerdatatest', async (ctx) => {
    //
    let res = ctx.request.body;
    console.log("1111123232323232");
    // ctx.body = "1212";
    //qingqiu
    let resposeData = {
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        startTime: "2019/01/25 17:35:20",
        endTime: "2019/01/25 18:21:32",
        type: 3//2019/01/25 17:35:20
    }
    let result = await Controller.PollerDatatest(resposeData);
    //
    ctx.body =result;
});
module.exports = router.routes();