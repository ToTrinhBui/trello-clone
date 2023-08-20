# Trello Clone Project

This is a Trello clone project built using React for the frontend and json-server for the backend. The project based on some of the core features of Trello, a popular project management tool.

## Features

- Multiple login options: account, Google, and Facebook.
- Create, edit, and delete boards.
- Add, edit, and delete lists within boards.
- Manage tasks/cards within lists.
- Drag and drop functionality to rearrange tasks and lists.
- Light and dark mode for personalized user experience.
- Share boards with team members for collaborative work.
- Real-time updates using WebSocket to keep boards synchronized across users.

## Getting Started

To run this project on your local machine, follow these steps:

### Prerequisites

To run, ensure that you have the following software installed on your system:
    
> Node.js (version compatible with React 18)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/trello-clone.git
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the JSON server for the backend:

   ```bash
   node server.js
   ```

   The `db.json` file contains sample data for the backend.

2. In a new terminal window, start the frontend:

   ```bash
    npm start
   ```

   This will launch the frontend application in your default web browser.

**Note:** This project is developed for learning purposes.

