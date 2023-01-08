terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

variable "host" {
  type = string
}

variable "client_certificate" {
  type = string
}

variable "client_key" {
  type = string
}

variable "cluster_ca_certificate" {
  type = string
}

provider "kubernetes" {
  host = var.host

  client_certificate     = base64decode(var.client_certificate)
  client_key             = base64decode(var.client_key)
  cluster_ca_certificate = base64decode(var.cluster_ca_certificate)
}

resource "kubernetes_namespace" "cc-namespace" {
  metadata {
    name = "cloud-computing"
    labels = {
      app = "cloud-computing-project"
    }
  }
}

resource "kubernetes_deployment" "cc_es_deployment" {
  metadata {
    name      = "elastic-search-deployment"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "ElasticSearchApp"
      }
    }
    template {
      metadata {
        labels = {
          app = "ElasticSearchApp"
        }
      }
      spec {
        container {
          image = "docker.elastic.co/elasticsearch/elasticsearch:8.5.3"
          name  = "elastic-search-ms"
          port {
            container_port = 9200
          }

          env {
            name = "ELASTIC_PASSWORD"
            value = "elastic-password"
          }
          env {
            name = "ELASTICSEARCH_USER"
            value = "elastic"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "cc_es_service" {
  metadata {
    name      = "elastic-search-service"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    selector = {
      app = kubernetes_deployment.cc_es_deployment.spec.0.template.0.metadata.0.labels.app
    }
    type = "ClusterIP"
    port {
        target_port  = 9200
        port         = 9200
        protocol     = "TCP"
        name         = "elastic-search"
      }
  }
}

resource "kubernetes_deployment" "cc_rp_deployment" {
  metadata {
    name      = "reverse-proxy-deployment"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "MyCCApp"
      }
    }
    template {
      metadata {
        labels = {
          app = "MyCCApp"
        }
      }
      spec {
        container {
          image = "adrianroman2406/cloudcomputing:reverse-proxy-ms"
          name  = "reverse-proxy-ms"
          port {
            container_port = 3001
          }

          env {
          name = "ADVERTISEMENT_MS_URL"
          value = "http://business-logic-service:3000"
          }

          env {
            name = "INTERFACE_URL"
            value = "http://localhost:30007"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "cc_rp_service" {
  metadata {
    name      = "reverse-proxy-service"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    selector = {
      app = kubernetes_deployment.cc_rp_deployment.spec.0.template.0.metadata.0.labels.app
    }
    type = "NodePort"
    port {
        node_port = 30006
        target_port  = 3001
        port         = 3001
        protocol     = "TCP"
        name         = "reverse-proxy"
      }
  }
}


resource "kubernetes_deployment" "cc_bl_deployment" {
  metadata {
    name      = "business-logic-deployment"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "BussinessLogicApp"
      }
    }
    template {
      metadata {
        labels = {
          app = "BussinessLogicApp"
        }
      }
      spec {
        container {
          image = "adrianroman2406/cloudcomputing:business-logic-ms"
          name  = "business-logic-ms"
          port {
            container_port = 3000
          }

          env {
          name = "ELASTICSEARCH_NODE"
          value = "https://elastic-search-service:9200"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "cc_bl_service" {
  metadata {
    name      = "business-logic-service"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    selector = {
      app = kubernetes_deployment.cc_bl_deployment.spec.0.template.0.metadata.0.labels.app
    }
    type = "ClusterIP"
    port {
        target_port  = 3000
        port         = 3000
        protocol     = "TCP"
        name         = "business-logic"
      }
  }
}

resource "kubernetes_deployment" "cc_interf_deployment" {
  metadata {
    name      = "interface-deployment"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "AppInterface"
      }
    }
    template {
      metadata {
        labels = {
          app = "AppInterface"
        }
      }
      spec {
        container {
          image = "adrianroman2406/cloudcomputing:interface-ms"
          name  = "interface-ms"
          port {
            container_port = 8080
          }

          env {
            name = "VUE_APP_CLIENT"
            value = "http://localhost:30006/"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "cc_interf_service" {
  metadata {
    name      = "interface-service"
    namespace = kubernetes_namespace.cc-namespace.metadata.0.name
  }
  spec {
    selector = {
      app = kubernetes_deployment.cc_interf_deployment.spec.0.template.0.metadata.0.labels.app
    }
    type = "NodePort"
    port {
      node_port = 30007
      target_port  = 8080
      port         = 8080
      protocol     = "TCP"
    }
  }
}
