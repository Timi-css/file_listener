# Getting Started

## Prerequsites
* Node.js: Ensure you have Node.js installed on your machine. You can download it from nodejs.org
* NPM: Node Package Manager is installed automatically with Node.js

## Installation
1. Clone the Repository
2. Install all the packages - npm install
3. Set up the necessary environment variables 
        EMAIL_USER=your_email_username
        EMAIL_PASS=your_email_password
        EMAIL_SERVICE=smtp.mailtrap.io or your desired email server
        RECEIVER_EMAIL=recipient@example.com
        WATCH_FOLDER=/path/to/your/watched/folder
        ALLOWED_FILE_TYPE=your desired file types
        PORT=your desired port 

## Running the Application
1. Start the server: npm run start(uses nodemon)
2. API Endpoints: 
* Start File Watcher: 'POST /api/start'
* Stop File Watcher: 'POST /api/stop'
* Check Status: 'GET /api/status'
* View Logs: 'GET /api/logs'

## Usage
1. Start the File Watcher: Use the POST /api/start endpoint to begin monitoring the specified folder.
2. Stop the File Watcher: Use the POST /api/stop endpoint to stop monitoring the folder.
3. Check Status: Use the GET /api/status endpoint to check if the file watcher is running or stopped.
4. View Logs: Use the GET /api/logs endpoint to retrieve the log file content.


## Logging
Logs are stored in a file named app.log within the watched folder. It captures the following:

* INFO: General information about the file watcher’s operation.
* WARN: Warnings, such as potential issues.
* ERROR: Any errors encountered during operation.

## Deployment

* The application can be deployed on any platform that supports Node.js, such as Heroku, AWS, or Vercel (for serverless deployment).

## Future Enhancements
* Websockets Support: Real-time updates for frontend clients
* Advanced Logging: Log rotation and external log management integration
* Frontend Integration: A React or Next.js frontedn to control and monitor the file watcher. Possibly a dashboard

## Contributing
Please feel free to fork this project, create a branch, make your changes, and submit a pull request. Contributions are greatly appreciated

## License
This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE) file for details.

