#!/usr/bin/env bash

# Check for prior run
check=`docker ps -a | grep cloud_floater | wc -l`
if [ ${check} -eq 1 ]
then
    docker stop cloud_floater
    docker rm cloud_floater
fi

# Build image
./build_image.sh

# Run image
echo "# Launching container"
docker run -dit --name cloud_floater -p 8080:80 cloud_floater
