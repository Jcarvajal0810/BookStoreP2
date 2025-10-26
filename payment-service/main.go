package main

import (
    "encoding/json"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/api/payments", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"status": "all payments"})
    }).Methods("GET")

    r.HandleFunc("/api/payments/{reference}", func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        json.NewEncoder(w).Encode(map[string]string{"reference": vars["reference"]})
    }).Methods("GET", "DELETE")

    r.HandleFunc("/api/payments/{reference}/refund", func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        json.NewEncoder(w).Encode(map[string]string{"refund": vars["reference"]})
    }).Methods("PUT")

    r.HandleFunc("/api/payments/create", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"created": "ok"})
    }).Methods("POST")

    r.HandleFunc("/api/payments/{reference}/process", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"processed": "ok"})
    }).Methods("POST")

    r.HandleFunc("/api/payments/webhook", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"webhook": "ok"})
    }).Methods("POST")

    http.ListenAndServe(":7000", r)
}
