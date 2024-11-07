provider "aws" {
  region = "us-east-1" # Defina a região desejada
}

# Cognito User Pool com autenticação via CPF
resource "aws_cognito_user_pool" "tofood_user_pool" {
  name = "tofood_user_pool"

  # Configuração básica do Pool
  alias_attributes = []  # Remove aliases como e-mail ou telefone
  auto_verified_attributes = []  # Desabilita verificação automática de e-mail ou telefone
  
  # Configuração do atributo customizado CPF
  schema {
    attribute_data_type = "String"
    name                = "custom:cpf"
    mutable             = true
    required            = true  # Torna o CPF obrigatório
    string_attribute_constraints {
      min_length = 11
      max_length = 11
    }
  }

  # Configuração sem exigência de senha
  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  password_policy {
    minimum_length                   = 6
    require_lowercase                = false
    require_uppercase                = false
    require_numbers                  = false
    require_symbols                  = false
    temporary_password_validity_days = 7
  }

  mfa_configuration = "OFF"  # Desativa MFA
  tags = {
    Environment = "dev"
    Project     = "tofood"
  }
}

# Cognito User Pool Client (App Client) sem autenticação com senha
resource "aws_cognito_user_pool_client" "tofood_user_pool_client" {
  name                   = "tofood_user_pool_client"
  user_pool_id           = aws_cognito_user_pool.tofood_user_pool.id
  generate_secret        = false

  # Configuração de autenticação simplificada
  explicit_auth_flows = ["ADMIN_NO_SRP_AUTH"]

  # Configuração de URLs de callback para uso com OAuth, se necessário
  callback_urls = ["https://tofood.com/callback"]
  logout_urls   = ["https://tofood.com/logout"]
  
  # Validade dos Tokens (em minutos)
  access_token_validity  = 60    # 60 minutos
  id_token_validity      = 60    # 60 minutos
  refresh_token_validity = 43200 # 30 dias em minutos
}

# Cognito User Pool Domain para URLs amigáveis de autenticação
resource "aws_cognito_user_pool_domain" "tofood_user_pool_domain" {
  domain       = "tofood-auth-domain"  # Defina um nome de domínio único
  user_pool_id = aws_cognito_user_pool.tofood_user_pool.id
}

# Outputs para visualização de IDs e domínio
output "tofood_user_pool_id" {
  value = aws_cognito_user_pool.tofood_user_pool.id
}

output "tofood_user_pool_client_id" {
  value = aws_cognito_user_pool_client.tofood_user_pool_client.id
}

output "tofood_user_pool_domain" {
  value = aws_cognito_user_pool_domain.tofood_user_pool_domain.domain
}
