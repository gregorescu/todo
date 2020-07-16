const {
  v4: uuidv4
} = require('uuid');
var express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use(session({secret:'XASDASDA'}));

var mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const password = encodeURIComponent("entR#h37*7Dr");
const uri = `mongodb+srv://mongoAdmin:${password}@cluster0-qvnut.mongodb.net/todos?retryWrites=true&w=majority`;
const databaseClient = new MongoClient(uri);

var sess; // global session, NOT recommended

app.listen(3000, () => {
  databaseClient.connect();
});

// app.get("/", (req, res) => {
//   sess = req.session;
//   if (sess.email && sess.visits) {
//     console.log("logat");
//     sess.visits++;
//   } else {
//     sess.visits = 1;
//   }

//   res.send();
// });

app.post("/login", (req, res) => {
  console.log("intra aici");

  req.session.email = req.body.email;
  req.session.visits = 1;

  console.log(req.sessionID);
  res.end()
});

app.get("/lists", async (req, res) => {
  var result = await getLists();
  res.send(result);
})


function checkSession(req) {
    console.log("----------------------------------------------");
    var session = req.session;

    console.log(session);
    console.log(session.email);
    console.log(session.visits);
    console.log(req.sessionID);
  console.log("----------------------------------------------");

return;
  console.log(req.email);

  for (let i = 0; i < sessions.length; i++) {
    let savedSession = sessions[i];

    if (savedSession.email == req.session.email) {
      console.log("exista", savedSession.email);
    } else {
      console.log("nu exista", savedSession.email);
    }
  }

  console.log("==============================");
  console.log(sessions);
}

app.post("/lists/:listId", async (req, res) => {
  checkSession(req);

  var result = await addTaskToList(req.params.listId, req.body);
  res.send(result);
})

app.put("/lists/:listId/:taskId", async (req, res) => {
  checkSession(req);

  var result = await updateTaskFromList(req.params.listId, req.params.taskId, req.body)
  res.send(result);
})

app.delete("/lists/:listId/:taskId", async (req, res) => {
  checkSession(req);

  var result = await removeTaskFromList(req.params.listId, req.params.taskId)
  res.send(result);
})


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

var sessions = [];

// app.post("/login", (req, res) => {
//   let sess = req.session;
//   sess.email = req.body.email;

//   sessions.push(sess);

//   res.send();
//   res.end('done');
// });
