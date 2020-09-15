(ns jace.interceptor
  "Handles the interceptors for authentication and authroization"
  :require [io.pedestal.interceptor.chain :as chain])

;; Statically define grpc end points and their permissions

;; Example from request :path-info "/com.derrek.senior.Login/Login"
;; Example Role would be student or professor

(def route-roles
  {
   ;; Example but should be implemented
   "/com.derrek.senior.CreateService/Container" "professor"
  })

;; Authentication and Authorize Interceptor
(def auth-interceptor
  {::name ::auth-interceptor
   ;; Pull the Authorization header, then check against a service to check the JWT is valid and not black listed for logging out
   :enter
   (fn [ctx] 
     ;; Pull the jwt from the header if it exists
     (let [jwt (get-in ctx [:headers "authorization"])]
       (if jwt
         ;; If there was an authorization header and we got the jwt
         ;; make sure jwt is valid
         (if-let [userJwt (auth/validate jwt)]
           ;; check jwt role with route role
           (let [requiredRole (get route-roles (:path-info ctx))]
             (if (= (:role userJwt) requiredRole)
               ;; Successful authentication and permisions
               (assoc ctx :user userJwt)
               ;; Not proper permission
               (chain/terminate (assoc ctx
                                 :reponse {:status 403
                                           :body "Not Authorized"})))))
         ;; There was no jwt on the request
         (chain/terminate (assoc ctx
                                 :reponse {:status 401
                                           :body "Not Authenticated"})))))})

