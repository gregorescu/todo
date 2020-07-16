import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get("http://localhost:3000/lists");
  }  

  addToList(listId, newTask) {
    return this.http.post(`http://localhost:3000/lists/${listId}`, newTask);
  }  

  removeFromList(listId, taskId) {
    return this.http.delete(`http://localhost:3000/lists/${listId}/${taskId}`);
  }  

  updateTaskInList(listId, taskId, newTask) {
    return this.http.put(`http://localhost:3000/lists/${listId}/${taskId}`, newTask);
  }  
}