# Creating Azure Kubernetes Service (AKS) Cluster with Terraform

### ✨✨ Sign in to Azure CLI:

To create resources with terraform, we first need to authenticate our session with loging into the azure with the azure cli from the terminal which will take care of setting the authentication context which will be used by terraform when planning, creating and deleting resources.

```
$>> az login
```

### ✨✨ Initialize:
We need to initialize by the following command which will download all the necessary providers required by `main.tf` or `provider.tf` file.
```bash
$>> terraform init
```

### ✨✨ Plan:

Terraform plan will do a dry run of comparing the resources in the provider/platform of choice( eg: azure) with regards to the code and will give out result whether it can be created successfully or not. Plan step is a very useful safeguard step to check and do the necessary corrections required before applying and creating the actual resources.

```bash
$>> terraform plan
```
### ✨✨ Apply:
applying out code which will provision all the resources as it was succeded in the plan step.
```bash
$>> terraform apply -auto-approve
```


We can use the terraform [`workspace`](https://www.terraform.io/docs/language/state/workspaces.html) feature to create `dev`, `staging` and `production` stage cluster with the same codes.