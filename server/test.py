import pymongo
import os
from flask import Flask, request, make_response, jsonify
import json
import uuid
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources=r'/*')
app.config['CORS_HEADERS'] = 'Content-Type, Access-Control-Allow-Origin'
app.config["DEBUG"] = True

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
json_url = os.path.join(SITE_ROOT, "", "database-config.json")
config = json.load(open(json_url))

client = pymongo.MongoClient("mongodb+srv://" + config["user"] + ":" + config["password"] + "@cluster0-qvnut.mongodb.net/" + config["database"] + "?retryWrites=true&w=majority")
db = client[config["database"]]

# GET
@app.route('/lists', methods=['GET'])
def getTodos():
    formatedCollection = {}
    for result in db.lists.find():
        formatedCollection[result["id"]] = {
            "id": result["id"],
            "list": result["list"]
        }

    return formatedCollection

# POST
def addTaskToList(listId, task):
    formatedTask = json.loads(json.dumps(task))
    formatedTask["id"] = str(uuid.uuid4())

    db.lists.update_one(
        { "id": listId },
        { "$push": { "list": formatedTask } }
    )
    return formatedTask

@app.route('/lists/<listId>', methods=['POST'])
def addToList(listId):
        resp = make_response(addTaskToList(listId, request.json))
        return resp

# PUT
def updateTaskInList(listId, taskId, newTask):
    db.lists.update_one(
        { "id": listId, "list.id": taskId },
        { "$set": { "list.$.name": newTask["name"], "list.$.status": newTask["status"] }}
    )
    return ''


@app.route('/lists/<listId>/<taskId>', methods=['PUT'])
def updateTask(listId, taskId):
        resp = make_response(updateTaskInList(listId, taskId, request.json))
        return resp

# DELETE
def deleteTaskFromList(listId, taskId):
    db.lists.update_one(
        { "id": listId },
        { "$pull": { "list": { "id": taskId } } }
    )

    return ''

@app.route('/lists/<listId>/<taskId>', methods=['DELETE'])
def deleteTask(listId, taskId):
    resp = make_response(deleteTaskFromList(listId, taskId))
    
    return resp
app.run()