Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "PRUEBA DE PAYMENT SERVICE PAYU" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:7000/api"

Write-Host "[1/5] Verificando servicio..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "       Servicio: $($health.service)" -ForegroundColor Green
    Write-Host "       Estado: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "       ERROR: Servicio no disponible" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/5] Creando pago..." -ForegroundColor Yellow
$createPayload = @{
    userId = "user123"
    orderId = "order456"
    amount = 100.50
    currency = "COP"
    description = "Compra de 3 libros: Clean Code, Design Patterns, Refactoring"
    buyerEmail = "carlos.carvajal@example.com"
    paymentMethod = "credit_card"
} | ConvertTo-Json

try {
    $payment = Invoke-RestMethod -Uri "$baseUrl/payments/create" -Method Post -Body $createPayload -ContentType "application/json"
    Write-Host "       Payment ID: $($payment.id)" -ForegroundColor Green
    Write-Host "       Reference: $($payment.reference)" -ForegroundColor Green
    Write-Host "       Status: $($payment.status)" -ForegroundColor Green
    Write-Host "       Amount: $($payment.amount) $($payment.currency)" -ForegroundColor Green
    $paymentId = $payment.id
} catch {
    Write-Host "       ERROR: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[3/5] Procesando pago con tarjeta VISA..." -ForegroundColor Yellow
$processPayload = @{
    cardNumber = "4111111111111111"
    cardHolder = "CARLOS CARVAJAL"
    expiryDate = "12/25"
    cvv = "123"
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$baseUrl/payments/$paymentId/process" -Method Post -Body $processPayload -ContentType "application/json"
    Write-Host "       Status: $($result.status)" -ForegroundColor $(if($result.status -eq "APPROVED"){"Green"}else{"Red"})
    Write-Host "       Response Code: $($result.responseCode)" -ForegroundColor White
    Write-Host "       Message: $($result.responseMessage)" -ForegroundColor White
    if ($result.transactionId) {
        Write-Host "       Transaction ID: $($result.transactionId)" -ForegroundColor Green
    }
    if ($result.authorizationCode) {
        Write-Host "       Authorization Code: $($result.authorizationCode)" -ForegroundColor Green
    }
} catch {
    Write-Host "       ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "[4/5] Consultando pago..." -ForegroundColor Yellow
try {
    $paymentDetail = Invoke-RestMethod -Uri "$baseUrl/payments/$paymentId" -Method Get
    Write-Host "       ID: $($paymentDetail.id)" -ForegroundColor White
    Write-Host "       Reference: $($paymentDetail.reference)" -ForegroundColor White
    Write-Host "       Status: $($paymentDetail.status)" -ForegroundColor $(if($paymentDetail.status -eq "APPROVED"){"Green"}else{"Yellow"})
    Write-Host "       Amount: $($paymentDetail.amount) $($paymentDetail.currency)" -ForegroundColor White
    Write-Host "       Buyer: $($paymentDetail.buyerEmail)" -ForegroundColor White
} catch {
    Write-Host "       ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "[5/5] Listando todos los pagos..." -ForegroundColor Yellow
try {
    $allPayments = Invoke-RestMethod -Uri "$baseUrl/payments" -Method Get
    Write-Host "       Total de pagos: $($allPayments.Count)" -ForegroundColor Green
    foreach ($p in $allPayments | Select-Object -First 3) {
        Write-Host "       - $($p.reference): $($p.status) - $($p.amount) $($p.currency)" -ForegroundColor White
    }
} catch {
    Write-Host "       ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "PRUEBA COMPLETADA" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green