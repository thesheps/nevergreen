(defproject nevergreen "0.4.0pre"
            :description "A build monitor with attitude"
            :url "https://github.com/build-canaries/nevergreen"
            :dependencies [[ring "1.2.2"]
                           [environ "0.5.0"]
                           [compojure "1.1.8"]
                           [cheshire "5.3.1"]
                           [clj-cctray "0.8.0"]
                           [clj-http "1.0.1"]
                           [com.duelinmarkers/ring-request-logging "0.2.0"]
                           [ring/ring-json "0.3.1"]]
            :plugins [[lein-ring "0.8.11"]
                      [environ/environ.lein "0.2.1"]]
            :min-lein-version "2.0.0"
            :hooks [environ.leiningen.hooks]
            :ring {:handler nevergreen.app/app :port 5000}
            :uberjar-name "nevergreen-standalone.jar"
            :main nevergreen.app
            :aot [nevergreen.app]
            :profiles {:dev        {:plugins      [[lein-midje "3.1.3"]
                                                   [lein-ancient "0.5.5"]
                                                   [lein-idea "1.0.1"]]
                                    :dependencies [[org.clojure/clojure "1.6.0"]
                                                   [midje "1.6.3"]]}
                       :production {:env {:production true}}})
