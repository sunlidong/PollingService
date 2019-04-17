const router = require('koa-router')();

/****
 * 子模块
 *
 * */
const Controller = require('../server/controllerServer');
const Common = require('../server/commonServer');
const Http_service = require('../server/httpServer');

//
//
router.get('/',async (ctx)=>{
    ctx.body='fabricServer'

});
/*Fabric xiangguan
* */

router.post('/setFabricdata', async (ctx) => {
    //
    //参数接收
    let data = ctx.request.body;
    let arr = [];
    //TODO
    let data1 = {
        //http://127.0.0.1:8080/
        url: "http://localhost:10081/chain/uploadData",
        param: {
            "datatype": "1",
            "data": {
                "gradeid": "code00020",
                "gradeTxhash": "code00001",
                "grademyAcount": "code00001",
                "gradeform": "code00001",
                "gradeto": "code00001",
                "gradenonce": "code00001",
                "gradeblockhash": "code00001",
                "gradeblocknumber": "code00001",
                "gradevalue": "code00001",
                "gradeprice": "code00001",
                "gradegas": "code00001",
                "gradeinput": "code00001",
                "gradeipfs": "code00001"
            },
            "datatime": "2019-09-23"
        }
    }
    // //send
    let res = await Http_service.postFormJson(data1.url, data1.param);

    ctx.body = res;
});


//
module.exports = router.routes();