<p align=center>
    <img src='./frontend/public/images/fetching-fashion-logo.png' alt='logo' width="250px">
    <h1 align=center>Fetching Fashion Co</h1>
    <h3 align=center>Get Your Paws on Fetching Fashion - The Bark of the Town!</h3>
    <p align=center>Your Furry Partner Deserves The Best</p>
</p>

## Introduction 
Welcome to our online store for dog lovers! This ecommerce website is designed specifically for those who are passionate about their furry friends and want to provide them with the best dog clothes available. Please note that this website is created for learning purposes only and is not a real website where you can purchase dog clothes. All transactions are conducted using the PayPal Sandbox, which is a testing environment that does not actually charge your credit card.

## Live Website
[No longer deployed](https://fetching-fashion.herokuapp.com/)

## Getting Started

To run this project on your local machine, you'll need to have the following installed:

- Node.js - you can download and install Node.js from https://nodejs.org
- Git - you can download and install Git from https://git-scm.com
- An IDE - preferably Visual Studio Code, which you can download and install from https://code.visualstudio.com/
- MongoDB (Community Server) from https://www.mongodb.com/try/download/community
- PayPal Developer Sandbox Account from [here](https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications&intent=developer&ctxId=uldc1d9feecfe54840970a4988484c045d)

## Instructions

1. Clone the repository using Git:

```
git clone https://github.com/noh24/fetching-fashion.git
```
2. In the backend subdirectory, create a `.env` file and add:

```
JWT_SECRET=your_super_secret_key
MONGODB_URI=your_mongodb_uri
PAYPAL_CLIENT_ID=your_paypal_client_id
```
### Replace:
 * your_super_secret_key with your own secret key for JWT authentication
 * your_mongodb_uri with your MongoDB connection string
 * your_paypal_client_id with your PayPal client ID.   

  
3. Install dependencies:

```
cd backend
npm install

cd ../frontend
npm install
```

4. Start the development server:

```
cd backend
npm start

cd ../frontend
npm start
```

5. Seed Data:
Go to http://localhost:1111/api/seed to seed the data.

6. Enjoy your shopping! 

## Running the tests

To run the automated tests for the frontend, run the following command:

```
cd frontend
npm run test
```

## Built With

This project was built using the following technologies:

- JavaScript
- React
- Node.js
- Express
- MongoDB
- PayPal API
- Heroku
- Tailwind CSS

## Known bugs

- The slideshow in the home page is not completely responsive to all screen sizes

## Planning and Research Log

- I am dedicating time to learn about MongoDb, a popular NoSQL database management system.
- To complement my understanding of MongoDb, I am also learning about Mongoose, Express, and Node, which are commonly used in conjunction with MongoDb.
- I am also delving into the world of API endpoints, specifically using Express Router, and exploring backend user verification with Express. 
- Finally, I am exploring the PayPal API, including creating endpoints, testing with the sandbox, and implementing checkout functionality.

## Acknowledgements

This project was inspired by and uses design images from the Shark Paw website.

## License

Copyright 2023 Brian Noh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
