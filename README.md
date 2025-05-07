# Task and User Management System

A full-stack application for managing users and tasks with role-based access control.

## 🔧 Tech Stack

   - **Backend:** ASP.NET Core 6+, Entity Framework Core, In-Memory DB
   - **Frontend:** Angular 15+, Angular Material
   - **Authentication:** JWT with Role-based Authorization

## 📦 Features

  - Admin/User roles with restricted access
  - CRUD for users and tasks
  - Angular Material UI with responsive layout
  - Login authentication with token storage
  - Task status updates for users
  - Error handling and validation
  - Swagger API docs
  - Unit testing for backend and frontend

## 🚀 Getting Started


   ### Database

    1- run sql command (Database.txt) to generate new database with tables and demo data.

   ### Backend (.NET)

    1- edit ConnectionStrings in  TaskManagerAPI => appsettings.json In accordance with your sql credentials.
    2- run TaskManagerAPI and get the url to set it in angular project environment.


   ### Frontend (Angular)

    1- open TaskManagerWeb location from cmd and run (npm i)  for get all packages.
    2- change APIURL in src => environments => environment.ts  ex:(https://localhost:7023/api/) .
    3- open TaskManagerWeb location from cmd and run (ng serve --o).

   ### UnitTest

    1- open Package manager Console and select Default project : TaskManager.Test and run  : dotnet test

