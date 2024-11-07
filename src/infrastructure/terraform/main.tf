provider "aws" {
  region = "us-east-1" # Defina a região desejada
}

# Cognito User Pool com autenticação via CPF
resource "aws_cognito_user_pool" "cpf_user_pool" {
  name = "cpf_user_pool"

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
    Project     = "CPF_Auth"
  }
}

# Cognito User Pool Client (App Client) sem autenticação com senha
resource "aws_cognito_user_pool_client" "cpf_user_pool_client" {
  name                   = "cpf_user_pool_client"
  user_pool_id           = aws_cognito_user_pool.cpf_user_pool.id
  generate_secret        = false

  # Configuração de autenticação simplificada
  explicit_auth_flows = ["ALLOW_ADMIN_NO_SRP_AUTH"]

  # (Opcional) Configuração de URLs de callback para uso com OAuth, se necessário
  callback_urls = ["https://example.com/callback"]
  logout_urls   = ["https://example.com/logout"]
  
  # Validade dos Tokens
  access_token_validity      = 60  # Em minutos
  id_token_validity          = 60
  refresh_token_validity     = 30  # Em dias
}

# (Opcional) Cognito User Pool Domain para URLs amigáveis de autenticação
resource "aws_cognito_user_pool_domain" "cpf_user_pool_domain" {
  domain       = "cpf-auth-domain"  # Defina um nome de domínio único
  user_pool_id = aws_cognito_user_pool.cpf_user_pool.id
}

output "cpf_user_pool_id" {
  value = aws_cognito_user_pool.cpf_user_pool.id
}

output "cpf_user_pool_client_id" {
  value = aws_cognito_user_pool_client.cpf_user_pool_client.id
}

output "cpf_user_pool_domain" {
  value = aws_cognito_user_pool_domain.cpf_user_pool_domain.domain
}
