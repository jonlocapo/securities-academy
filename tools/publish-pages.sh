#!/bin/sh
# Publish the site: GitHub Pages serves the gh-pages branch, which is the app/ folder of main.
# Run from the repo root after committing on main.
set -e
git subtree split --prefix app -b gh-pages-tmp
git push -f origin gh-pages-tmp:gh-pages
git branch -D gh-pages-tmp
