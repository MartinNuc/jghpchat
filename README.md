# Jghphhhf chat
This is simple chat in [angular.js](https://angularjs.org/) on client and [node.js](https://nodejs.org/) on server. Realtime communication is using [Socket.io](http://socket.io/).

Messages are stored in [MongoDB](https://www.mongodb.org/) to provide message history.

When you clone repo you have to download dependent libraries for server:

```
cd server
npm install
```

And for client:

```
cd client/js
bower install
```

Then start node server:

```
node server/server.js
```

And open brower URL [http://localhost:3000/chat](http://localhost:3000/chat)

You may specify nickname in url param like this: [http://localhost:3000/chat?username=Xutaran](http://localhost:3000/chat?username=Xutaran)