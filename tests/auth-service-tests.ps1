# Write-Host "=== TESTES DO AUTH SERVICE ==="

# # Teste de registro
# $user = @{
#     name = "Usuario Teste"
#     email = "teste@cultivatech.com"
#     password = "Teste@123"
#     cpf = "11122233344"
#     phone = "(31) 99999-9999"
# } | ConvertTo-Json

# Write-Host "Registrando usuário..."
# try {
#     $response = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/register" `
#         -Method POST `
#         -ContentType "application/json" `
#         -Body $user
#     Write-Host "SUCESSO: $($response | ConvertTo-Json)"
# } catch {
#     Write-Host "ERRO: $($_.Exception.Message)"
# }

# # Teste de login
# $credentials = @{
#     email = "teste@cultivatech.com"
#     password = "Teste@123"
# } | ConvertTo-Json

# Write-Host "Fazendo login..."
# try {
#     $response = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/login" `
#         -Method POST `
#         -ContentType "application/json" `
#         -Body $credentials
    
#     $token = $response.token
#     Write-Host "SUCESSO: Token recebido - $token"
    
#     # Salva o token para uso em outros serviços
#     $token | Out-File -FilePath ".\tests\token.txt"
# } catch {
#     Write-Host "ERRO: $($_.Exception.Message)"
# }

# Write-Host "=== FIM DOS TESTES DO AUTH SERVICE ==="

Write-Host "=== INICIANDO TESTES COMPLETOS ==="

# 1. Testar Discovery Server
Write-Host "`n[1/6] Testando Discovery Server..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8761" -ErrorAction Stop
    Write-Host "✅ OK - Status $($response.StatusCode)"
} catch {
    Write-Host "❌ FALHA - $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Testar Config Server
Write-Host "`n[2/6] Testando Config Server..."
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8888/actuator/health" -ErrorAction Stop
    Write-Host "✅ OK - Status: $($response.status)"
} catch {
    Write-Host "❌ FALHA - $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Testar Auth Service
Write-Host "`n[3/6] Testando Auth Service..."
try {
    # Health Check
    $health = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/health" -ErrorAction Stop
    Write-Host "✅ Health Check: $health"
    
    # Registrar usuário
    $user = @{
        name = "Usuario Teste"
        email = "teste@cultivatech.com"
        password = "Teste@123"
        cpf = "11122233344"
        phone = "(31) 99999-9999"
    } | ConvertTo-Json
    
    $registerResponse = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/register" `
        -Method POST `
        -ContentType "application/json" `
        -Body $user
        
    Write-Host "✅ Registro de usuário: $($registerResponse | ConvertTo-Json)"
    
    # Login
    $credentials = @{
        email = "teste@cultivatech.com"
        password = "Teste@123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $credentials
    
    $token = $loginResponse.token
    Write-Host "✅ Login realizado. Token: $token"
    
    # Salvar token para outros serviços
    $token | Out-File -FilePath ".\token.txt"
} catch {
    Write-Host "❌ FALHA - $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Testar Property Service
if (Test-Path ".\token.txt") {
    $token = Get-Content -Path ".\token.txt"
    Write-Host "`n[4/6] Testando Property Service..."
    try {
        # Health Check
        $health = Invoke-RestMethod -Uri "http://localhost:8082/api/properties/health" -ErrorAction Stop
        Write-Host "✅ Health Check: $health"
        
        # Criar propriedade
        $property = @{
            name = "Fazenda Teste"
            size = "100 hectares"
            location = "Minas Gerais"
        } | ConvertTo-Json
        
        $createResponse = Invoke-RestMethod -Uri "http://localhost:8082/api/properties" `
            -Method POST `
            -ContentType "application/json" `
            -Headers @{"Authorization" = "Bearer $token"} `
            -Body $property
            
        Write-Host "✅ Propriedade criada: $($createResponse | ConvertTo-Json)"
    } catch {
        Write-Host "❌ FALHA - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 5. Testar Production Service
if (Test-Path ".\token.txt") {
    $token = Get-Content -Path ".\token.txt"
    Write-Host "`n[5/6] Testando Production Service..."
    try {
        # Health Check
        $health = Invoke-RestMethod -Uri "http://localhost:8083/api/productions/health" -ErrorAction Stop
        Write-Host "✅ Health Check: $health"
        
        # Adicionar produção
        $production = @{
            type = "Milho"
            quantity = 500
            unit = "sacas"
        } | ConvertTo-Json
        
        $createResponse = Invoke-RestMethod -Uri "http://localhost:8083/api/productions" `
            -Method POST `
            -ContentType "application/json" `
            -Headers @{"Authorization" = "Bearer $token"} `
            -Body $production
            
        Write-Host "✅ Produção adicionada: $($createResponse | ConvertTo-Json)"
    } catch {
        Write-Host "❌ FALHA - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 6. Testar API Gateway (se disponível)
Write-Host "`n[6/6] Testando API Gateway..."
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -ErrorAction Stop
    Write-Host "✅ Health Check: $($health.status)"
    
    # Testar rota para Auth Service
    $authHealth = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/health" -ErrorAction Stop
    Write-Host "✅ Rota Auth Service: $authHealth"
} catch {
    Write-Host "⚠️ Gateway não disponível - $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n=== TESTES CONCLUÍDOS ==="