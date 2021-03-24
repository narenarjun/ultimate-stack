output "client_certificate" {
  value = azurerm_kubernetes_cluster.dev-cluster.kube_config.0.client_certificate
}

output "kube_config" {
  value = azurerm_kubernetes_cluster.dev-cluster.kube_config_raw
}
