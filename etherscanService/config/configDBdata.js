/* mongoDB 参数设置*/

var datalist = {
    fMasterdata: {
        fNo: 0,
        fUUID: '',
        fToken: '',
        fType: '',
        fIsListening: false
    },
    fTrandata: {
        fNo: 394,
        fUUID: "",
        fTpye: 1,
        fMasterID: "343",
        fBz: "3434",
        fSelect: true,
        fTime: "",
        fFrom: "",
        fTo: "",
        fVlaue: "",
        fSize: "",
        fBlocknum: "",
        fBlockHash: "",
        fTransactionHash: ""
    },
    fTrandetaileddata: {
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
    fRank:{
        fNo:0,
        fName:'',
        fAddress:'',
        fHaveSum:'',
        fTransactionSum:'',
        fBz:'',
        fToken:'',
        fUUID:''
    }
}


//
module.exports = datalist;
