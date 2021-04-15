# K8s staging cluster setup ⚙️

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

## Changing Default storageclass 🛠️

Since, we have installed longhorn to manage the storage in the cluster and it needs to be changed to default so that we can take advantage of it.

```bash

>> kubectl get sc
NAME                   PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path (default)   rancher.io/local-path   Delete          WaitForFirstConsumer   false                  21h
longhorn               driver.longhorn.io      Delete          Immediate              true                   14h

```

Now, marking the `local-path` storageclass to be non-default:

```bash

>> kubectl patch sc local-path -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
storageclass.storage.k8s.io/local-path patched

```

If we do a kubectl get on stroageclass, we can see non of them is set to default:

```bash

>> kubectl get sc
NAME         PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
longhorn     driver.longhorn.io      Delete          Immediate              true                   14h
local-path   rancher.io/local-path   Delete          WaitForFirstConsumer   false                  21h

```
Let's mark the `Longhorn` as the default storageclass:

```bash

>> kubectl patch sc longhorn -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
storageclass.storage.k8s.io/longhorn patched

>> kubectl get sc
NAME                 PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path           rancher.io/local-path   Delete          WaitForFirstConsumer   false                  21h
longhorn (default)   driver.longhorn.io      Delete          Immediate              true                   14h


```

Now, `longhorn` is marked as the default storageclass.

## Setting up ArgoCD gitops deploy 🚧

Making `ArgoCD`, track for the changes in the [gitops]('../../gitops') folder from the root of this repo and make deployments according to git commits/changes happen to the yamls in the `gitops` folder.

the setup yaml for the argocd app is in the [gitops-setup]('./gitops-setup) folder.

```bash

>> kubectl apply -f kubernetes/staging/gitops-setup/argocd-app-config.yaml
application.argoproj.io/glotixz-app-deploy created

```