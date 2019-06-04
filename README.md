# dinuti
projet de gestion du travailleur isolé

## Technical requirements

* Linting [medium]
* Unit testing via Travis CI [high]
* Docker images [high]
* Doc generation from code [medium]
* Swagger API [low]

## Architecture requirements 

* Backend must be stateless and scalable
* Frontend <-> Backend communication must be API based to allow multiple frontends (web desktop, mobile)

## Languages

## Docker

* Run
```docker-compose up --build -d```

* Stop
```docker-compose down```

* Front
```localhost:8080```

* Apidoc
```localhost:3000/doc```

## Branch name
us-{num-us}-task-{num task}

## Install
To launch the project in dev, you must clone the project on github and run commands: 
on the front you have to run the commands "npm install" and "ng serve"
on the back you have to run the commands "npm install" and "npm run dev" 

## Dev
The application is under development. Stories are tracked through tasks that are independent of each other.

## Architecture documentation
It is made for the front and back, and both are connected.
For the back, it is with Angular2.0 and for the back it is the Node with the different associated libraries

## Features
The application that is being developed proposes to an isolated user to alert the guard or security guards in the event of any problem. We have set up a kind of agenda that triggers an alert after 5 minutes without a signal from the front to the back

## Postman
Postman makes API development faster, easier, and better. The free app is used by more than 3.5 million developers and 30,000 companies worldwide. Postman is designed with the developer in mind, and packed with features and options. In the case of this project, it allows to test to see the user who is connected and especially the session that is opened at a given moment 

## API doc

## Docker
The commands above explain how to launch a docker which is of paramount importance in this project because it allows deployment in different environments

