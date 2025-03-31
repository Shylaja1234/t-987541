
# E-commerce Backend Server

This is the backend server for the Lovable E-commerce application. It provides RESTful API endpoints for products, categories, and other e-commerce functionality.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   Or for development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Products

- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get a specific product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category by ID

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
```

## Running in Production

For production deployment, set the following environment variables:

```
NODE_ENV=production
PORT=<your-production-port>
```
