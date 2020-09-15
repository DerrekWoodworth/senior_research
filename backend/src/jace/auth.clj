(ns jace.auth
  (:require [jace.db :as db]
            [buddy.sign.jwt :as jwt]))

; Require database

(defn authenticate
  "Takes an email and password and compares against the database, either returns a JWT or nil"
  [email password]
  (let [user (db/getUserByEmail email)
        isCorrectPassword (= (:user/password user) password)]
    (jwt/sign {:email email :role (:user/role user)} "secret")))

(defn validate
  "Takes a jwt and returns its map determines if its valid"
  [userJwt]
  (jwt/unsign userJwt "secret"))
