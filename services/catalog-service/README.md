# Catalog Service

API simple para listar y obtener libros.

Run local (requires Node 18+ and Mongo):
- copy .env.example to .env and set MONGO_URI
- npm install
- npm run dev

Docker:
- docker build -t youruser/catalog:latest .
- docker run -d -p 3000:3000 -e MONGO_URI="mongodb://host.docker.internal:27017/catalog_db" youruser/catalog:latest

Kubernetes:
- kubectl create secret generic mongo-creds --from-literal=mongoUri="mongodb://user:pass@mongo-host:27017/catalog_db"
- kubectl apply -f k8s/catalog-deployment.yaml
- kubectl apply -f k8s/catalog-service.yaml
