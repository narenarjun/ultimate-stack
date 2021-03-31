<!-- There have been some envoy and mtls related errors needs to be solved. for the time being istio has been purged out of the dev cluster -->


 ['./destination-config.yaml']('./destination-config.yaml') and ['./msc-gateway.yaml']('./msc-gateway.yaml') are not applied in the dev cluster.


 More istio mTLS related steps on deployment level till todo.

 few more hiccups, 

 Kiali dashboard throws `KIA1106` error, --> needs to be resolved

 prometheus , kiali, grafana and jaeger are added istio namespace to monitor and observe the pods

 <!-- TODO: add install yamls for the log and metrics stacks 
 
 https://istio.io/latest/docs/ops/integrations/  -->