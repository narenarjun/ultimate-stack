provider "azurerm" {
  features {}
}

provider "azuread" {}


# creating a resource group
resource "azurerm_resource_group" "dev-cluster" {
  name     = "dev-cluster"
  location = var.location
}
