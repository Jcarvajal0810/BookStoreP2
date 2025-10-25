package handlers
import ("context";"encoding/json";"fmt";"math/rand";"net/http";"payment-service/database";"payment-service/models";"regexp";"time";"github.com/gorilla/mux";"go.mongodb.org/mongo-driver/bson";"go.mongodb.org/mongo-driver/bson/primitive")
func isValidEmail(email string) bool {
return regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`).MatchString(email)
}
func CreatePayment(w http.ResponseWriter, r *http.Request) {
var req models.CreatePaymentRequest
if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
w.Header().Set("Content-Type", "application/json")
w.WriteHeader(400)
json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request"})
return
}
if req.UserID == "" {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "userId required"});return}
if req.OrderID == "" {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "orderId required"});return}
if req.Amount <= 0 {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "amount > 0"});return}
if req.BuyerEmail == "" {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "email required"});return}
if !isValidEmail(req.BuyerEmail) {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "invalid email"});return}
if req.Description == "" {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "description required"});return}
if req.PaymentMethod == "" {req.PaymentMethod = "credit_card"}
if req.Currency == "" {req.Currency = "COP"}
reference := fmt.Sprintf("REF-%d-%d", time.Now().Unix(), rand.Intn(10000))
payment := models.Payment{Reference:reference,UserID:req.UserID,OrderID:req.OrderID,Amount:req.Amount,Currency:req.Currency,Status:"PENDING",ResponseCode:"PENDING_PAYMENT",ResponseMessage:"Pendiente",PaymentMethod:req.PaymentMethod,Description:req.Description,BuyerEmail:req.BuyerEmail,CreatedAt:time.Now(),UpdatedAt:time.Now()}
result, _ := database.PaymentsCollection.InsertOne(context.Background(), payment)
payment.ID = result.InsertedID.(primitive.ObjectID).Hex()
w.Header().Set("Content-Type", "application/json")
w.WriteHeader(201)
json.NewEncoder(w).Encode(payment)
}
func ProcessPayment(w http.ResponseWriter, r *http.Request) {
vars := mux.Vars(r)
reference := vars["reference"]
var req models.ProcessPaymentRequest
json.NewDecoder(r.Body).Decode(&req)
if req.CardNumber == "" || req.CardHolder == "" {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "card data required"});return}
var payment models.Payment
err := database.PaymentsCollection.FindOne(context.Background(), bson.M{"reference": reference}).Decode(&payment)
if err != nil {w.WriteHeader(404);json.NewEncoder(w).Encode(map[string]string{"error": "Not found"});return}
if payment.Status != "PENDING" {w.WriteHeader(400);json.NewEncoder(w).Encode(map[string]string{"error": "Already processed"});return}
time.Sleep(time.Duration(2+rand.Intn(3)) * time.Second)
randomResult := rand.Intn(100)
if randomResult < 80 {payment.Status="APPROVED";payment.ResponseCode="POL_APPROVED";payment.ResponseMessage="Aprobada";payment.TransactionID=fmt.Sprintf("TXN-%d",time.Now().Unix())}else if randomResult<95{payment.Status="DECLINED";payment.ResponseCode="POL_DECLINED";payment.ResponseMessage="Rechazada"}else{payment.Status="ERROR";payment.ResponseCode="POL_ERROR";payment.ResponseMessage="Error"}
payment.UpdatedAt = time.Now()
database.PaymentsCollection.UpdateOne(context.Background(), bson.M{"reference": reference}, bson.M{"$set": payment})
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(payment)
}
func GetPayment(w http.ResponseWriter, r *http.Request) {
vars := mux.Vars(r)
var payment models.Payment
database.PaymentsCollection.FindOne(context.Background(), bson.M{"reference": vars["reference"]}).Decode(&payment)
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(payment)
}
func GetUserPayments(w http.ResponseWriter, r *http.Request) {
vars := mux.Vars(r)
cursor, _ := database.PaymentsCollection.Find(context.Background(), bson.M{"userId": vars["userId"]})
defer cursor.Close(context.Background())
var payments []models.Payment
cursor.All(context.Background(), &payments)
if payments == nil {payments = []models.Payment{}}
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(payments)
}
func WebhookSimulation(w http.ResponseWriter, r *http.Request) {
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
