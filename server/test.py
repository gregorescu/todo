# import pymongo;
# connection = pymongo.MongoClient()

import pymongo

# connection = pymongo.MongoClient()
from flask import Flask, request, make_response, jsonify
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# cors = CORS(app, resources={r"/lists/*": {"origins": "*"}})
# cors = CORS(app, resources={
#     r"/*": {
#        "origins": "*"
#     }
# })
CORS(app, resources=r'/*')
app.config['CORS_HEADERS'] = 'Content-Type, Access-Control-Allow-Origin'
app.config["DEBUG"] = True

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   return response

# todosResult = json.loads(x)
client = pymongo.MongoClient("mongodb+srv://mongoAdmin:<pass>@cluster0-qvnut.mongodb.net/todos?retryWrites=true&w=majority")
db = client.todos

@app.route('/lists', methods=['GET'])
def getTodos():
    formatedCollection = {}
    for result in db.lists.find():
        formatedCollection[result["id"]] = {
            "id": result["id"],
            "list": result["list"]
        }

    return formatedCollection

# @app.route('/lists', methods=['OPTIONS', 'POST'])
# @cross_origin(origin='*', allow_headers=['Content-Type', 'Access-Control-Allow-Origin'])
# # @cross_origin(origin='http://localhost:4200',headers=['Content- Type'])
# def addToList(list):
#     response = flask.jsonify({'some': 'data'})
#     return response\

def addTaskToList(listId, task):
    formatedTask = json.loads(json.dumps(task))
    db.lists.update_one(
        { "id": listId },
        { "$push": { "list": formatedTask } }
    )
    return ''

@app.route('/lists/<listId>', methods=['POST'])
def addToList(listId):
        resp = make_response(addTaskToList(listId, request.json))
        resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        resp.headers['Access-Control-Allow-Methods'] = '*'
        resp.headers['Access-Control-Allow-Domain'] = '*'
        resp.headers['Access-Control-Allow-Credentials'] = True
        
        return resp

@app.route('/lists/<listId>', methods=['OPTIONS'])
def preflight():
        resp = make_response("OK")
        resp.status_code = 201
        resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        resp.headers['Access-Control-Allow-Methods'] = '*'
        resp.headers['Access-Control-Allow-Domain'] = '*'
        resp.headers['Access-Control-Allow-Credentials'] = True
        # Debug
        print("Right")
        return resp

# def updateTaskInList(listId, taskId, newTask):
#     formatedTask = json.loads(json.dumps(newTask))
#     taskList = todosResult[listId]["list"]
#     index = -1
#     counter = 0

#     for task in taskList:
#         if task["id"] == taskId:
#             index = counter
#             pass
#         counter += 1
#         pass

#     taskList[index] = formatedTask
#     return ''


# @app.route('/lists/<listId>/<taskId>', methods=['PUT'])
# def updateTask(listId, taskId):
#         resp = make_response(updateTaskInList(listId, taskId, request.json))
#         resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
#         resp.headers['Access-Control-Allow-Methods'] = '*'
#         resp.headers['Access-Control-Allow-Domain'] = '*'
#         resp.headers['Access-Control-Allow-Credentials'] = True
        
#         return resp

# def deleteTaskFromList(listId, taskId):
#     taskList = todosResult[listId]["list"]
#     index = -1
#     counter = 0

#     for task in taskList:
#         if task["id"] == taskId:
#             index = counter
#             pass
#         counter += 1
#         pass

#     taskList.pop(index)
#     return ''

# @app.route('/lists/<listId>/<taskId>', methods=['DELETE'])
# def deleteTask(listId, taskId):
#         resp = make_response(deleteTaskFromList(listId, taskId))
#         resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
#         resp.headers['Access-Control-Allow-Methods'] = '*'
#         resp.headers['Access-Control-Allow-Domain'] = '*'
#         resp.headers['Access-Control-Allow-Credentials'] = True
        
#         return resp
app.run()