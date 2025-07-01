# TaskTracker

A full-stack task and event management system built with .NET Core and Angular.

## Features

- User authentication with hashed passwords
- CRUD operations for tasks and events
- Light/dark theme toggle
- Modular component-based architecture

## Tech Stack

- Frontend: Angular
- Backend: .NET Core Web API (C#)
- Storage: JSON/in-memory database

## Getting Started

### Backend Setup
cd server/TaskAPI  
dotnet build  
dotnet run

### Frontend Setup
cd client  
npm install  
ng serve

### API Testing
Use the `TaskTracker.http` file in the backend root to explore available endpoints.

## Project Structure

- Model/ - Entity classes and repository interfaces
- Controllers/ - API endpoints
- Helpers/ - Utility functions (e.g., password hashing)
- client/src/app/ - Angular component structure

## Notes

This was an early full-stack project and may lack production-level polish. Clean-up and refactoring in progress.

## Author

Thomas Haile — GitHub: @thomasih
