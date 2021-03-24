resource "random_password" "aks-dev-cluster-password" {
  length  = 32
  special = true
}

resource "azuread_application" "aks-dev-cluster" {
  name                       = "aks-dev-cluster"
  available_to_other_tenants = false
}

resource "azuread_service_principal" "aks-dev-cluster" {
  application_id = azuread_application.aks-dev-cluster.application_id
}

resource "azuread_service_principal_password" "aks-dev-cluster" {
  service_principal_id = azuread_service_principal
  value                = random_password.aks-dev-cluster-password.result
  end_date_relative    = "17520h"
}
