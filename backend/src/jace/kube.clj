(ns jace.kube
  (:import [io.kubernetes.client.openapi ApiClient ApiException Configuration]
           [io.kubernetes.client.openapi.apis CoreV1Api]
           [io.kubernetes.client.openapi.models V1Pod V1PodList V1PersistentVolumeClaim V1PersistentVolumeClaimSpec V1ResourceRequirements]
           [io.kubernetes.client.util Config]
           [derrek Kubernetes]))
(Kubernetes/setApis)
;;(def result (Kubernetes/createPVCInCluster pvc-test))
(Kubernetes/createContainer (Kubernetes/createContainerSpec "scenario-1"))

; Example for creating Scenario
(Kubernetes/createPVCInCluster (Kubernetes/createPVCSpec "scenario-1" "3Gi"))

;; Create the init contianer with the name of the pvc
(Kubernetes/createInitPod (Kubernetes/initPVCPod "scenario-1" "initpod"))

;; Now copy the file to the pvc
(Kubernetes/copyFileToPVC "base64_name.tar" "scenario-1" "initpod")