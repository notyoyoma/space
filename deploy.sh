#!/usr/bin/env sh

# abort on errors
set -e

rm -rf dist
yarn build
cd dist
echo 'space.martynaselli.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:notyoyoma/space.git master:gh-pages

cd ..
rm -rf dist
