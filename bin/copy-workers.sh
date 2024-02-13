#! /usr/bin/env bash

cp -r 'node_modules/@junobuild/core/dist/workers/' './public/workers'

mkdir -p './public/profile'
cp -r 'node_modules/@junobuild/core/dist/workers/' './public/profile/workers'

mkdir -p './public/auth'
cp -r 'node_modules/@junobuild/core/dist/workers/' './public/auth/workers'

mkdir -p './public/mail'
cp -r 'node_modules/@junobuild/core/dist/workers/' './public/mail/workers'
