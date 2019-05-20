define({ "api": [
  {
    "type": "post",
    "url": "/location/",
    "title": "",
    "name": "Post_Location",
    "description": "<p>Add the Location of the Session</p>",
    "group": "Location",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Location",
            "optional": false,
            "field": "Location",
            "description": "<p>Location of the Session</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "Error",
            "description": "<p>Error Unauthorized or Error Param not defined</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/location-routes.ts",
    "groupTitle": "Location",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/location/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/profiles/:username",
    "title": "",
    "name": "Get_profiles",
    "description": "<p>Get the profile of the username</p>",
    "group": "Profiles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Profile",
            "optional": false,
            "field": "Profile",
            "description": "<p>Profile of the Username</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "Error",
            "description": "<p>Username not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/profiles-routes.ts",
    "groupTitle": "Profiles",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/profiles/:username"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "",
    "name": "Get_User",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "Return",
            "description": "<p>the User</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "Error",
            "description": "<p>Username not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/user-routes.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/user/",
    "title": "",
    "name": "Put_User",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "User",
            "description": "<p>Return the User</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "String",
            "optional": false,
            "field": "Error",
            "description": "<p>Username not found</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "Error",
            "description": "<p>You must be logged in</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/user-routes.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/",
    "title": "",
    "name": "Create_new_user",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Users",
            "optional": false,
            "field": "Users",
            "description": "<p>The user has been created</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "Error",
            "description": "<p>Username not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/users-routes.ts",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "",
    "name": "Log_user",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Users",
            "optional": false,
            "field": "Users",
            "description": "<p>The user is logged in</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "Error",
            "description": "<p>Failed authentication</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/routes/users-routes.ts",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/users/login"
      }
    ]
  }
] });
