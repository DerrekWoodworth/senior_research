(ns jace.db
  (:require [datomic.api :as d]))


;; In memory db for development
(def db-uri "datomic:mem://foo")

;; Delete it so we have a new one
(d/delete-database db-uri)
;; Create the dev db
(d/create-database db-uri)

;: Connection
(def conn (d/connect db-uri))

;; Empty db for testing

;; Define User schema
(def user-schema [{:db/ident :user/email
                   :db/valueType :db.type/string
                   :db/cardinality :db.cardinality/one
                   :db/doc "User's email"}
                  {:db/ident :user/role
                   :db/valueType :db.type/string
                   :db/cardinality :db.cardinality/one
                   :db/doc "User's role for permissions"}
                  {:db/ident :user/password
                   :db/valueType :db.type/string
                   :db/cardinality :db.cardinality/one
                   :db/doc "User's password"}])

;; Returns a promise or whatever, needs to be derefrenced
@(d/transact conn user-schema)

;; Example user
(def derrek-user [{:user/email "dwoodworth@stetson.edu"
                   :user/password "asdf"
                   :user/role "student"}
                  {:user/email "dplante@stetson.edu"
                   :user/password "asdf"
                   :user/role "professor"}])

;; Add user to db
@(d/transact conn derrek-user)

;; Query db
(def users (d/q '[:find ?e
      :where [?e :user/email]] (d/db conn)))

;; Get the entity of users
(def ent (d/entity (d/db conn) (ffirst users)))

(def all-users (map #(d/entity (d/db conn) (first %)) users))

;; Conver entity id to map
(defn asMap
  "Querying the database only returns entity id's, we want to convert them to maps for consumption"
  [eid]
  (d/pull (d/db conn) '[*] eid))

(defn getUserByEmail
  "Query the db for a user by their email and return their map"
  [email]
  (asMap (ffirst (d/q '[:find ?e :in $ ?email :where [?e :user/email ?email]] (d/db conn) email))))
