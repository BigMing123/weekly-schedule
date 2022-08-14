const url = "https://data.mongodb-api.com/app/data-iccwf/endpoint/data/v1/action";
const key = "xnmHIDaOkVYrIjUPjEj938lq5j9cZHW53txoSvytJjs3mhoiqqg3cWsjIAzOo3fm";
            

function atlasAddEvent(eventData) {
    var inputData = JSON.stringify({
        "collection": "activities",
        "database": "weekly-schedule",
        "dataSource": "Cluster0",
        "document": eventData
    });
    var config = {
        method: 'post',
        url: url + "/insertOne",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'api-key': key
        },
        data: inputData
    };
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function atlasGetEvents() {
    var inputData = JSON.stringify({
        "collection": "activities",
        "database": "weekly-schedule",
        "dataSource": "Cluster0",
        "filter": {}
    });
    var config = {
        method: 'post',
        url: url + "/find",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'api-key': key
        },
        data: inputData
    };
    return await axios(config);
}
