# note-keeper-223176-223261

Notes Backend (Express)

- Port: 3001
- Docs (Swagger UI): /docs
- Health: GET /health or GET /

Run
- npm start (production)
- npm run dev (with nodemon)

Endpoints
- GET /notes
  - Query: offset (number), limit (number, max 100)
- GET /notes/:id
- POST /notes
  - Body: { "title": "string", "content": "string" }
- PUT /notes/:id
  - Body: { "title"?: "string", "content"?: "string" }
- DELETE /notes/:id

Example curl
- Health:
  curl -s http://localhost:3001/health | jq .
- Create:
  curl -s -X POST http://localhost:3001/notes \
    -H "Content-Type: application/json" \
    -d '{"title":"First note","content":"Hello"}' | jq .
- List:
  curl -s "http://localhost:3001/notes?offset=0&limit=10" | jq .
- Get one:
  curl -s http://localhost:3001/notes/<id> | jq .
- Update:
  curl -s -X PUT http://localhost:3001/notes/<id> \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated","content":"Updated content"}' | jq .
- Delete:
  curl -s -X DELETE http://localhost:3001/notes/<id> -i

Notes
- Storage is in-memory for now; data resets on restart.
- Replace with a real database for persistence when needed.