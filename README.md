# final-project-nodeJS-server-side

1. User registration (Sign-Up):
Method: POST
URL: http://localhost:5200/api/auth/register
2. User login (Sign-In):
Method: POST
URL: http://localhost:5200/api/auth/login
3. Get user details:
Method: GET
URL: http://localhost:5200/api/cards/user
4. Create a new business card:
Method: POST
URL: http://localhost:5200/api/cards/business-cards
5. Get a specific business card by ID
Method: GET
URL: http://localhost:5200/api/cards/business-cards/:id
6. Update a specific business card by ID:
Method: PUT
URL: http://localhost:5200/api/cards/business-cards/:id
7. Delete a specific business card by ID:
Method: DELETE
URL: http://localhost:5200/api/cards/business-cards/:id

.env file content:

NODE_ENV=development
DB="mongodb://127.0.0.1:27017/react-server-side"
JWTKEY="secret"
port=5200





