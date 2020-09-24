(ns backend.service
  (:require [io.pedestal.http :as http]
            [io.pedestal.http.route :as route]
            [io.pedestal.http.body-params :as body-params]
            [ring.util.response :as ring-resp]

            ;; -- PROTOC-GEN-CLOJURE --
            [protojure.pedestal.core :as protojure.pedestal]
            [protojure.pedestal.routes :as proutes]
            [com.example.addressbook.Greeter.server :as greeter]
            [com.derrek.senior.CreateService.server :as creater]
            [com.derrek.senior.Login.server :as login]
            [com.example.addressbook :as addressbook]
            [com.derrek.senior.Scenarios.server :as scenarios]
            [com.derrek.senior.File.server :as files]
            
            [jace.auth :as auth]
            ))

(defn about-page
  [request]
  (ring-resp/response (format "Clojure %s - served from %s"
                              (clojure-version)
                              (route/url-for ::about-page))))

(defn home-page
  [request]
  (ring-resp/response "Hello from backend, backed by Protojure Template!"))

;; -- PROTOC-GEN-CLOJURE --
;; Implement our "Greeter" service interface.  The compiler generates
;; a defprotocol (greeter/Service, in this case), and it is our job
;; to define an implementation of every function within it.  These will be
;; invoked whenever a request arrives, similarly to if we had defined
;; these functions as pedestal defhandlers.  The main difference is that
;; the :body returned in the response should correlate to the protobuf
;; return-type declared in the Service definition within the .proto
;;
;; Note that our GRPC parameters are associated with the request-map
;; as :grpc-params, similar to how the pedestal body-param module
;; injects other types, like :json-params, :edn-params, etc.
;;
;; see http://pedestal.io/reference/request-map


(deftype Greeter []
  greeter/Service
  (Hello
    [this {{:keys [name]} :grpc-params :as request}]
    {:status 200
     :body {:message (str "Hello, " name)}}))

(deftype Creater []
  creater/Service
  (Create
    [this {{:keys [name]} :grpc-params :as request}]
    (println "Creater" request)
    {:status 200
     :body {:value (str "Message from the backend " name)}}))

(deftype Login []
  login/Service
  (Login
    [this {{:keys [email password]} :grpc-params :as request}]
    {:status 200
     :body {:jwt (auth/authenticate email password)}}))

(deftype AddScenario []
  scenarios/Service
  (Create
    [this {{:keys [scenario]} :grpc-params :as request}]
    (do
      (println "Scenario" scenario)
      (flush)
      {:status 200
       :body {:scenario scenario}})))

(deftype Upload []
  file/service
  (Upload
    [this {{:keys [name chunks]} :grpc-params :as request}]
    (do
      ; Append the data to filename
      (spit name (.toStringUtf8 chunks))
      {:status 200
       :body {:message "did upload part"}})))


;; Define intercetor to validate JWT then attach the appropriate user to needs to deny the request

;; Defines "/" and "/about" routes with their associated :get handlers.
;; The interceptors defined after the verb map (e.g., {:get home-page}
;; apply to / and its children (/about).
(def common-interceptors [(body-params/body-params) http/html-body])

;; Tabular routes
(def routes #{["/" :get (conj common-interceptors `home-page)]
              ["/about" :get (conj common-interceptors `about-page)]})

;; Helper function because its easier
(defn reduce-conj [x y]
  (reduce conj x y))

;; Add all the grpc endpoints, with authentication interceptor
;; Will move into appropriate ns when it gets bigger
(def grpc-routes (-> routes 
                     (reduce-conj (proutes/->tablesyntax {:rpc-metadata greeter/rpc-metadata :interceptors common-interceptors :callback-context (Greeter.)}))
                     (reduce-conj (proutes/->tablesyntax {:rpc-metadata login/rpc-metadata :interceptors common-interceptors :callback-context (Login.)}))
                     (reduce-conj (proutes/->tablesyntax {:rpc-metadata scenarios/rpc-metadata :interceptors common-interceptors :callback-context (AddScenario.)}))
                     (reduce-conj (proutes/->tablesyntax {:rpc-metadata creater/rpc-metadata :interceptors common-interceptors :callback-context (Creater.)}))))

(println grpc-routes)
(def service {:env :prod
              ::http/routes grpc-routes

              ;; -- PROTOC-GEN-CLOJURE --
              ;; We override the chain-provider with one provided by protojure.protobuf
              ;; and based on the Undertow webserver.  This provides the proper support
              ;; for HTTP/2 trailers, which GRPCs rely on.  A future version of pedestal
              ;; may provide this support, in which case we can go back to using
              ;; chain-providers from pedestal.
              ::http/type protojure.pedestal/config
              ::http/chain-provider protojure.pedestal/provider
              ::http/allowed-origins ["*"]
              ::http/host "0.0.0.0"
              ;;::http/host "localhost"
              ::http/port 8080})
