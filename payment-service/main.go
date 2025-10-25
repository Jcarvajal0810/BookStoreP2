package main
import ("log";"net/http";"os";"payment-service/database";"payment-service/handlers";"github.com/gorilla/mux";"github.com/rs/cors")
func main() {
database.Connect()
r := mux.NewRouter()
r.HandleFunc("/api/payments/create", handlers.CreatePayment).Methods("POST")
r.HandleFunc("/api/payments/{reference}/process", handlers.ProcessPayment).Methods("POST")
r.HandleFunc("/api/payments/{reference}", handlers.GetPayment).Methods("GET")
r.HandleFunc("/api/payments/user/{userId}", handlers.GetUserPayments).Methods("GET")
r.HandleFunc("/api/payments/webhook", handlers.WebhookSimulation).Methods("POST")
c := cors.New(cors.Options{AllowedOrigins:[]string{"*"},AllowedMethods:[]string{"GET","POST","PUT","DELETE"},AllowedHeaders:[]string{"*"},AllowCredentials:true})
handler := c.Handler(r)
port := os.Getenv("PORT")
if port == "" {port = "7000"}
log.Printf("Payment service on port %s", port)
log.Fatal(http.ListenAndServe(":"+port, handler))
}
