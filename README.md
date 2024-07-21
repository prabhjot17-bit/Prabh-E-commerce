# E-Commerce Project

**Student Name**:Prabhjot Kaur
**Student Number**: 
**Date**: 21-07-2024

### Technology Stack

**Frontend**: ReactJS  
**Backend**: Node.js 
**Database**: MongoDB (Atlas)

### Project Setup

1. **Project Initialization**: Repository created.
2. **Frontend Setup**: Will initialize ReactJS project.
3. **Backend Setup**: I will initialize Node.js project with Express and connected to MongoDB (Atlas).
### Database Schema Design

#### User Schema
- `username`: String (required, unique)
- `password`: String (required)
- `email`: String (required, unique)
- `isAdmin`: Boolean (default: false)

#### Product Schema
- `name`: String (required)
- `description`: String
- `price`: Number (required)
- `imageUrl`: String

#### Order Schema
- `userId`: ObjectId (ref: 'User', required)
- `totalPrice`: Number (required)
- `address`: String (required)
- `orderItemId`: ObjectId (ref: 'OrderItem', required)

#### OrderItem Schema
- `orderId`: ObjectId (ref: 'Order', required)
- `productId`: ObjectId (ref: 'Product', required)
- `quantity`: Number (required)
- `price`: Number (required)

### Notes

- The project is set up on the local machine and uploaded to GitHub.
- Development will start in the next phase.
