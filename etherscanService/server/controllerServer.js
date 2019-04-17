var web3Server = require('../server/web3Server');


//
/*       业务处理
    01. 业务处理:   业务
*/
var Controller = {

    //YTB
    /* 单例处理部分
*
* */

    /*      01. 以太币(单)
        01. 币种类型:   以太币
        02. 查询方式:   单个
        03. 查询类型:   开始区块 结束区块
        04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
        05. 返回参数:   rows数据
        06. 是否批量:   否
    */
    getmyAccountdata: async (web3, myaccount, startBlockNumber, endBlockNumber) => {
        let resData = {
            myaddress: "",
            num: 0,
            list: []
        }
        if (endBlockNumber == null) {
            endBlockNumber = await web3.eth.blockNumber;
            console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
            startBlockNumber = endBlockNumber - 1000;
            console.log("Using startBlockNumber: " + startBlockNumber);
        }
        console.log("Searching for transactions to/from account \""
            + myaccount + "\" within blocks "
            + startBlockNumber
            + " and "
            + endBlockNumber);
        resData.myaddress = myaccount;
        //
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 == 0) {
                console.log("Searching block " + i);
            }
            //
            var block = await web3.eth.getBlock(i, true);
            // console.log("1", Common.timeConverter(block.timestamp));
            // console.log("1", block.timestamp);
            // console.log("1", i);
            if (block != null && block.transactions != null) {
                block.transactions.forEach(function (e) {
                    //
                    if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                        //
                        let rowdata1 = {
                            "txhash": e.hash,
                            "nonce": e.nonce,
                            "blockHash": e.blockHash,
                            "blockNumber": e.blockNumber,
                            "transactionIndex": e.transactionIndex,
                            "from": e.from,
                            "to": e.to,
                            "value": e.value,
                            "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                            "gasPrice": e.gasPrice,
                            "gas": e.gas,
                            "input": e.input
                        }
                        //add list
                        console.log("time shjijianchuo :::====", block.timestamp);
                        let row = {"from": e.from, "to": e.to, "row": rowdata1}
                        resData.list.push(row)
                        resData.num += 1;
                    }
                });
            }
        }
        console.log("cort  is ok ")
        return resData;
    },

    /*      02. 以太币(单) (测试)
        01. 币种类型:   以太币
        02. 查询方式:   单个
        03. 查询类型:   开始区块 结束区块
        04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
        05. 返回参数:   rows数据
        06. 是否批量:   否
    */
    getmyAccountdata1: async (web3, myaccount, startBlockNumber, endBlockNumber, type) => {
        let resData = {
            myaddress: "",
            num: 0,
            list: []
        }
        if (endBlockNumber == null) {
            endBlockNumber = await web3.eth.blockNumber;
            console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
            startBlockNumber = endBlockNumber - 1000;
            console.log("Using startBlockNumber: " + startBlockNumber);
        }
        console.log("Searching for transactions to/from account \""
            + myaccount + "\" within blocks "
            + startBlockNumber
            + " and "
            + endBlockNumber);
        resData.myaddress = myaccount;
        //
        if (type == 1) {
            //
            console.log("type=>1")
            //
            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
                //
                var block = await web3.eth.getBlock(i, true);
                if (block != null && block.transactions != null) {
                    block.transactions.forEach(function (e) {
                        //
                        if (myaccount == "*" || myaccount == e.from) {
                            //
                            let rowdata1 = {
                                "txhash": e.hash,
                                "nonce": e.nonce,
                                "blockHash": e.blockHash,
                                "blockNumber": e.blockNumber,
                                "transactionIndex": e.transactionIndex,
                                "from": e.from,
                                "to": e.to,
                                "value": e.value,
                                "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                                "gasPrice": e.gasPrice,
                                "gas": e.gas,
                                "input": e.input


                            }
                            //add list
                            let row = {"from": e.from, "to": e.to, "row": rowdata1}
                            resData.list.push(row)
                            resData.num += 1;
                        }
                    });
                }
            }
        } else if (type == 2) {
            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
                //
                var block = await web3.eth.getBlock(i, true);
                if (block != null && block.transactions != null) {
                    block.transactions.forEach(function (e) {
                        //
                        if (myaccount == "*" || myaccount == e.to) {
                            //
                            let rowdata1 = {
                                "txhash": e.hash,
                                "nonce": e.nonce,
                                "blockHash": e.blockHash,
                                "blockNumber": e.blockNumber,
                                "transactionIndex": e.transactionIndex,
                                "from": e.from,
                                "to": e.to,
                                "value": e.value,
                                "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                                "gasPrice": e.gasPrice,
                                "gas": e.gas,
                                "input": e.input
                            }
                            //add list
                            let row = {"from": e.from, "to": e.to, "row": rowdata1}
                            resData.list.push(row)
                            resData.num += 1;
                        }
                    });
                }
            }

        } else if (type == 3) {
            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
                //
                var block = await web3.eth.getBlock(i, true);
                if (block != null && block.transactions != null) {
                    block.transactions.forEach(function (e) {
                        //
                        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                            //
                            let rowdata1 = {
                                "txhash": e.hash,
                                "nonce": e.nonce,
                                "blockHash": e.blockHash,
                                "blockNumber": e.blockNumber,
                                "transactionIndex": e.transactionIndex,
                                "from": e.from,
                                "to": e.to,
                                "value": e.value,
                                "time": Common.timeConverter(block.timestamp) + " " + new Date(block.timestamp * 1000).toGMTString(),
                                "gasPrice": e.gasPrice,
                                "gas": e.gas,
                                "input": e.input
                            }
                            //add list
                            let row = {"from": e.from, "to": e.to, "row": rowdata1}
                            resData.list.push(row)
                            resData.num += 1;
                        }
                    });
                }
            }

        }
        console.log("cort  is ok ")
        return resData;
    },


    /* 批量处理部分
*
* */

    /*      21. 以太币(多)
    01. 币种类型:   以太币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
    05. 返回参数:   rows数据
    06. 是否批量:   否
*/
    queryBatchProcessingTaifangAddress: async (data) => {
        //声明返回对象
        let resultData =
            {
                myAcount: [],
                num: 0,
                list: []
            }
        console.log("data length is ====", data.length);
        //迭代器处理
        if (data.length != 0) {
            //非空后,循环处理数据
            for (var i = 0; i < data.length; i++) {
                console.log("循环次数是：", i);
                //判断 结束区块是否为空
                if (data[i].endBlockNumber == null) {
                    data[i].endBlockNumber = await data[i].web3Url.eth.blockNumber;
                    console.log("Using endBlockNumber: " + endBlockNumber);
                }
                //判断开始区块是否为空
                if (data[i].startBlockNumber == null) {
                    data[i].startBlockNumber = data[i].endBlockNumber - 1000;
                    console.log("Using startBlockNumber: " + data[i].startBlockNumber);
                }
                //开始查询
                console.log("Searching for transactions to/from account \""
                    + data[i].myAcount + "\" within blocks "
                    + data[i].startBlockNumber
                    + " and "
                    + data[i].endBlockNumber);
                resultData.myAcount.push(data[i].myAcount);
                //声明一个地址对象
                let rowsData = {
                    myAcount: data[i].myAcount,
                    num: 0,
                    rowData: []
                }
                //range
                for (var j = data[i].startBlockNumber; j <= data[i].endBlockNumber; j++) {
                    //区块循环次数
                    console.log("区块循环次数：", i, j)
                    resultData.num += 1;

                    // % 1000
                    if (j % 1000 == 0) {
                        console.log("Searching block " + i);
                    }
                    //获取区块数据 这里是直接获取对应块的数据,此时还没有开始数据过滤
                    var block = await data[i].web3Url.eth.getBlock(j, true);
                    //判断是否获取指定区块的数据
                    if (block != null && block.transactions != null) {

                        //根据类型 分别去查询不同的数据
                        switch (data[i].type) {
                            case 1:
                                if (Common.QuerySourceDataInformationOnly(data[i], block).num != 0) {
                                    rowsData.rowData.push(Common.QuerySourceDataInformationOnly(data[i], block));
                                    //
                                    rowsData.num += 1;
                                }
                                console.log("case 1");
                                break;
                            case 2:
                                if (Common.QueryDestinationDataInformationOnly(data[i], block).num != 0) {
                                    rowsData.rowData.push(Common.QueryDestinationDataInformationOnly(data[i], block));
                                    rowsData.num += 1;
                                }
                                console.log("case 2");
                                break;
                            case 3:
                                if (Common.QueryOnlySourceDestinationDataInformation(data[i], block).num != 0) {
                                    rowsData.rowData.push(Common.QueryOnlySourceDestinationDataInformation(data[i], block));
                                    rowsData.num += 1;
                                }
                                console.log("case 3");
                                break;
                            default:
                                console.log("default");
                                break;
                        }
                    }
                }
                // 装入大数组
                resultData.list.push(rowsData);
                console.log("cort is ok ", i);
            }
        }
        //返回 结果
        return resultData;
    },

    /*      22. 以太币(多) 一个地址,多个区块区间
   01. 币种类型:   以太币
   02. 查询方式:   单个
   03. 查询类型:   开始区块 结束区块
   04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
   05. 返回参数:   rows数据
   06. 是否批量:   否
*/
    queryNumberIntervalInformationAddress: async (data) => {
        //声明返回对象
        let resultData =
            {
                myAcount: [],
                num: 0,
                list: []
            }
        console.log("data length is ====", data.blockInterval);
        //迭代器处理
        if (data.length != 0) {
            //非空后,循环处理数据
            resultData.myAcount.push(data.myAcount);
            var myAcout = {
                myAcount: data.myAcount

            }
            for (var i = 0; i < data.blockInterval.length; i++) {
                console.log("循环次数是：", i);
                //判断 结束区块是否为空
                if (data.blockInterval[i].endBlockNumber == null) {
                    data[i].endBlockNumber = await data[i].web3Url.eth.blockNumber;
                    console.log("Using endBlockNumber: " + endBlockNumber);
                }
                //判断开始区块是否为空
                if (data.blockInterval[i].startBlockNumber == null) {
                    data[i].startBlockNumber = data[i].endBlockNumber - 1000;
                    console.log("Using startBlockNumber: " + data[i].startBlockNumber);
                }
                //开始查询
                console.log("Searching for transactions to/from account \""
                    + data.blockInterval[i].myAcount + "\" within blocks "
                    + data.blockInterval[i].startBlockNumber
                    + " and "
                    + data.blockInterval[i].endBlockNumber);

                //声明一个地址对象
                let rowsData = {
                    num: 0,
                    rowData: []
                }
                //range
                for (var j = data.blockInterval[i].startBlockNumber; j <= data.blockInterval[i].endBlockNumber; j++) {
                    //区块循环次数
                    console.log("区块循环次数：", i, j)
                    resultData.num += 1;

                    // % 1000
                    if (j % 1000 == 0) {
                        console.log("Searching block " + i);
                    }
                    //获取区块数据 这里是直接获取对应块的数据,此时还没有开始数据过滤
                    var block = await data.web3Url.eth.getBlock(j, true);
                    //判断是否获取指定区块的数据
                    if (block != null && block.transactions != null) {

                        //根据类型 分别去查询不同的数据
                        switch (data.blockInterval[i].type) {
                            case 1:
                                if (Common.QuerySourceDataInformationOnly(myAcout, block).num != 0) {
                                    rowsData.rowData.push(Common.QuerySourceDataInformationOnly(myAcout, block));
                                    //
                                    rowsData.num += 1;
                                }
                                console.log("case 1");
                                break;
                            case 2:
                                if (Common.QueryDestinationDataInformationOnly(myAcout, block).num != 0) {
                                    rowsData.rowData.push(Common.QueryDestinationDataInformationOnly(myAcout, block));
                                    rowsData.num += 1;
                                }
                                console.log("case 2");
                                break;
                            case 3:
                                if (Common.QueryOnlySourceDestinationDataInformation(myAcout, block).num != 0) {
                                    rowsData.rowData.push(Common.QueryOnlySourceDestinationDataInformation(myAcout, block));
                                    rowsData.num += 1;
                                }
                                console.log("case 3");
                                break;
                            default:
                                console.log("default");
                                break;
                        }
                    }
                }
                // 装入大数组
                resultData.list.push(rowsData);
                console.log("cort is ok ", i);
            }
        }
        //返回 结果
        return resultData;
    },


    /* 时间处理部分
*
* */

    /*      21. 以太币(多) 一个地址,一个时间范围
  01. 币种类型:   以太币
  02. 查询方式:   单个
  03. 查询类型:   开始区块 结束区块
  04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
  05. 返回参数:   rows数据
  06. 是否批量:   否
*/
    getsDataForspecifiedTimeAtAddressData: async (data) => {
        //
        //声明返回对象
        console.log("二分查询开始");
        //二分法查询 时间对应的时间戳
        // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
        let maxNumber = await web3_sk.eth.getBlockNumber();
        console.log("最新的区块高度是：", maxNumber);
        let start = await Common.indexOfSorted(maxNumber, data.startBlockNumber, 1);
        let end = await Common.indexOfSorted(maxNumber, data.endBlockNumber, 2);
        console.log("start:=", start);
        console.log("end:=", end);
        // console.log("end",end)
        //判断返回状态
        if (start.er == "min-1") {
            start = start.mid;
        }
        if (end.er == "max+1") {
            end = end.mid;
        }
        // let res = {}
        // //然后根据开始结束区块去查询
        let resultData = Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, start, end, data.type);
        //fanhui
        return resultData;
    },

    /*      22. 以太币(多) 一个地址,多个时间范围
  01. 币种类型:   以太币
  02. 查询方式:   单个
  03. 查询类型:   开始区块 结束区块
  04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
  05. 返回参数:   rows数据
  06. 是否批量:   否
*/
    getsDataForspecifiedTimeAtAddressDatas: async (data) => {
        //

        //声明返回对象
        let resultData = {
            myAcount: data.myAcount,
            num: 0,
            data: []
        }
        let start = "";
        let end = "";
        //shujujiaoyan
        let maxNumber = await web3_sk.eth.getBlockNumber();
        // console.log("最新的区块高度是：", maxNumber);
        for (var i = 0; i < data.blockList.length; i++) {
            //chaxun
            start = await Common.indexOfSorted(maxNumber, data.blockList[i].starTime, 1);
            //
            end = await Common.indexOfSorted(maxNumber, data.blockList[i].endTime, 2);
            //panduan
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }


            //panduan
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }
            //genju ququkuai  gaodu qu chaxun
            // //然后根据开始结束区块去查询
            let res = Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, start, end, data.type)
            let timeLimit = {
                startTime: data.blockList[i].starTime,
                endTime: data.blockList[i].endTime,
                block: {startBlockNumber: start, endBlockNumber: end},
                data: res
            }
            resultData.data.push(timeLimit);
        }
        return resultData;
    },

    /*      23. 以太币(多) 多个地址,多个时间范围
  01. 币种类型:   以太币
  02. 查询方式:   单个
  03. 查询类型:   开始区块 结束区块
  04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号)
  05. 返回参数:   rows数据
  06. 是否批量:   否
*/
    getsDataForspecifiedTimeAtAddressDatasmore: async (data) => {
//
        //声明返回对象
        let res = [];
        for (var i = 0; i < data.length; i++) {
            console.log("二分查询开始");
            //二分法查询 时间对应的时间戳
            // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
            let maxNumber = await web3_sk.eth.getBlockNumber();
            console.log("最新的区块高度是：", maxNumber);
            let start = await Common.indexOfSorted(maxNumber, data[i].startBlockNumber, 1);
            let end = await Common.indexOfSorted(maxNumber, data[i].endBlockNumber, 2);
            console.log("start:=", start);
            console.log("end:=", end);
            // console.log("end",end)
            //判断返回状态
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }
            // let res = {}
            // //然后根据开始结束区块去查询
            let resultData = Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, start, end, data.type);
            res.push(resultData)

        }

        //fanhui
        console.log("fanhiude shju shi :----------------------------", res);
        return res;
    },


    /*daibi */

    /* 批量处理部分
*
* */

    /*      04. DRC代币 (单人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTokenmyAccountdata: async (web3, acount, startBlockNumber, endBlockNumber) => {
        var res = {
            "row": []
        };
        //
        await Contract_Token.getPastEvents('Transfer', {
            filter: {_from: acount},
            fromBlock: startBlockNumber,
            toBlock: endBlockNumber,
        }, (error, events) => {
            //TODO
            console.log("events length:", events.length);
            for (let i = 0; i < events.length; i++) {
                var data = events[i];
                var rowdata = {
                    "no": i,
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "logIndex": data.logIndex,
                    "removed": data.removed,
                    "transactionHash": data.transactionHash,
                    "transactionIndex": data.transactionIndex,
                    "id": data.id,
                    "returnValues": {
                        "0": data.returnValues["0"],
                        "1": data.returnValues["1"],
                        "2": data.returnValues["2"],
                        "_from": data.returnValues._from,
                        "_to": data.returnValues._to,
                        "_value": data.returnValues._value
                    },
                    "event": data.event,
                    "signature": data.signature
                };
                //
                // console.log("row",i,res);
                res.row.push(rowdata)
            }
        });
        console.log("res=>", res)
        return res;

    },

    /*      04. DRC代币 (单人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTokenmyAccountdatamany: async (web3, myAcount, res) => {

        //
        let brr = [];

        for (var i = 0; i < res.length; i++) {
            console.log("i:", i)
            var res1 = {
                "row": []
            };
            //

            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: myAcount},
                fromBlock: res[i].startBlockNumber,
                toBlock: res[i].endBlockNumber
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res1.row.push(rowdata);
                }
                brr.push(res1);
            });
            // console.log("res=>", res1)
        }
        return brr;
    },

    /*      07. DRC代币 (多人多区块)
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTokenmyAccountdatamore: async (parsm) => {
        //
        let brr = [];
        for (var i = 0; i < parsm.length; i++) {
            var res = {
                "row": []
            };
            //
            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: parsm[i].myAcount},
                fromBlock: parsm[i].start,
                toBlock: parsm[i].end,
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res.row.push(rowdata)
                }
            });
            brr.push(res);
        }
        //
        return brr;
    },

    /* 时间处理部分
*
* */

    /*      04. DRC代币 (单人多区块) 时间
01. 币种类型:   代币
02. 查询方式:   单个
03. 查询类型:   开始区块 结束区块
04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
05. 返回参数:   rows数据 数组
06. 是否批量:   否
*/
    getTimeTokenmyAccountdata: async (data) => {
        var res = {
            "row": []
        };
        //首先 要根据时间去获取区块数
        //
        //声明返回对象
        console.log("二分查询开始");
        //二分法查询 时间对应的时间戳
        // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
        let maxNumber = await web3_sk.eth.getBlockNumber();
        console.log("最新的区块高度是：", maxNumber);
        let start = await Common.indexOfSorted(maxNumber, data.startTime, 1);
        let end = await Common.indexOfSorted(maxNumber, data.endTime, 2);
        console.log("start:=", start);
        console.log("end:=", end);
        // console.log("end",end)
        //判断返回状态
        if (start.er == "min-1") {
            start = start.mid;
        }
        if (end.er == "max+1") {
            end = end.mid;
        }

        //
        await Contract_Token.getPastEvents('Transfer', {
            filter: {_from: data.myAcount},
            fromBlock: start,
            toBlock: end,
        }, (error, events) => {
            //TODO
            console.log("events length:", events.length);
            for (let i = 0; i < events.length; i++) {
                var data = events[i];
                var rowdata = {
                    "no": i,
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "logIndex": data.logIndex,
                    "removed": data.removed,
                    "transactionHash": data.transactionHash,
                    "transactionIndex": data.transactionIndex,
                    "id": data.id,
                    "returnValues": {
                        "0": data.returnValues["0"],
                        "1": data.returnValues["1"],
                        "2": data.returnValues["2"],
                        "_from": data.returnValues._from,
                        "_to": data.returnValues._to,
                        "_value": data.returnValues._value
                    },
                    "event": data.event,
                    "signature": data.signature
                };
                //
                // console.log("row",i,res);
                res.row.push(rowdata)
            }
        });
        console.log("res=>", res)
        return res;

    },

    /*      04. DRC代币 (单人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTimeTokenmyAccountdatamany: async (data) => {
        let brr = [];
        for (var i = 0; i < data.list.lenth; i++) {
            var res = {
                "row": []
            };
            //首先 要根据时间去获取区块数
            //
            //声明返回对象
            console.log("二分查询开始");
            //二分法查询 时间对应的时间戳
            // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
            let maxNumber = await web3_sk.eth.getBlockNumber();
            console.log("最新的区块高度是：", maxNumber);
            let start = await Common.indexOfSorted(maxNumber, data.list[i].startTime, 1);
            let end = await Common.indexOfSorted(maxNumber, data.list[i].endTime, 2);
            console.log("start:=", start);
            console.log("end:=", end);
            // console.log("end",end)
            //判断返回状态
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }

            //
            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: data.list[i].myAcount},
                fromBlock: start,
                toBlock: end,
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res.row.push(rowdata)
                }
            });
            console.log("res=>", res)
            brr.push(res);
        }
        return res;
    },

    /*      07. DRC代币 (多人多区块) 时间
    01. 币种类型:   代币
    02. 查询方式:   单个
    03. 查询类型:   开始区块 结束区块
    04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
    05. 返回参数:   rows数据 数组
    06. 是否批量:   否
*/
    getTimeTokenmyAccountdatamore: async (data) => {
        let brr = [];
        for (var i = 0; i < data.lenth; i++) {
            var res = {
                "row": []
            };
            //首先 要根据时间去获取区块数
            //
            //声明返回对象
            console.log("二分查询开始");
            //二分法查询 时间对应的时间戳
            // let maxNumber = await data.web3Url.eth.blockNumber;web3.eth.blockNumber
            let maxNumber = await web3_sk.eth.getBlockNumber();
            console.log("最新的区块高度是：", maxNumber);
            let start = await Common.indexOfSorted(maxNumber, data[i].startTime, 1);
            let end = await Common.indexOfSorted(maxNumber, data[i].endTime, 2);
            console.log("start:=", start);
            console.log("end:=", end);
            // console.log("end",end)
            //判断返回状态
            if (start.er == "min-1") {
                start = start.mid;
            }
            if (end.er == "max+1") {
                end = end.mid;
            }

            //
            await Contract_Token.getPastEvents('Transfer', {
                filter: {_from: data[i].myAcount},
                fromBlock: start,
                toBlock: end,
            }, (error, events) => {
                //TODO
                console.log("events length:", events.length);
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "logIndex": data.logIndex,
                        "removed": data.removed,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "id": data.id,
                        "returnValues": {
                            "0": data.returnValues["0"],
                            "1": data.returnValues["1"],
                            "2": data.returnValues["2"],
                            "_from": data.returnValues._from,
                            "_to": data.returnValues._to,
                            "_value": data.returnValues._value
                        },
                        "event": data.event,
                        "signature": data.signature
                    };
                    //
                    // console.log("row",i,res);
                    res.row.push(rowdata)
                }
            });
            console.log("res=>", res)
            brr.push(res);
        }
        return res;
    },

    /* 测试处理部分
*
* */
    /*      07. DRC代币 (多人多区块) 时间
01. 币种类型:   代币
02. 查询方式:   单个
03. 查询类型:   开始区块 结束区块
04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
05. 返回参数:   rows数据 数组
06. 是否批量:   否
*/
    testgetTimeTokenmyAccountdatamore: async (data) => {
        var brr = [];
        let maxNumber = await web3_sk.eth.getBlockNumber();
        await Common.getforlist(data, maxNumber)
            .then(res => {
                    return res;
                }
            );
    },

    /*      07. DRC代币 (多人多区块) 时间
01. 币种类型:   代币
02. 查询方式:   单个
03. 查询类型:   开始区块 结束区块
04. 查询参数:   (4)(web3实例@地址@开始区块号@结束区块号) 合约实例
05. 返回参数:   rows数据 数组
06. 是否批量:   否
*/
    testytaigetTimeTokenmyAccountdatamore: async (data) => {
        var brr = [];
        let maxNumber = await web3_sk.eth.getBlockNumber();
        console.log("查询的最新区块是：", maxNumber);
        //查询多人多区块
        await Common.getforlist1(data, maxNumber)
            .then(res1 => {
                    brr.push(res1)
                    console.log("多人多区块返回的数据是：", res1);

                }
            );
        return brr;
    },

    getTokenRank: async (data) => {
        //
        let maxNumber = await web3_sk.eth.getBlockNumber();
        await Contract_Token.getPastEvents('Transfer', {
            filter: {},
            fromBlock: "0",
            toBlock: maxNumber,
        }, (error, events) => {
            //TODO

            console.log("events length:", events.length);
            //
            return events.length;
            // for (let i = 0; i < events.length; i++) {
            //     var data = events[i];
            //     var rowdata = {
            //         "no": i,
            //         "address": data.address,
            //         "blockHash": data.blockHash,
            //         "blockNumber": data.blockNumber,
            //         "logIndex": data.logIndex,
            //         "removed": data.removed,
            //         "transactionHash": data.transactionHash,
            //         "transactionIndex": data.transactionIndex,
            //         "id": data.id,
            //         "returnValues": {
            //             "0": data.returnValues["0"],
            //             "1": data.returnValues["1"],
            //             "2": data.returnValues["2"],
            //             "_from": data.returnValues._from,
            //             "_to": data.returnValues._to,
            //             "_value": data.returnValues._value
            //         },
            //         "event": data.event,
            //         "signature": data.signature
            //     };
            //     //
            //     // console.log("row",i,res);
            //     res.row.push(rowdata)
            // }
        });
    },

    //时间转换区块
    getTimeTokenthreeAccountdata: async (data) => {
        //01. 时间转换成区块
        console.log("二分查询开始");
        var res = {
            "row": []
        };
        console.time('showColumnInfo');
        let rest = await Controller.getTimeToBlock(data);
        console.timeEnd('showColumnInfo');
        //查询区块数据
        await Contract_Token.getPastEvents('Transfer', {
            filter: {_from: data.myAcount},
            fromBlock: rest[0],
            toBlock: rest[1],
        }, (error, events) => {
            //TODO
            console.log("events length:", events.length);
            for (let i = 0; i < events.length; i++) {
                var data = events[i];
                var rowdata = {
                    "no": i,
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "logIndex": data.logIndex,
                    "removed": data.removed,
                    "transactionHash": data.transactionHash,
                    "transactionIndex": data.transactionIndex,
                    "id": data.id,
                    "returnValues": {
                        "0": data.returnValues["0"],
                        "1": data.returnValues["1"],
                        "2": data.returnValues["2"],
                        "_from": data.returnValues._from,
                        "_to": data.returnValues._to,
                        "_value": data.returnValues._value
                    },
                    "event": data.event,
                    "signature": data.signature
                };
                //
                // console.log("row",i,res);
                res.row.push(rowdata)
            }
        });
        return res;
    },

    getTimeToBlock: async (data) => {
        console.time()
        let arr = [];
        var resarr = [];
        //二分法查询 时间对应的时间戳
        let maxNumber = await web3_sk.eth.getBlockNumber();
        console.log("最新的区块高度是：", maxNumber);
        //
        arr.push(Common.indexOfSortedthree(maxNumber, data.startTime, 1)
            .then(res => {
                resarr.push(res);

            })
            .catch(e => {
                resarr.push(e);
            })
        );
        arr.push(Common.indexOfSortedthree(maxNumber, data.endTime, 2)
            .then(
                res => {
                    resarr.push(res);
                }
            )
            .catch(e => {
                console.log(e);
            }));
        //
        await Promise.all(arr)
            .then(res => {
                console.log("查询到的开始区块号是：", resarr[0]);
                console.log("查询到的结束区块号是：", resarr[1]);
                //
                if (resarr[0] == "min-1") {
                    resarr[0] = start.mid;
                }
                if (resarr[1] == "max+1") {
                    resarr[1] = end.mid;
                }
                return resarr;
            })
            .catch(e => {
                return resarr;
                console.log("getTimeTokenthreeAccountdata catch", e);
            })
        //
        console.timeEnd()
        return resarr;
    },

    //轮询器
    PollerData: async (data) => {
        //chaxun
        let result = await Common.getNewBlockData(data);
        return result;

    },
    //
    PollerDatatest: async (data) => {
        //chaxun
        let result = await Common.getNewBlockDataone(data);
        return result;

    }
};



//
module.exports = Controller;