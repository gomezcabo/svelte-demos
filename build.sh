#!/bin/sh
for demo in `ls demos`
do
  cd "demos/$demo"
  npm install
  npm run build
  cd ../..
done
