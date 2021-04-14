terraform {
  backend "s3" {
    bucket = "jace-senior-research"
    key    = "io-uec1"
    region = "us-east-1"
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "1.13.3"
    }
#    helm = {
#      source  = "hashicorp/helm"
#      version = "2.0.2"
#    }
#    template = {
#      source  = "hashicorp/template"
#      version = "2.2.0"
#    }
#    local = {
#      source  = "hashicorp/local"
#      version = "2.0.0"
#    }
#    kubernetes-alpha = {
#      source  = "hashicorp/kubernetes-alpha"
#      version = "0.2.1"
#    }
  }
}

provider "aws" {
  region = "us-east-2"
}

#provider "kubernetes" {
#  host                   = data.aws_eks_cluster.cluster.endpoint
#  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
#  token                  = data.aws_eks_cluster_auth.cluster.token
#  load_config_file       = false
#}
#
#provider "helm" {
#  debug = true
#  kubernetes {
#    host                   = data.aws_eks_cluster.cluster.endpoint
#    cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
#    token                  = data.aws_eks_cluster_auth.cluster.token
#  }
#}
#
#provider "kubernetes-alpha" {
#  host                   = data.aws_eks_cluster.cluster.endpoint
#  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
#  token                  = data.aws_eks_cluster_auth.cluster.token
#  server_side_planning   = false
#}


data "aws_eks_cluster" "cluster" {
  name = module.jace.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.jace.cluster_id
}

module "jace" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "io-cluster"
  cluster_version = "1.18"
  vpc_id = "vpc-dea824b5"
  subnets = ["subnet-1156035d", "subnet-496cd822"]
  enable_irsa     = true
  version         = "14.0.0"

  # AWS relased gp3, but their API doesn't support it in aws launch configuration
  workers_group_defaults = {
    root_volume_type = "gp2"
  }

  worker_groups = [
    {
      instance_type = "m5.large"
      asg_max_size  = 5
      tags = [
        {
          "key"                 = "k8s.io/cluster-autoscaler/${module.jace.cluster_id}"
          "value"               = "owned"
          "propagate_at_launch" = "false"
        },
        {
          "key"                 = "k8s.io/cluster-autoscaler/enabled"
          "value"               = "TRUE"
          "propagate_at_launch" = "false"
        }
      ]
    }
  ]
}

## Create the efs file system for persistent storage
