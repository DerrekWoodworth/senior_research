;;;----------------------------------------------------------------------------------
;;; Generated by protoc-gen-clojure.  DO NOT EDIT
;;;
;;; GRPC com.derrek.senior.CreateService Service Implementation
;;;----------------------------------------------------------------------------------
(ns com.derrek.senior.CreateService.server
  (:require [com.derrek.senior :refer :all]
))

;-----------------------------------------------------------------------------
; GRPC CreateService
;-----------------------------------------------------------------------------
(defprotocol Service
  (Create [this param]))

(defn- Create-dispatch
  [ctx request]
  (Create ctx request))

(def ^:const rpc-metadata
  [{:pkg "com.derrek.senior" :service "CreateService" :method "Create" :method-fn Create-dispatch :server-streaming false :client-streaming false :input pb->CreateRequest :output new-CreateResponse}])