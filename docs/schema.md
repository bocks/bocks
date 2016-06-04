# Schema

## Table BocksSchema

### userName: String

* Source: server.js (passport auth)
* Used by: server/bocksController.js
* Description: GitHub username

### title: String

* Source: snippet.html (user form)
* Used by: server/bocksController.js
* Description: title, input by user

### code: String

* Source: snippet.html (editor)
* Used by: server/bocksController.js
* Description: code from editor, input by user

### highlights: Array

* Source: snippet.html (editor)
* Used by: server/bocksController.js
* Description: array of objects, stores highlight start/end and related annotation

### isPrivate: Boolean

* Source: snippet.html (user form)
* Used by: server/bocksController.js
* Description: indicates whether the snippet should be private to its author. user checkbox

### createdAt: Date

* Source: bocksModel.js
* Used by: 
* Description: timestamp on creation

### modifiedAt: Date

* Source: bocksModel.js, server.js
* Used by: server/bocksController.js
* Description: timestamp on modification. updated by server.js on put request
