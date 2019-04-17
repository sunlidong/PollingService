const router = require('koa-router')();

/****
 * 子模块
 *
 * */
const Controller = require('../server/controllerServer');
const Common = require('../server/commonServer');

//
/* DRC代币
*/
//
router.get('/',async (ctx)=>{
    ctx.body='queryTokenServer'

});

/*区块查询
* */

/*      04. DRC代币 (单)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/getTokenTransactionDRCone', async (ctx) => {
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post getTokenTransactionDRCone");

    //TODO
    //jiaoyan
    //func select
    //数据格式
    let data = {
        url: web3_sk,
        acount: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",//地址
        start: "4892143",//kuai
        end: "4892329"//kuai
    };
    // 调用业务方法查询 单人单区块 的交易信息,
    let accoutData = await Controller.getTokenmyAccountdata(data.url, data.acount, data.start, data.end);
    //
    ctx.body = accoutData;
});

/*      04. DRC代币 (单人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20dan', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select

    let resData = {
        url: web3_sk,
        myAcount: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
        data: [
            {startBlockNumber: "4892325", endBlockNumber: "4892329"},
            {startBlockNumber: "4892325", endBlockNumber: "4892329"},
            {startBlockNumber: "4892325", endBlockNumber: "4892329"}

        ]
    };
    //
    let accoutdata = await Controller.getTokenmyAccountdatamany(resData.url, resData.myAcount, resData.data);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (多人多区块)
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20mar', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            url: web3_sk,
            acount: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
            start: "4892143",
            end: "4892329"
        },
        {
            url: web3_sk,
            acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            start: "4892325",
            end: "4892329"
        },
        {
            url: web3_sk,
            acount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            start: "4892325",
            end: "4892329"
        }
    ]

    //
    let accoutdata = await Controller.getTokenmyAccountdatamore(data);
    ctx.body = accoutdata;
});


/*时间查询
* */

/*      04. DRC代币 (单) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettimetoken20', async (ctx) => {
    //
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;

    //TODO
    //jiaoyan
    //func select
    let resposeData = {
        myAcount: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
        startTime: "2019/01/25 17:35:20",
        endTime: "2019/01/25 18:21:32"   //2019/01/25 17:35:20
    }
    //
    let accoutdata = await Controller.getTimeTokenmyAccountdata(resposeData);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (单人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20dan', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        }

    ]
    let resposeData = {
        myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
        list: [
            {
                myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
                startTime: "2019/03/22 10:37:50",
                endTime: "2019/03/22 10:37:50"
            },
            {
                myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
                startTime: "2019/03/22 10:37:50",
                endTime: "2019/03/22 10:37:50"
            },
            {
                myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
                startTime: "2019/03/22 10:37:50",
                endTime: "2019/03/22 10:37:50"
            }

        ]
    }
    //
    let accoutdata = await Controller.getTimeTokenmyAccountdatamany(resposeData);
    ctx.body = accoutdata;
});

/*      04. DRC代币 (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/gettoken20mar', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        }

    ]
    //
    let accoutdata = await Controller.getTimeTokenmyAccountdatamore(data);
    ctx.body = accoutdata;
});

/*并发测试
* */


/*      04. DRC代币 (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/TestgetQueryConcurrency', async (ctx) => {

    console.log(ctx.request.body);
    // ctx.body=ctx.request.body;  //获取表单提交的数据
    let res = ctx.request.body;
    console.log("post parmas  is ok ");

    //TODO
    //jiaoyan
    //func select
    let data = [
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        },
        {
            myAcount: "0x32cda8ca0a0ffa4cb7f40ccc33e007950d96a34f",
            startTime: "2019/03/22 10:37:50",
            endTime: "2019/03/22 10:37:50"
        }

    ]
    //
    let accoutdata = await Controller.testgetTimeTokenmyAccountdatamore(data);
    ctx.body = accoutdata;
});


/*      04. yitaibi (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   多个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
router.post('/TestgetQueryyitai', async (ctx) => {
    //
    //参数接收
    let res = ctx.request.body;

    //拼接请求对象
    // 2019/03/22 10:37:50
    // 2019/03/22 10:38:15
    //请求格
    let requestData = [
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startTime: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endTime: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startTime: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endTime: "2019/03/22 10:38:15",
            type: 3
        },
        {
            myAcount: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
            startTime: "2019/03/22 10:37:50", //2019/3/22 1:0:2
            endTime: "2019/03/22 10:38:15",
            type: 3
        }
    ]
    //调用层函数处理
    console.time('showColumnInfo');
    let resultData = await Controller.testytaigetTimeTokenmyAccountdatamore(requestData);
    console.timeEnd('showColumnInfo');
    //
    console.log("前台的数据是", resultData);
    ctx.body = resultData;
});

//

module.exports = router.routes();