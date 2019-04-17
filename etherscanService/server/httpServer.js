const request = require("request");

//

/* http post
*
* */
var Http_service = {
    postForm: (url, form, callback) => {
        let header = Http_service.getHeader();
        let option = {
            json: true,
            header: header,
            body: form
        };
        request.post(url, option, (error, response, body) => {
            Http_service.resultFunction(callback, error, response, body);
        });

    },
    postFormJson: async (url, form) => {
        //
        return new Promise((resolve, reject) => {
            //
            let header = Http_service.getHeader();
            let option = {
                url: url,
                method: "POST",
                json: true,
                headers: header,
                body: form
            };
            //
            request(option, (error, response, body) => {
                if (!error && response.statusCode === 200) {

                    resolve({success: true, msg: body});
                } else {
                    console.log('request is error', error);
                    reject("err");
                }
            });
        });
    },
    resultFunction: (callback, error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback({success: true, msg: body});
            console.log('request is success ');
            return callback;
        } else {
            console.log('request is error', error);
            callback({success: false, msg: error});
            return callback;
        }

    },
    getHeader: () => {
        return {
            "content-type": "application/json"
        }
    }
    /*fabric
    * */
}


//
module.exports = Http_service;