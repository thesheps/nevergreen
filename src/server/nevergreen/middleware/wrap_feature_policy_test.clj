(ns nevergreen.middleware.wrap-feature-policy-test
  (:require [clojure.test :refer :all]
            [clojure.string :as s]
            [nevergreen.middleware.wrap-feature_policy :as subject]))

(deftest wrap-feature-policy

  (testing "allows autoplay so broken build sounds can be triggered automatically"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-feature-policy app) req)]
      (is (s/includes? (get (:headers res) "Feature-Policy") "autoplay 'self'"))))

  (testing "allows fullscreen"
    (let [app (constantly {})
          req {}
          res ((subject/wrap-feature-policy app) req)]
      (is (s/includes? (get (:headers res) "Feature-Policy") "fullscreen 'self'")))))
