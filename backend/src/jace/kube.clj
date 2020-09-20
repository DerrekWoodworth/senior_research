(ns jace.kube
  (:import [io.kubernetes.client.openapi ApiClient ApiException Configuration]
           [io.kubernetes.client.openapi.apis CoreV1Api]
           [io.kubernetes.client.openapi.models V1Pod V1PodList V1PersistentVolumeClaim V1PersistentVolumeClaimSpec V1ResourceRequirements]
           [io.kubernetes.client.util Config]))


;; Set the default config for our client to use
(Configuration/setDefaultApiClient (Config/defaultClient))

(println "Creating api")
;; Define the api to interact with the cluster
(def api (CoreV1Api.))

;(println "Getting pods")
;; Java interopt method class, method takes 9 nulls... yikes
;(def pods (.listPodForAllNamespaces api nil nil nil nil nil nil nil nil nil))


;(println pods)

;; Create dymanic PVC
(defn pvcSpec
  "Create the spec for a PVC of requested size"
  []
  (-> (V1PersistentVolumeClaim.)
      (.spec (-> (V1PersistentVolumeClaimSpec.)
                 (.resources (-> (V1ResourceRequirements.)
                                (.limits (-> {}
                                         (assoc "storage" "3Gi")))))))))
