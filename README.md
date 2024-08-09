# E-Commerce Project

**Student Name**:Prabhjot Kaur
**Student Number**: 8963796
**Date**: 21-07-2024

### Technology Stack

**Frontend**: ReactJS  
**Backend**: Node.js 
**Database**: MongoDB (Atlas)

### Project Setup

1. **Project Initialization**: Repository created.
2. **Frontend Setup**: ReactJS project created.
3. **Backend Setup**: NodeJS project created.

### Admin username and password 
username: admin
password: admin

### Database Schema Design

#### Product Schema
- `name`: String (required)
- `description`: String
- `price`: Number (required)
- `imageUrl`: String
- `category`: String

#### Order Schema
- `userName`:String (required)
- `totalPrice`: Number (required)
- `address`: String (required)

#### OrderItem Schema
- `orderId`: ObjectId (ref: 'Order', required)
- `productId`: ObjectId (ref: 'ProductS', required)
- `quantity`: Number (required)
- `price`: Number (required)

### Notes

- The project is set up on the local machine and uploaded to GitHub.
- Development is started.
- Product page completed
- Added Navbar 
- added API to get product by id
- Implemented product details on frontend
- Implemented cart 
- implemented buy and checkout
- implemented admin dashboard
