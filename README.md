#Setup
- npm i
- npm i -g json-server

#Start
- npm run serve

#or
 
- json-server -H localhost -w labelsDB.json -p 8080
- open new terminal
- npm start

###broadcast to WLAN
   in package.json -> scripts -> serve
   and in src/api.ts -> URI
   change "localhost" to your local IP

- npm run serve
