(ns jace.interceptor)

;; Statically define grpc end points and their permissions

;; Example from request :path-info "/com.derrek.senior.Login/Login"
;; Example Role would be student or professor

(def route-roles
  {
   ;; Example but should be implemented
   "/com.derrek.senior.Container/Create" Professor
  })

;; Authentication Interceptor
(def auth-interceptor
  {::name ::auth-interceptor
   ;; Pull the Authorization header, then check against a service to check the JWT is valid and not black listed for logging out
   :enter
   (fn [ctx] 
     (let [jwt (get-in ctx [:headers 
