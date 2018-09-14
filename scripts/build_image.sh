#!/usr/bin/env bash
dir=$(pwd -P)
cd ${dir}
cd ..
echo -n "# Building from: "
pwd
docker build -t cloud_floater .
