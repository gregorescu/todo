var express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

var mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const password = encodeURIComponent("entR#h37*7Dr");
console.log(password);
const uri = `mongodb+srv://mongoAdmin:${password}@cluster0-qvnut.mongodb.net/todos?retryWrites=true&w=majority`;
const databaseClient = new MongoClient(uri);


app.listen(3000, () => {
    databaseClient.connect();
});


async function getLists() {
    try {
        let todosLists = await databaseClient.db("todos").collection("lists").find();
        let array = await todosLists.toArray();

        let returnedArray = {};

        for (let i = 0; i < array.length; i++) {
            let arrayItem = array[i];
            returnedArray[arrayItem.id] = {
                id: arrayItem.id,
                list: arrayItem.list
            }
        }

        return returnedArray;
    } catch (e) {
        return e.message;
    }
}

async function addTaskToList(listId, newTask) {
    try {
        let todosLists = await databaseClient.db("todos").collection("lists").updateOne({
            "id": listId
        }, {
            "$push": {
                "list": newTask
            }
        })

        return true;
    } catch (e) {
        return e.message;
    }
}

async function removeTaskFromList(listId, taskId) {
    try {
        let todosLists = await databaseClient.db("todos").collection("lists").updateOne({
            "id": listId
        }, {
            "$pull": {
                "list": {
                    "id": taskId
                }
            }
        })

        return true;
    } catch (e) {
        return e.message;
    }
}

async function updateTaskFromList(listId, taskId, newTask) {
    try {
        let todosLists = await databaseClient.db("todos").collection("lists").updateOne({
            "id": listId,
            "list.id": taskId
        }, {
            "$set": {
                "list.$.name": newTask["name"],
                "list.$.status": newTask["status"]
            }
        })

        return true;
    } catch (e) {
        return e.message;
    }
}

app.get("/lists", async (req, res) => {
    var result = await getLists();
    res.send(result);
});

app.post("/lists/:listId", async (req, res) => {
    var result = await addTaskToList(req.params.listId, req.body);
    res.send(result);
})

app.put("/lists/:listId/:taskId", async (req, res) => {
    var result = await updateTaskFromList(req.params.listId, req.params.taskId, req.body)
    res.send(result);
})

app.delete("/lists/:listId/:taskId", async (req, res) => {
    var result = await removeTaskFromList(req.params.listId, req.params.taskId)
    res.send(result);
})