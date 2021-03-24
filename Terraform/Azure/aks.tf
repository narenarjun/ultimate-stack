resource "azurerm_kubernetes_cluster" "dev-cluster" {
  name                = "dev-cluster"
  location            = azurerm_resource_group.dev-cluster.location
  resource_group_name = azurerm_resource_group.dev-cluster.name
  dns_prefix          = "dev-cluster"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D3_v2"
  }

  service_principal {
    client_id     = azuread_service_principal.aks-dev-cluster.application_id
    client_secret = random_password.aks-dev-cluster-password.result
  }
}

