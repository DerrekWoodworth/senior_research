(ns jace.auth
  (:require [buddy.sign.jwt :as jwt]))

; Require database

(defn authenticate
  "Takes an email and password and compares against the database, either returns a JWT or nil"
  [email password]
  (if (and (= "dwoodworth@stetson.edu" email) (= "asdf" password))
    (jwt/sign {:email email :role "student"} "secret") ""))

(defn validate
  "Takes a jwt and returns its map determines if its valid"
  [userJwt]
  (jwt/unsign userJwt "secret"))
