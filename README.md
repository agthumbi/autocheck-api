![AutoCheck Africa](https://media.autochek.africa/file/publicAssets/full-color-logo-new.png)

# Autocheck API
Autocheck calls talks to a public API of HackerNews.

# Autocheck Rest API Coding Challenge
In this assignment, we’ll be asking you to build a small app that talks to a public API of
HackerNews. On the following page you’ll find the documentation:

https://github.com/HackerNews/API
Your app should have three endpoints:
1. Top 10 most occurring words in the titles of the last 25 stories
2. Top 10 most occurring words in the titles of the post of exactly the last week
3. Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma
Languages and Frameworks
This task should be completed using
● NestJs Framework with emphasis on Typescript.
It's up to you what the endpoints look like and how exactly the response is returned (we do expect the latter

## Steps
   

## PART I: Download & Build on local

#### 1) Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/agthumbi/autocheck-api.git
cd autocheck-api
npm install
npm start
```


#### 2)Open your local browser and verify is working by accessing: 

#Landin page
```
http://localhost:3000/  

```


**Note**

Make sure you dont have another port ::3000 running to avoid conflict issues.

#### 3) Dependencies

##### Node Installation
You will need to install Node and npm  on your operating system.Recommended,you can use node  14 and above.
Here is the download link below for your reference.You should follow the instructions on how install node and npm
on their web page.

```
https://nodejs.org/en/blog/release/v14.17.3/

```


## PART II : Download & Build on Jenkins to Docker Container

#### 1) You will need to install jenkins on your server.
Here is the download link below for your reference.You should follow the instructions.

```
https://www.jenkins.io/doc/book/installing/ 

```

#### 2) Running the Docker containers

Now that we have defined our Docker files, we can run our app solely on Docker.

To start our app, write the following command in your terminal:

``` 
docker-compose up dev

```
This will start it in development mode. We even get a file watcher when saving our files so we don't have to re-run it every time we make change 😍.

And to start our app in production mode, you guessed it... run the following command in your terminal:

``` 
docker-compose up prod

```
Make a GET request yet again to http://localhost:3000 and... voilà! Should work as expected.

P.S: If you want to ditch the terminal logging, you can run the container in a separate daemon using the -d flag like so:

``` 
docker-compose up -d prod

```

#### 3) Create config on jenkins for pipeline readiness
Please follow the link for more details

```
https://medium.com/swlh/setup-a-ci-cd-pipeline-to-automate-react-app-deployment-on-aws-ec2-82bd0c194f77

```


## PART III : Consume APIs

### Feature

- Restful routings
- Restful error handling
- Security Authentication
    
#### Consumer using VS Code

You can look for requests.http file under src folder to know what to consume


### Authentication

In order to do authentication you will be required to send the following HTTP headers parameters as part of your requests:

- Timestamp
- Nonce
- Signature

All fields are required except otherwise stated.

#### HTTP Headers for Authentication

The following describes the important headers required to be sent.

Headers        | Description 
:--------------|:------------------------------------------------------------------------------------------
Authorization  | This is in form bearer token that is generated ftom jwt token during user login              
   
Content-Type   | The MIME type of the body of the request e.g. application/json  

#### Sample Authentication Headers

` Content-Type:application/json `

` Authorizaiton:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY2MjIxMjczNywiZXhwIjoxNjYyMjEyNzk3fQ.ylqF3ObPyrulwcqClPMb3Okm62F4UosArq00NJBnppI `




### Welcome Page

This endpoint is for accessing the landing page

#### Expected Request 

` GET http://{{host}}/ `

Parameter       | Description 
:---------------|:------------------------------------------------------------------------------------------
host            | Base URL

##### Payload
      ` None



#### Excpected Response 

`Welcome to Autocheck api `



##### Excpected Response for non-existing checkout cart

` {
  "statusCode": 401,
  "message": "Unauthorized"
`}

### Reponse Codes

Code            | Description Message 
:---------------|:------------------------------------------------------------------------------------------
0               | Success
1               | No Record returned

 


## PART III : Overal System Design

### Feature 

- General Flow Design
- System Design by exploring dockers
- System Design using kubernetes

#### General Flow Design

![Autocheck](https://github.com/agthumbi/paystack/blob/main/system_design/general_flow.PNG)

##### Process Flow

 1. Request comes over external nextwork.
 2. Server recieves the request and pass it on to load balancer.Kindly note,load balancer with layer 7 will assist in routing
 to a particular server or microservices inside the server to allow partitioning request handling.
 3. Load balancer will send the request to a server that is handling API calls of which has less workload or to the one that is idle
 4. API routing will then decide which microservices should handle such requests,but it has to pass through security check on security micro services
 5. Microservice will respond back with response either its an obvious call which it will just pick from caching tool or complex request that has to visit the database.

#### System Design by exploring dockers

![Autocheck](https://github.com/agthumbi/paystack/blob/main/system_design/design_flow_kubernetes.PNG)

Above design is improving more on workload by introducing kubernetes ecosystem.


#### System Design using kubernetes

![Autocheck](https://github.com/agthumbi/paystack/blob/main/system_design/flow_design_rabbit.PNG)

We can also improve more on the design by including queue tools such as rabbit m queue to hanldle many requests from external nextwork


## PART IV : MORE ON OPTIMIZATION

### Feature 
- Database
- Load Balancer
- CDN
- Servers

#### Databse

There are various ways of optimizing the database bit
 - Indexing
 - Shading
 - Replication
 - Data redundancy


##### Table Indexing
 
 You can index tables on the search criteria such as on where clause.You can also index the most current data by use of configuring the primary identifier to return data in ascending order.
 
##### Shading

Another way to scale databse is through horizontal shading.We can have different servers with database installed into it to improve performance and optimization.We can have like 4 or more servers each handling different unique tables.Alternatively,you can also use similar table structure but have records that are stored alphabetically e.g users with last name state from  A-G ,H-M,N-T and so on.

##### Data redundancy

We can also introduce data redundancy by having the necessay records in one table instead of joining mulitple tables to increase performance.

##### Data Replication/Databse mirroring

We can free the read load on data by having mirroring data to secondary databses.This can be achived by replicating the main transactional databse to 2 or similar structural databses.We write on the transactional database and red on secondary databses.This will improve performance and reduce overload of one particular database hadnling heavy requests.


#### Load Balancer

We can increase the amount of load balancer to handle heavy load of requests coming from external network.Through layer 7 type,we can re-routing all the traffic to the respective server which has the micro service or has the a certain kubernetes that will route to a particular dockernized microservice.


#### Server

We can add on to many servers which are sufficient and have adequate enough power.Each server can have docker containers, or servers that are clustered,or have each server handling each microservies requests.


## CONCLUSION

Sharing workload explained above will assist in overal performance of the shopping cart system cooping with the demand requests and customer will be happy to use it at long run.

The best way to achieve to achieve all this, mainly is by horizontal scaling from database to servers.










