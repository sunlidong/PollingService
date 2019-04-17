const router = require('koa-router')();


/****
 * 子模块
 *
 * */
const Controller = require('../server/controllerServer');
const Common = require('../server/commonServer');

//
router.get('/',async (ctx)=>{
    ctx.body='queryEtherServer'

});
/*      01. 以太币(单)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
router.post('/test1', async (ctx) => {
    //parmas
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;

    console.log("res=>", res);
    let a = {name: "zhangsan"};
    ctx.body = a;
});

/*      01. 以太币(单) (测试)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
router.post('/getethone', async (ctx) => {
    //parmas
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    //
    let state = Common.verification(res);
    if (state != "OK") {
        //
        return state;
    }
    console.log("state:", state)
    //
    let accoutdata = await Controller.getmyAccountdata1(
        web3_sk,//url
        res.Faddress,
        res.FstartBlockNumer,
        res.FendBlockNumber,
        res.type
    );
    ctx.body = accoutdata;
});

/*      01. 以太币(单) (测试)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
router.post('/gettoken', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok22222222 ", res);

    //TODO
    //jiaoyan
    //func select

    let data = {
        url: web3_sk,
        acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        start: "4892325",
        end: "4892329"

    };
    //
    let accoutdata = await Controller.getmyAccountdata(data.url, data.acount, data.start, data.end);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (单)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken201', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select

    let data = {
        url: web3_sk,
        acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        start: "4892325",
        end: "4892329"

    };
    //
    let accoutdata = await Controller.getTokenmyAccountdata(data.url, data.acount, data.start, data.end);
    ctx.body = accoutdata;
});


/* 区块查询 批量
*/

/*      04. 以太币 (批量)
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 多个账户
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getBatchEthernet', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象

    let requestData = [
        {
            web3Url: web3_sk,
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "5251538",
            endBlockNumber: "5251542",
            type: 1
        },
        {
            web3Url: web3_sk,
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "5251538",
            endBlockNumber: "5251542",
            type: 2
        },
        {
            web3Url: web3_sk,
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "5251538",
            endBlockNumber: "5251542",
            type: 3
        }
    ]


    //调用层函数处理

    let resultData = await Controller.queryBatchProcessingTaifangAddress(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});

/*      05. 以太币 (批量)一个地址 多个区块区间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 多个账户
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getBatchEthernetscope', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象

    let requestData = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        blockInterval: [
            {startBlockNumber: 5251538, endBlockNumber: 5251542, type: 1},
            {startBlockNumber: 5251538, endBlockNumber: 5251542, type: 2},
            {startBlockNumber: 5251538, endBlockNumber: 5251542, type: 3}
        ]
    }


    //调用层函数处理

    let resultData = await Controller.queryNumberIntervalInformationAddress(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});


/* 时间查询
*/

/*      21. 以太币 (单个)一个地址 时间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始时间 结束时间
    04. 查询参数:   (4)(web3实例@地址@时间查询)
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getInformation', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15
    let requestData = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
        endBlockNumber: "2019/03/22 10:38:15",
        type: 3
    }
    //时间处理  转换成时间戳
    let startTime = new Date(requestData.startBlockNumber).getTime();
    let endTime = new Date(requestData.endBlockNumber).getTime();
    //
    console.log("startTime =>", startTime);
    console.log("endTime =>", endTime);
    let requestData1 = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        startBlockNumber: startTime,
        endBlockNumber: endTime,
        type: 2

    }


    //调用层函数处理

    let resultData = await Controller.getsDataForspecifiedTimeAtAddressData(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});

/*      22. 以太币 (单个)多个地址 时间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始时间 结束时间
    04. 查询参数:   (4)(web3实例@地址@时间查询)
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getInformations', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15

    //请求格
    let requestData = {
        web3Url: web3_sk,
        myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
        blockList: [
            {starTime: "2019/03/22 10:37:50", endTime: "2019/03/22 10:38:15", type: 3},
            {starTime: "2019/03/22 10:37:50", endTime: "2019/03/22 10:38:15", type: 3}

        ],
        type: 3
    }
    // //时间处理  转换成时间戳
    // // let startTime = new Date(requestData.startBlockNumber).getTime();
    // // let endTime = new Date(requestData.endBlockNumber).getTime();
    // // //
    // // console.log("startTime =>", startTime);
    // // console.log("endTime =>", endTime);
    // let requestData1 = {
    //     web3Url: web3_sk,
    //     myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
    //     startBlockNumber: startTime,
    //     endBlockNumber: endTime,
    //     type: 2
    //
    // }


    //调用层函数处理

    let resultData = await Controller.getsDataForspecifiedTimeAtAddressDatas(requestData);

    //返回 前台结果集
    ctx.body = resultData;
});

/*      23. 以太币 (多个)多个地址 时间查询
    01. 币种类型:   代币
    02. 查询方式:   批量
    03. 查询类型:   开始时间 结束时间
    04. 查询参数:   (4)(web3实例@地址@时间查询)
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getInformationsmore', async (ctx) => {
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15

    //请求格
    let requestData = [
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endBlockNumber: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endBlockNumber: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startBlockNumber: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endBlockNumber: "2019/03/22 10:38:15",
            type: 3
        }
    ]
    //调用层函数处理

    let resultData = await Controller.getsDataForspecifiedTimeAtAddressDatasmore(requestData);

//返回 前台结果集
    ctx.body = resultData;
});


//dao chu
module.exports = router.routes();