1) Run RabbitMQ in Docker:
$ docker run -d -p 5672:5672 rabbitmq

2) Run from terminal:
npm i or npm install

3) run gateway.js and microservice.js
from terminal (VS Code): 
node gateway
node microservice

4) use postman or web browser for get requests
For multiply:
http://localhost:3000/multi?n1=2&n2=3
for substraction:
http://localhost:3000/sub?n1=2&n2=3
for sum:
http://localhost:3000/sum?n1=2&n2=3

5) results are saving in local storage as cache (cacheData)

6) validation for 2 numbers only 

7) when send request, microservice check in cache for results, if no result, microservice make operation and send to local storage the result with full data: 2 numbers, action and result.






