# MongoDB Test
Build a environment and test the basic function performance of MongoDB quickly.
1. Insert functions performance testing

----
## Prepare the Test Environment
Create a test environment by Docker Compose.

    # cd testenv
    # docker-compose up
Q: If you see the error "Error:....copying bootstrap data to pipe caused "write init-p: broken pipe"": unknown."
Ans: It might be linux kernal 3.x cannot run docker 18.06.x correctly, there are two solutions to fix the issue.
1.Upgrade linux kernul
2.Use another docker version, less than 18.06. In Ubuntu, you can run following command

    # apt-get install docker-ce=18.06.1~ce~3-0~ubuntu
If run docker-compose up success, you can check the container...

    # docker ps
    Check the "CONTAINER ID" field and run following command to enter the bash 
    # docker exec -ti "CONTAINER ID" bash
    # mango
    > show collections

## Usage
Here we use Node.js to run the performance testing. Af first, you should install the following software and package...
    
    # apt-get install nodejs
    # apt-get install npm
    # npm install mongodb --save

Run testing

    # nodejs insertTest.js
