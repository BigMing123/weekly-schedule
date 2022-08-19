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
