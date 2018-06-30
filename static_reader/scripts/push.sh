#!/bin/bash

cp -r reader ../../readerisdead-pages/
cd ../../readerisdead-pages
git add .
git commit . -m "Update static_reader pages"
git push origin gh-pages
