
const APP_TOKEN = 'AT_DymeetzfC0yH444HghAKmA9iygZHy60S';
const send_msg_url = 'https://wxpusher.zjiecode.com/api/send/message';
const get_url = 'https://wxpusher.zjiecode.com/api/fun/scan-qrcode-uid?code=';
const create_qrcode_url = 'https://wxpusher.zjiecode.com/api/fun/create/qrcode';

function pushWxMessage() {
    var uid = 'UID_U6cNrnSNU6jWHgwxw9Z4YXJoOaO1';
    let data =  {
        "appToken":APP_TOKEN,
        "content":"aaabbbxc预约了2022-08-11 11:30到14:30的pte一对一课程",
        "summary":"aaabbbxc预约了2022-08-11 11:30到14:30",//消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
        "contentType":1,//内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown 
        // "topicIds":[ //发送目标的topicId，是一个数组！！！，也就是群发，使用uids单发的时候， 可以不传。
        //     123
        // ],
        "uids":[//发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。
            uid
        ],
        "url":"https://lingyang-au-pte.com" //原文链接，可选参数
    };

    var config = {
        method: 'post',
        url: send_msg_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        data: data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function createQrCode() {
    let data =  {
        "appToken":APP_TOKEN,   //必填，appToken,前面有说明，应用的标志
        "extra": 'default',      //必填，二维码携带的参数，最长64位
        "validTime":180    //可选，二维码的有效期，默认30分钟，最长30天，单位是秒
    };
    return new Promise(resolve => {
        var config = {
            method: 'post',
            url: create_qrcode_url,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            data: data
        };
    
        axios(config)
        .then(function (res) {
            result = {code: res.data.data.code, url: res.data.data.url};
            return resolve(result);
        })
        .catch(function (error) {
            console.log(error);
        });

    })
}

function queryWxPusher(code) {
    return new Promise(resolve => {
        var config = {
            method: 'get',
            url: get_url + code,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
        };
    
        axios(config)
        .then(function (res) {
            return resolve(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    })
}