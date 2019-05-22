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
