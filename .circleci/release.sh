#!/bin/bash -eu

echo "deploying to production"
scp ./target/nevergreen-standalone.jar nevergreen@35.176.75.186:/home/nevergreen/deploy/production
ssh nevergreen@35.176.75.186 "sudo /bin/systemctl restart nevergreen-production-1"
ssh nevergreen@35.176.75.186 "sudo /bin/systemctl restart nevergreen-production-2"
