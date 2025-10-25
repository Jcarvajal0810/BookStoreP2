FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY go.mod go.sum ./

# Descargar dependencias
RUN go mod download

# Copiar código fuente
COPY . .

# Compilar
RUN go build -o payment-service .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/payment-service .

EXPOSE 7000

CMD ["./payment-service"]