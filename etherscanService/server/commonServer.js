const Web3 = require('web3');



//
/*       基础业务
    01. 基础业务:   基础业务
*/
var Common = {
    //
    init_web3: (url) => {
        var web3 = new Web3(new Web3.providers.HttpProvider(url));
        return web3;
    },
    timeConverter: (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        //
        if (year < 10) {
            // console.log("year", hour);
            year = "0" + year;
        }

        if (month < 10) {
            // console.log("month小于10", month);
            month = "0" + month;
        }

        if (date < 10) {
            // console.log("date小于10", date);
            date = "0" + date;
        }

        if (hour < 10) {
            // console.log("hour小于10", hour);
            hour = "0" + hour;
        }

        if (min < 10) {
            // console.log("min小于10", min);
            min = "0" + min;
        }

        if (sec < 10) {
            // console.log("sec小于10", sec);
            sec = "0" + sec;
        }
        var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
        return time
    },

    /* time 比较,个位处理
    *
    * */
    timeFormatProcessing: (UNIX_timestamp) => {
        //
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        //做数据处理,如果发生是小于9的要判断,如果小于9比较就会异常，所以要加0
        //if

        if (year < 10) {
            // console.log("year", hour);
            year = "0" + year;
        }

        if (month < 10) {
            // console.log("month小于10", month);
            month = "0" + month;
        }

        if (date < 10) {
            // console.log("date小于10", date);
            date = "0" + date;
        }

        if (hour < 10) {
            // console.log("hour小于10", hour);
            hour = "0" + hour;
        }

        if (min < 10) {
            // console.log("min小于10", min);
            min = "0" + min;
        }

        if (sec < 10) {
            // console.log("sec小于10", sec);
            sec = "0" + sec;
        }
        var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec;
        return time

    },
    verification: (data) => {
        //
        console.log("start  verification");
        switch (data) {
            case data.Faddress == null || data.Faddress == undefined || data.Faddress == "":
                return Error.Faddress;
            case data.FstartBlockNumer == null | data.FstartBlockNumer == undefined || data.FstartBlockNumer == "":
                return Error.FstartBlockNumer;
            case data.FendBlockNumber == null | data.FendBlockNumber == undefined || data.FendBlockNumber == "":
                return Error.FendBlockNumber;
            case data.type == null | data.type == undefined || data.type == "":
                return Error.type;
            default:
                return "OK";
        }
    },

    /*    时间  query 以太币  查询  只查询 From
    *  ***********************************
    *
    *
    *
    *  01. 币种类型:   以太币
    * */
    queryTimeSourceDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
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
                    "gas": e.gas
                    // "input": e.input
                }
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        // console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },

    //Query destination data information only
    /*    时间  query 以太币  查询  只查询 to
    *  ***********************************
    *
    *
    *
    *  01. 币种类型:   以太币
    * */
    queryTimeDestinationDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
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
                    "gas": e.gas
                    // "input": e.input
                }
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },


    /*    时间  query 以太币  查询  只查询 From,to
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    queryTimeOnlySourceDestinationDataInformation: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
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
                    "gas": e.gas
                    // "input": e.input
                }
                // console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                console.log("查询到的对象是：", row)
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        // console.log("ProcessingDataCompletion", data.myAcount);
        console.log("查询到的是rowsData =", rowsData);
        return rowsData;
    },

    /*    时间  query 以太币  查询  只查询 From,to async
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    queryTimeOnlySourceDestinationDataInformationasync: async (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
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
                    "gas": e.gas
                    // "input": e.input
                }
                // console.log("---row", rowrmessage);
                //拼接对象
                let row = {
                    'time': Common.timeConverter(block.timestamp),
                    "message": {
                        'from': e.from,
                        'to': e.to,
                    },
                    "row": rowrmessage,
                    "bz": ''
                }
                //存入返回对象
                console.log("查询到的对象是：", row)
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        // console.log("ProcessingDataCompletion", data.myAcount);
        console.log("查询到的是rowsData =", rowsData);
        return rowsData;
    },


    /*      query 以太币  查询  只查询 From
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    QuerySourceDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
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
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {"from": e.from, "to": e.to, "row": rowrmessage}
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },

    //Query destination data information only

    /*      query 以太币  查询  只查询 to
    *  ***********************************
    *
    *
    *
    *  01. 币种类型:   以太币
    * */
    QueryDestinationDataInformationOnly: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
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
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {"from": e.from, "to": e.to, "row": rowrmessage}
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },

    //
    /*      query 以太币  查询  只查询 From,to
*  ***********************************
*
*
*
*  01. 币种类型:   以太币
* */
    QueryOnlySourceDestinationDataInformation: (data, block) => {
        //声明一个地址对象
        let rowsData = {
            num: 0,
            rowData: []
        }
        //如果对应区块号有数据,那么开始遍历数据过滤
        block.transactions.forEach((e) => {
            //这里要判断他是要查询什么种类
            //判断处理
            if (data.myAcount == "*" || data.myAcount == e.from || data.myAcount == e.to) {
                // console.log("--type");
                //拼接数据
                let rowrmessage = {
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
                console.log("---row", rowrmessage);
                //拼接对象
                let row = {"from": e.from, "to": e.to, "row": rowrmessage}
                //存入返回对象
                rowsData.rowData.push(row);
                //rows 数量加1
                rowsData.num += 1;
            }
        });
        //
        console.log("ProcessingDataCompletion", data.myAcount);
        return rowsData;
    },


    /*二分法 查找  开始时间对应的区块
    *
    *   1.返回对应时间吹的区块
    * */
    indexOfSorted: async (maxNumber, n, state) => {
        //
        //assume : arr has been sorted
        var low = 0;
        var high = maxNumber - 1;
        var led = (low + high) / 2;
        var mid = Math.ceil(led);
        var i = 0;
        //开始
        while (high - low > 1) {
            //如果
            // console.log("rows:" + "mide:" + mid + "high:" + high + "low:" + low);
            let p1 = await Common.getTimestamp(low);
            let p2 = await Common.getTimestamp(high);
            let p3 = await Common.getTimestamp(mid);
            if (n == p1) {
                console.log("返回成功1", low)
                return low;
            }
            if (n == p2) {
                console.log("返回成功2", high)
                return high;
            }
            if (n == p3) {
                console.log("返回成功3", mid)
                return mid;
            }
            if (n > p3) {
                console.log("小了");
                low = mid;
                let sum = (low + high) / 2;
                mid = Math.ceil(sum);
                console.log("转换后的数据是", mid);
            }
            if (n < p3) {
                console.log("大了");
                high = mid;
                let sd = (low + high) / 2
                mid = Math.ceil(sd);
                console.log("转换后的数据是", mid);
            }
            //
        }
        if (static == 1) {
            //+
            return {er: "min-1", mid: mid - 1};
        } else if (static == 2) {
            //-
            return {er: "max+1", mid: mid + 1};
        }
    },

    /*获取区块的时间戳*/
    getTimestamp: async (index) => {
        var block = await web3_sk.eth.getBlock(index, false);
        if (block != null && block.transactions != null) {
            let time = Common.timeFormatProcessing(block.timestamp);
            return time;
        } else {
            return "err";
        }
    },


    /*根据区块范围区间查询关于某人的信息
    *
    * */
    getsTheSpecifiedRangeBlockData: async (web3, myaccount, startBlockNumber, endBlockNumber, type) => {
        //声明一个地址对象
        console.log("据区块范围区间查询关于某人的信息");
        let brr = [];
        let frr = [];
        let rowsData = {
            myAcount: myaccount,
            blocklimited: {startNum: startBlockNumber, endNum: endBlockNumber},
            num: 0,
            rowData: []
        }
        let mydat = {
            myAcount: myaccount

        }
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 == 0) {
            }
            //2275 skt
            // web3.eth.getBlock(i, true);
            var block = await web3.eth.getBlock(i, true);
            //
            if (block != null && block.transactions != null) {
                //
                switch (type) {
                    case 1:
                        if (Common.queryTimeSourceDataInformationOnly(mydat, block).num != 0) {
                            rowsData.rowData.push(Common.queryTimeSourceDataInformationOnly(mydat, block));
                            //
                            rowsData.num += 1;
                        }
                        // console.log("case 1");
                        break;
                    case 2:
                        if (Common.queryTimeDestinationDataInformationOnly(mydat, block).num != 0) {
                            rowsData.rowData.push(Common.queryTimeDestinationDataInformationOnly(mydat, block));
                            rowsData.num += 1;
                        }
                        console.log("case 2");
                        break;
                    case 3:
                        if (Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, block).num != 0) {
                            //
                            frr.push(Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, block)
                                .then(res => {
                                    rowsData.rowData.push(res);
                                    rowsData.num += 1;
                                })
                                .catch(e => {
                                    console.log("2363", e);
                                }))
                        }
                        // console.log("case 3");
                        break;
                    default:
                        console.log("default");
                        break;
                }

            }
        }

        await Promise.all(frr).then(
            res => {
                console.log("2383")
            }
        )
            .catch(e => {
                console.log("2389", e);
            })
        //
        console.log("区块范围区间查询关于某人的信息wanbi", rowsData);
        return rowsData;
    },

    /* 封装单个循环结果
    *
    * */
    getFindIndividualData: async (data, maxNumber) => {
        //二分查找 开始区块 结束区块
        // var res = {
        //     "row": []
        // };
        var resdata = [];
        let brr = [];
        let crr = [];
        let krr = [];
        let grr = [];
        //首先 要根据时间去获取区块数
        console.log("二分查询开始");
        brr.push(Common.indexOfSorted(maxNumber, data.startTime, 1)
            .then(res => {
                crr.push(res);
            })
            .catch(e => {
                console.log(e);
            }));
        brr.push(Common.indexOfSorted(maxNumber, data.endTime, 2)
            .then(res => {
                crr.push(res);

            }).catch(e => {
                console.log(e);
            }));
        //

        // let start = await Common.indexOfSorted(maxNumber, data.startTime, 1);
        // let end = await Common.indexOfSorted(maxNumber, data.endTime, 2);
        //awit
        await Promise.all(brr)
            .then(res => {
                console.log("查询到的开始区块号是：", crr[0]);
                console.log("查询到的结束区块号是：", crr[1]);
                //
                if (crr[1] == "min-1") {
                    crr[1] = start.mid;
                }
                if (crr[2] == "max+1") {
                    crr[2] = end.mid;
                }
                //
                grr.push(Common.getsTheSpecifiedRangeBlockData(web3_sk, data.myAcount, crr[0], crr[1], data.type)
                    .then(res => {
                        resdata.push(res);
                        //
                        console.log("返回2367111111", res);
                    })
                    .catch(e => {
                        console.log(e);
                        return e;
                    }));
            })
            .catch(e => {
                console.log("e2542", e);
            });
        //
        await Promise.all(grr)
            .then(res => {
                console.log("2222 2456", res);
            }).catch(e => {
                console.log("2459", e);
            })
        return resdata;
    },


    /* fez*/
    getforlist: async (data, maxNumber) => {
        let ass = [];
        let arr = [];
        for (var i = 0; i < data.length; i++) {
            ass.push(Common.getFindIndividualData(data[i], maxNumber)
                .then(res => {
                    arr.push(res);
                }));
        }
        await Promise.all(ass).then(er => {
            console.log("dfadd", arr);
            return arr
        });
        //
    },

    //处理多个数据
    getforlist1: async (data, maxNumber) => {
        let ass = [];
        let arr = [];
        for (var i = 0; i < data.length; i++) {
            //处理单条数据
            ass.push(Common.getFindIndividualData(data[i], maxNumber)
                .then(res => {
                    console.log("处理单条数据 :", res)
                    arr.push(res);
                })
                .catch(e => {
                    console.log("e", e);
                }));
        }

        //等待所以执行完毕 返回 总数组
        await Promise.all(ass)
            .then(er => {
                console.log('所有的', arr);
                return arr;
            })
            .catch(e => {
                console.log("e", e);
            });
        return arr;
    },

    //获取单个区块的信息
    getOneBlock: async (index) => {
        //
        var block = await web3_sk.eth.getBlock(index, false);
        //
        if (block != null && block.transactions != null) {
            let time = Common.timeFormatProcessing(block.timestamp);
            return time;
        } else {
            return "err";
        }

    },

    /* yibu 二分法 查找  开始时间对应的区块
*
*   1.返回对应时间吹的区块
* */
    indexOfSortedthree: async (maxNumber, n, state) => {
        //
        //assume : arr has been sorted
        var low = 0;
        var high = maxNumber - 1;
        var led = (low + high) / 2;
        var mid = Math.ceil(led);
        var i = 0;
        //开始
        while (high - low > 1) {
            //如果
            // console.log("rows:" + "mide:" + mid + "high:" + high + "low:" + low);
            let p1 = await Common.getTimestamp(low);
            let p2 = await Common.getTimestamp(high);
            let p3 = await Common.getTimestamp(mid);
            //
            if (n == p1) {
                return low;
            }
            if (n == p2) {
                return high;
            }
            if (n == p3) {
                return mid;
            }
            if (n > p3) {
                low = mid;
                let sum = (low + high) / 2;
                mid = Math.ceil(sum);
            }
            if (n < p3) {
                high = mid;
                let sd = (low + high) / 2
                mid = Math.ceil(sd);
            }
            //
        }
        if (static == 1) {
            //+
            return {er: "min-1", mid: mid - 1};
        } else if (static == 2) {
            //-
            return {er: "max+1", mid: mid + 1};
        }
    },

    //异步查询区块范围数据
    getsTheSpecifiedRangeBlockDatathree: async (web3, myaccount, startBlockNumber, endBlockNumber, type) => {
        //声明一个地址对象
        console.log("据区块范围区间查询关于某人的信息");
        let brr = [];
        let frr = [];
        let rowsData = {
            myAcount: myaccount,
            blocklimited: {startNum: startBlockNumber, endNum: endBlockNumber},
            num: 0,
            rowData: []
        }
        let mydat = {
            myAcount: myaccount

        }
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 == 0) {
            }
            //2275 skt
            // web3.eth.getBlock(i, true);
            var block = await web3.eth.getBlock(i, true);
            //
            if (block != null && block.transactions != null) {
                //
                switch (type) {
                    case 1:
                        if (Common.queryTimeSourceDataInformationOnly(mydat, block).num != 0) {
                            rowsData.rowData.push(Common.queryTimeSourceDataInformationOnly(mydat, block));
                            //
                            rowsData.num += 1;
                        }
                        // console.log("case 1");
                        break;
                    case 2:
                        if (Common.queryTimeDestinationDataInformationOnly(mydat, block).num != 0) {
                            rowsData.rowData.push(Common.queryTimeDestinationDataInformationOnly(mydat, block));
                            rowsData.num += 1;
                        }
                        console.log("case 2");
                        break;
                    case 3:
                        if (Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, block).num != 0) {
                            //
                            frr.push(Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, block)
                                .then(res => {
                                    rowsData.rowData.push(res);
                                    rowsData.num += 1;
                                })
                                .catch(e => {
                                    console.log("2363", e);
                                }))
                        }
                        // console.log("case 3");
                        break;
                    default:
                        console.log("default");
                        break;
                }

            }
        }

        await Promise.all(frr).then(
            res => {
                console.log("2383")
            }
        )
            .catch(e => {
                console.log("2389", e);
            })
        //
        console.log("区块范围区间查询关于某人的信息wanbi", rowsData);
        return rowsData;
    },

    //查询一个区块的数据
    getOneBlockTranthree: async (index, myAcout, type) => {
        //
        if (index % 1000 == 0) {
            console.log("Searching block " + i);
        }
        let brr = [];
        let arr = [];
        let crr = [];
        var sk;
        brr.push(web3_sk.eth.getBlock(index, true)
            .then(res => {
                //
                console.log("111")
                sk = res;

            })
            .catch(err => {
                sk = "1123233"
            }))
        await Promise.all(brr);
        // //
        console.log("查询一个区块的数据")
        if (sk != null && sk.transactions != null) {
            crr.push(Common.getOneBlockMyAccount(sk, myAcout, type)
                .then(res => {
                    arr.push(res);
                })
                .catch(err => {
                    arr.push(err);
                }));
        }
        await Promise.all(crr);
        console.log("keyi")
        return arr;
    },

    //查询一个区块数据中符合本地址的数据
    getOneBlockMyAccount: async (data, myAcount, type) => {
        //
        let arr = [];
        let mydat = {
            myAcount: myAcount

        }
        let rowsData = {
            myAcount: myAcount,
            num: 0,
            rowData: []
        }
        switch (type) {
            case 1:
                if (Common.queryTimeSourceDataInformationOnly(mydat, data).num != 0) {
                    arr.push(Common.queryTimeSourceDataInformationOnly(mydat, data)
                        .then(res => {
                            rowsData.rowData.push(res);
                            rowsData.num += 1;
                        })
                        .catch(e => {
                            console.log("2363", e);
                        }));
                }
                // console.log("case 1");
                break;
            case 2:
                if (Common.queryTimeDestinationDataInformationOnly(mydat, data).num != 0) {
                    arr.push(Common.queryTimeDestinationDataInformationOnly(mydat, data)
                        .then(res => {
                            rowsData.rowData.push(res);
                            rowsData.num += 1;
                        })
                        .catch(e => {
                            console.log("2363", e);
                        }));
                }
                console.log("case 2");
                break;
            case 3:
                if (Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, data).num != 0) {
                    //
                    arr.push(Common.queryTimeOnlySourceDestinationDataInformationasync(mydat, data)
                        .then(res => {
                            rowsData.rowData.push(res);
                            rowsData.num += 1;
                        })
                        .catch(e => {
                            console.log("2363", e);
                        }));
                }
                break;
            default:
                console.log("default");
                break;
        }
        //
        await Promise.all(arr);
        //
        console.log("3333", arr)
        return rowsData;
    },

    getNewBlockData: async (data) => {
        //
        var res = {
            "state":0,
            "row": []
        };
        let maxNumber = await web3_sk.eth.getBlockNumber();
        //
        console.log("轮询查询到最新的区块编号：", maxNumber);

        //time
        var time =   await Common.getOneBlock(maxNumber);
        //
        await Contract_Token.getPastEvents('Transfer', {
            filter: {_from: data.myAcount},//todo
            fromBlock: maxNumber - 1,
            toBlock: maxNumber,
        }, (error, events) => {
            //TODO
            console.log("events length:", events.length);
            if (events.length > 0) {
                //
                for (let i = 0; i < events.length; i++) {
                    var data = events[i];
                    var rowdata = {
                        "no": i,
                        "address": data.address,
                        "time": time,
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
                    res.row.push(rowdata);
                    res.state=2;
                }

            } else {
                //
                let rowdata = {
                    state: "nill"

                }
                res.row.push(rowdata);
                res.state=3;
            }
        });
        return res;

    },
    getNewBlockDataone: async (data) => {
        //
        var res = {
            "row": []
        };
        // let maxNumber = await web3_sk.eth.getBlockNumber();
        //
        // console.log("轮询查询到最新的区块编号：", maxNumber);
        //
        await Contract_Token.getPastEvents('Transfer', {
            filter: {_from: data.myAcount},//todo
            fromBlock:"5383209",
            toBlock: "5383210",
        }, (error, events) => {
            //TODO
            console.log("events length:", events.length);
            if (events.length > 0) {
                //
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

            } else {
                //
                let rowdata = {
                    state: "nill"

                }
                res.row.push(rowdata);
            }

        });
        return res;

    }
}


//
module.exports = Common;