# redis-clone
* A redis clone made using Node
* As of now it supports only 2 commands, GET and SET.

## Setup
- Clone all the files and then perform
```
npm install
```
## Working
- Start the server by running the following command
```
node index.js
```
- Run the client instance by connecting to the telnet server
```
telnet localhost 8888
```
- You'll see :
```
Trying ::1...
Connected to localhost.
Escape character is '^]'.
Welcome to the server!
```
#Commands
##SET
```
SET key value
```
- Response
```
Data Set
```
##GET
```
GET key
```
- Response
```
value
```
