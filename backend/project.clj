(defproject backend "0.0.1-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Apache License 2.0"
            :url "https://www.apache.org/licenses/LICENSE-2.0"
            :year 2019
            :key "apache-2.0"}
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [io.pedestal/pedestal.service "0.5.7"]

                 ;; -- PROTOC-GEN-CLOJURE --
                 [protojure "1.5.2"]
                 [protojure/google.protobuf "0.9.1"]

                 ;; -- PROTOC_GEN_CLOJURE CLIENT DEPS --
                 [org.eclipse.jetty.http2/http2-client "9.4.20.v20190813"]
                 [org.eclipse.jetty/jetty-alpn-java-client "9.4.28.v20200408"]
                 ;; -- Jetty Client Dep --
                 [org.ow2.asm/asm "8.0.1"]

                 ;; Include Undertow for supporting HTTP/2 for GRPCs
                 [io.undertow/undertow-core "2.0.28.Final"]
                 [io.undertow/undertow-servlet "2.0.28.Final"]
                 ;; And of course, protobufs
                 [com.google.protobuf/protobuf-java "3.12.2"]
                 ;; logging
                 [com.taoensso/timbre "4.10.0"]
                 [com.fzakaria/slf4j-timbre "0.3.17"]

                 [ch.qos.logback/logback-classic "1.2.3" :exclusions [org.slf4j/slf4j-api]]
                 [org.slf4j/jul-to-slf4j "1.7.30"]
                 [org.slf4j/jcl-over-slf4j "1.7.30"]
                 [org.slf4j/log4j-over-slf4j "1.7.30"]

                 ;; Authentication
                 [buddy "2.0.0"]
                 ;; Database
                 [com.datomic/datomic-free "0.9.5697"]
                 ;; Kubernetes 
                 [io.kubernetes/client-java "9.0.2"]
                 ]

  :min-lein-version "2.0.0"
  :java-source-paths ["src/derrek"]
  :javac-options ["-target" "11" "-source" "11"]
  :resource-paths ["config", "resources"]
  :profiles {:dev {:aliases {"run-dev" ["trampoline" "run" "-m" "backend.server/run-dev"]}
                   :dependencies [[io.pedestal/pedestal.service-tools "0.5.7"]]}
             :uberjar {:aot [backend.server]}}
  :main ^{:skip-aot true} backend.server)
