#!/usr/bin/env bash

SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
echo $SHELL_FOLDER
PREVIEW_PATH=$SHELL_FOLDER/dist/

yarn build:stage
cd $PREVIEW_PATH
git add ./
git commit -m "release-autocomplete"
git push origin master

echo "Finished"


