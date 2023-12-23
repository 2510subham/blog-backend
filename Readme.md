## Blog Api CRUD with User authentication 

1) clone the repo and run npm install
2) npm start

# Tech stack used

1) MongoDB as DB,Express to set up the server

# Routes

1) to check the setup ,run "/ping"

## Auth Routes

1) POST -> /api/auth/register -> give email,password parameter in body

2) POST -> /api/auth/login -> give email,password parameter in body 

# Blog Routes

1) GET -> /api/blog -> to read all the blogs
2) POST -> /api/blog/create -> to create the new blog 
3) PUT -> /api/blog/update/:id -> to update particular the blog
4) DELETe -> /api/blog/delete/:id -> to delete the particular blog

# Logging

created logging feature using **winston** 
