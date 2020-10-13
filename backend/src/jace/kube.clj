(ns jace.kube
  (:import [io.kubernetes.client.openapi ApiClient ApiException Configuration]
           [io.kubernetes.client.openapi.apis CoreV1Api]
           [io.kubernetes.client.openapi.models V1Pod V1PodList V1PersistentVolumeClaim V1PersistentVolumeClaimSpec V1ResourceRequirements]
           [io.kubernetes.client.util Config]
           [derrek Kubernetes]))

(Kubernetes/setApis)

;(Kubernetes/createContainer 
;  (Kubernetes/createContainerSpec "scenario-2"))

; Example for creating Scenario
;(Kubernetes/createPVCInCluster (Kubernetes/createPVCSpec "scenario-2" "3Gi"))

;; Create the init contianer with the name of the pvc
;(println "Creating init pod")
;(println (Kubernetes/createInitPod (Kubernetes/initPVCPod "scenario-2" "initpod")))


;; These requests are async, need to wait for them to be created (Should watch resource, but will sleep for now)
;(println "Sleeping for 4 seconds")
;(Thread/sleep 4000)

;; Now copy the file to the pvc
;(println "Copying file")
;(Kubernetes/copyFileToPVC "/tmp/base64_name.tar" "scenario-2" "initpod")


(defn createScenario
  "When the AddScenarino end point is called, create an init pod and copy the file into it"
  [scenarioName filename]
  (let [size "5Gi"
        initpodname "initpod"]
    ;; Create the PVC todo: Determine the proper size for PVC
    (println "Creating pvc")
    (Kubernetes/createPVCInCluster (Kubernetes/createPVCSpec scenarioName size))
    ;; Now create an pod that mounts the PVC
    (println "Creating initpod and mounting pvc")
    (Kubernetes/createInitPod (Kubernetes/initPVCPod scenarioName initpodname))
    ;; Sleep to allow pod to be created
    (println "Sleeping for the pod to be created")
    (Thread/sleep 10000)
    ;; Copy files from local system to pod
    (println "Copying file to pod")
    (Kubernetes/copyFileToPVC filename initpodname)
    ;; Remove sleep to improve performance
    ;; Just kidding, idk if the above command is asynchronous or not, so sleep anyways to prevent race condition
    (Thread/sleep 1000)
    ))

(defn createContainer
  "When a student wants to attempt a scneario they get their own container. This command launches a container with the scenario
  mounted, launching its start script"
  [scenarioname studentname]
    (Kubernetes/createContainer (Kubernetes/createContainerSpec scenarioname studentname scenarioname)))

