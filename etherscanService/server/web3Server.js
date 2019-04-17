const Web3 = require('web3');



//
/*       Web相关
    01. Web相关:   Web相关
*/
var Web3JS = {
    init_web3: () => {
        const url = "https://ropsten.infura.io/v3/ee23e77aa14846d88eb5cad3d59e37f2";
        let  web3_sk = new Web3(new Web3.providers.HttpProvider(url));
        console.log("web3=>", web3_sk.version);
        web3_sk.eth.defaultAccount = '0x38a8DC14edE1DEf9C437bB3647445eEec06fF105';
        return  web3_sk;
    },
    getabitest: () => {
    },
    getContract: () => {
        //
        let Abi_Token = token_abi;
        let Address_Token = token_address.token.address;
        //Token  实例化
        Contract_Token = web3_sk.eth.Contract(Abi_Token, Address_Token, {
            from: '0x38a8DC14edE1DEf9C437bB3647445eEec06fF105',
            gasPrice: '2000000000'
        });

//         const myContract = new web3.eth.Contract([...],
// ˓→'0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
//             from: '0x1234567890123456789012345678901234567891', // default from address
//             gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
//         });
        // TODO:
        console.log("Token合约实例完成");
    }

};

//
module.exports = Web3JS;