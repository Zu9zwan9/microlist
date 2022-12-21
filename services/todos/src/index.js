const express = require('express');
const app = express();
fs = require('fs')
var bodyParser = require('body-parser')
const {initializeApp, applicationDefault, cert} = require('firebase-admin/app');
const {getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');
const {credential} = require("firebase-admin");
const serviceAccount = require('../serviceAccountKey.json');
app.use(express.urlencoded());
app.use(express.json());

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
const port = 8080;

app.get('/api/todos/ping', (req, res) => {
    res.send('TODO service');
});

app.post('/api/todos/save-item', async (req, res) => {
    const item = req.body.item;

    let result;
    try {
        const snapshot = await db.collection('items').add(item);
        item["id"] = snapshot.id;
        result = {"result": "Success", item};
    } catch (e) {
        result = {"result": "Database is offline. Will retry later"};
    }

    res.send(result);
});

app.get('/api/todos/get-items', async (req, res) => {
    const result = [];
    const snapshot = await db.collection('items').get();
    snapshot.forEach(data => {
        const d = data.data();
        d["id"] = data.id;
        result.push(d);
    });
    console.log(snapshot);
    res.send({"messages": result});
})

app.post('/api/todos/update', async (req, res) => {
    const itemId = req.body.itemId;
    const completed = req.body.completed;
    const title = req.body.title;
    console.log(completed, itemId)

    let result;
    try {
        const value = {};
        if (completed !== undefined) {
            value["completed"] = completed;
        }
        if (title !== undefined) {
            value["title"] = title;
        }
        await db.collection('items').doc(itemId).set(value, {merge: true});
        result = {"result": "Saved"};
    } catch (e) {
        result = {"result": "Database is offline. Will retry later " + e};
    }

    res.send(result);
})

app.post('/api/todos/delete', async (req, res) => {
    const itemId = req.body.itemId;
    console.log(itemId)

    let result;
    try {
        await db.collection('items').doc(itemId).delete();
        result = {"result": "Saved"};
    } catch (e) {
        result = {"result": "Database is offline. Will retry later " + e};
    }

    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});


// curl -X POST -H "Content-Type: application/json" -d "{  \"item\": {    \"title\": \"Do this\", \"completed\": false   }}" localhost/api/todos/save-item
// curl -X POST -H "Content-Type: application/json" -d "{  \"itemId\": \"9Skf0z5O3MhS08UyGrGA\", \"completed\": true   }" localhost/api/todos/update
// curl -X POST -H "Content-Type: application/json" -d "{  \"itemId\": \"9Skf0z5O3MhS08UyGrGA\",   \"title\": \"New title 2\"  }" localhost/api/todos/update
// curl -X POST -H "Content-Type: application/json" -d "{  \"itemId\": \"9Skf0z5O3MhS08UyGrGA\",  \"title\": \"New title\", \"completed\": true   }" localhost/api/todos/update
// curl -X POST -H "Content-Type: application/json" -d "{  \"itemId\": \"9Skf0z5O3MhS08UyGrGA\"  }" localhost/api/todos/delete
// curl -X GET localhost/api/todos/get-items


