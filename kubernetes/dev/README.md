## Dev k8s yamls 

This folder holds yamls files which represent the various used in various of development & test steps. The yamls under this folder are by means not suitable for production environments

### files under [dev-dbs]('./dev-dbs') folder
they are stateless DB deployments which are using `Ephemeral storage` pod and they are not presistent only good in development/test environments

#### testing out istio and using istioingressgateway


Installing isito with `default` profile in the dev cluster.

we can dump the profile and see what are the options provided before installing.

```bash
istioctl profile dump default
```

installing:

```bash
$ > istioctl install --set profile=default
```

##### (creating manifest)[https://istio.io/latest/docs/setup/install/istioctl/#generate-a-manifest-before-installation]
```bash
$ > istioctl manifest generate --set profile=default > istio-install-manifest.yaml

```


istio sidecar auto injection enabled by labeling the namespace by adding `istio-injection=enabled` label in the yaml

or with kubectl 

```bash
kubectl label ns msc-dev istio-injection=enabled
```