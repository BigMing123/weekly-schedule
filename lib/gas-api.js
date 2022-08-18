const url = "https://script.google.com/macros/s/AKfycby3UzcwtjdeCnuiQpDqDCDUq68oOYcoKPJffMmrGlU1AWFSINKe_mTBlGPtplMfNDV9/exec"
            

function gasAddEvent(eventData) {
    var inputData = JSON.stringify({
        "document": eventData
    });
    var config = {
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(eventData)
    };
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}

// 后期传入option参数
async function gasGetEvents() {
    console.log("start loading")
    var config = {
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
    };
    return await axios(config);
}

async function loadEvents() {
    let result = await gasGetEvents().then(function (response) {
        let rawData = response.data;
        return rawData;
    })
    .catch(function (error) {
        console.log(error);
    });
    return result;
}