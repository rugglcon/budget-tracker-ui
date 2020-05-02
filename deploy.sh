#!/bin/bash

npm ci

npm run build:prod

status=$?
if [ $status -ne 0 ]; then
    echo "Something went wrong building for prod"
    exit 1
fi

/bin/cp -R dist/budget-tracker/* /var/www/budget-tracker-ui
