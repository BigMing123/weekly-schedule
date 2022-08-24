const faunadb = window.faunadb;
const q = faunadb.query;
const client = new faunadb.Client({
    secret: 'fnAEuSVyeiACVDsAHVqZ11gAA3QQcWTrtpu6MaFO',
    domain: 'db.fauna.com', // Adjust if you are using Region Groups
});

const loginClient = new faunadb.Client({
    secret: 'fnAEuciu5OACSced61iFoh5Db4PqimB-cRcd3RPF',
    domain: 'db.fauna.com',
})

function setupFauna() {
    client.query(
        q.ToDate('2018-06-06')
    )
    .then(function (res) { console.log('Result:', res) })
    .catch(function (err) { console.log('Error:', err) })
}

async function faunaAddEvent(event) {
    let res = await client.query(
        q.Create(
            q.Collection('weekly-schedule'),
            { data: event }
        )
    )
    return res;
}

async function faunaAddTutor(tutor) {
    let res = await client.query(
        q.Create(
            q.Collection('tutor'),
            { data: tutor }
        )
    )
    return res;
}

async function saveAdminSetting(slotMinMax, unavailableTS, hiddenD) {
    let newSetting =  {
          "slotMinMax": slotMinMax,
          "unavailableTimeSlots": unavailableTS,
          "hiddenDays": hiddenD
    };
    return new Promise(resolve => {
        client.query(
            q.Update(
                q.Ref(q.Collection("admin-setting"), "340582055893008978"),
                {
                    data: newSetting
                },
            )
        )
        .then((ret) => {
            return resolve(ret);
        })
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
            alert("网络异常，请重新加载页面")
        ))
    })
}

async function getAdminSetting() {
    return new Promise(resolve => {
        client.query(
            q.Get(
                q.Ref(q.Collection("admin-setting"), "340582055893008978")
            )
        )
        .then((ret) => {
            return resolve(ret);
        })
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
    })
}

async function faunaGetEvents() {
    let events = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('weekly-schedule'))),
            q.Lambda(x => q.Get(x))
        )
    )
    return events.data;
}

async function faunaDeleteEvent(refid) {
    let res = await client.query(
        q.Delete(q.Ref(q.Collection('weekly-schedule'), refid))
    )
    return res;
}

async function faunaFindItemByValue(collection, key, value) {
    return new Promise(resolve => {
        client.query(
            q.CreateIndex({
                name: "search-by-" + key,
                source: q.Collection(collection),
                terms: [ { field: ["data", key] } ],
                unique: true // id are unique
            })
        )
        .then((ret) => {
            client.query(
                q.Get(
                    q.Match(q.Index('search-by-' + key), value)
                )
            )
            .then((ret) => {
                return resolve(ret);
            })
            .catch(ret => {
                return resolve({})
            })
        })
        .catch((err) => {
            client.query(
                q.Get(
                    q.Match(q.Index('search-by-' + key), value)
                )
            )
            .then((ret) => {
                return resolve(ret);
            })
            .catch(ret => {
                return resolve({})
            })
        })
    })
}
