# API Testing Examples

Contoh request untuk testing API endpoints.

## Users API

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

### Create New User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123",
    "fullName": "New User"
  }'
```

## Posts API

### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

### Create New Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "content": "This is the content of my new post.",
    "userId": 1,
    "isPublished": true
  }'
```

## Categories API

### Get All Categories
```bash
curl http://localhost:3000/api/categories
```

### Create New Category
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Travel",
    "description": "Travel related posts"
  }'
```

## Using HTTPie (Alternative)

Install HTTPie: `brew install httpie` (Mac) or `pip install httpie`

### Get Users
```bash
http GET http://localhost:3000/api/users
```

### Create User
```bash
http POST http://localhost:3000/api/users \
  username=testuser \
  email=test@example.com \
  password=password123 \
  fullName="Test User"
```

## Using JavaScript (fetch)

```javascript
// Get all users
fetch('http://localhost:3000/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// Create new user
fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'jsuser',
    email: 'js@example.com',
    password: 'password123',
    fullName: 'JavaScript User'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```
