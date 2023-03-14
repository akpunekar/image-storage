This is a simple MERN (MongoDB, Express, React, Node.js) stack app that you can run on your local machine. Follow the instructions below to get started.  
#Prerequisites  
Before you can run this app, you will need to have the following installed on your local machine:  
Node.js  
MongoDB  
Installation  
Clone this repository to your local machine.  
Use bash to clone this repository.  
bash -> git clone https://github.com/akpunekar/image-storage.git  
Navigate to the root directory of the app.  
bash -> cd image-storage  
Install the dependencies   
bash -> npm install   
Install Client dependencies   
bash -> cd client && npm install   
Edit a example.env to .env file in the root directory and add the following variables with your own values:  
MONGODB_URI=<your-mongodb-uri>  
JWT_SECRET=<your-jwt-secret>  
    
Start the server and client while in root directory of the app.  
bash -> npm start  
Open a web browser and navigate to http://localhost:3000 to view the app.  
That's it! You should now be able to run the Image-Storage app on your local machine.  
