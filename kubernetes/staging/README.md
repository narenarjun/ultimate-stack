# K8s staging cluster setup

The order of installation as follows:
- istio
  - addons:
    - kiali
    - Jaeger 
    - Prometheus
    - Grafana
- knative
- longhorn
- sealed secrets
- argocd
- tekton
