#!/bin/bash

set -e

echo "> Building C++ application"
cd ./cpp/
bash ./build.sh

echo "> Installing web application dependencies"
cd ../web/
npm install

echo "> Building web application"
npm run build

echo "> Starting web application"
npm start
