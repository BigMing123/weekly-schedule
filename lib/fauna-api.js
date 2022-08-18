const faunadb = window.faunadb;
const q = faunadb.query;
const client = new faunadb.Client({
    secret: 'fnAEuSVyeiACVDsAHVqZ11gAA3QQcWTrtpu6MaFO',
    domain: 'db.fauna.com', // Adjust if you are using Region Groups
});

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

async function faunaGetEvents() {
    let events = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('weekly-schedule'))),
            q.Lambda(x => q.Get(x))
        )
    )
    return events.data;
}

function faunaDeleteEvent(refid) {
    client.query(
        q.Delete(q.Ref(q.Collection('weekly-schedule'), refid))
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
    ))
}

function faunaFindItemByValue(key, value) {
    client.query(
        q.CreateIndex({
            name: "search-by-" + key,
            source: q.Collection("weekly-schedule"),
            terms: [ { field: ["data", key] } ],
            unique: true // id are unique
        })
    )
    .then((ret) => {
        client.query(
            q.Get(
                q.Match(q.Index('search-by' + key), value)
            )
        )
        .then((ret) => console.log(ret))
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
    })
    .catch((err) => console.error(
        client.query(
            q.Get(
                q.Match(q.Index('search-by' + key), value)
            )
        )
        .then((ret) => console.log(ret))
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
    ))
}
