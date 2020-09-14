(ns jace.interceptor)

;; Statically define grpc end points and their permissions

;; Example from request :path-info "/com.derrek.senior.Login/Login"
;; Example Role would be student or professor

(def route-roles
  {
   ;; Example but should be implemented
   "/com.derrek.senior.Container/Create" "professor"
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
           (let [requiredRole (get route-roles (:path-;;info ctx))]))
         ;; There was no jwt on the request
         (throw (Exception. "Not authenticated")))))})

;; Need to have an error catching interceptor to return 403
