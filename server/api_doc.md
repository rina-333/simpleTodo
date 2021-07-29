# My Todos App Server
My Todos App is an application to manage your daily task or something to do and manage your time in fun way. This app has :
* RESTfull endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTfull endpoints
### GET /todos

> Get all todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response(200)_
```
{
  "id": <given by system>
  "title": "<posted title>"
  "description": "<posted description>"
  "status": "<posted status>"
  "due_date": "<posted due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

### POST /todos/:id
> Post create todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title of todo to get insert into>"
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response(201)_
```
{
  "id": <given by system>
  "title": "<posted title>"
  "description": "<posted description>"
  "status": "<posted status>"
  "due_date": "<posted due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

### PATCH /todos/:id

> Update/modify todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status": "<status to get insert into>"
}
```

_Response(200)_
```
{
  "id": <given by system>
  "title": "<posted title>"
  "description": "<posted description>"
  "status": "<posted status>"
  "due_date": "<posted due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

### PUT /todos/:id

> Update/replace todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title of todo to get insert into>"
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response(200)_
```
{
  "id": <given by system>
  "title": "<posted title>"
  "description": "<posted description>"
  "status": "<posted status>"
  "due_date": "<posted due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

### DELETE /todos/:id

> Delete todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": "<id to delete into>"
}
```

_Response(200)_
```
{
  "message": "Succesfully Deleted"
}
```

_Response (405 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

### POST /register

> Register user

_Request Header_
```
no need
```

_Request Body_
```
{
  "username": "<username of user to get insert into>"
  "email": "<email user to get insert into>"
  "password": "<password of user to get insert into>"
}
```

_Response(201)_
```
{
  "id": "<id given by system>"
  "username": "<posted username>"
  "email": "<posted email user>"
  "password": "<posted password of user>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

### GET /login

> Login user

_Request Header_
```
no need
```

_Request Body_
```
{
  "email": "<email user to get insert into>"
  "password": "<password of user to get insert into>"
}
```

_Response(200)_
```
{
  "id": "<id given by system>"
  "jasonwebtoken": "<posted token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "invalid email or password"
}
```
---
