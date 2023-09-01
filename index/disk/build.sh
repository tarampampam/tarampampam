#!/usr/bin/env sh
# reference: https://github.com/leaningtech/webvm/blob/e351ccdfa52c0e11580db90f4369c8691ef79c27/.github/workflows/deploy.yml

set -xe

# build the image
docker build --file ./Dockerfile --tag disk:local --platform=i386 .

# preallocate space for the ext2 image (size in bytes + 262144 (256 KiB))
fallocate -l $(( $(docker inspect -f "{{ .Size }}" disk:local) + 262144 )) ./image.bin

# format to ext2 linux kernel revision 0
sudo mkfs.ext2 -F -r 0 ./image.bin

# create a directory for the fs
mkdir ./mnt

# mount the ext2 image to modify it
sudo mount -o loop -t ext2 ./image.bin ./mnt

# run the docker image so that we can export the container
CONTAINER_ID=$(docker run -d --dns 1.1.1.1 --dns 1.0.0.1 disk:local sleep 5m)

# copy image content
sudo docker cp -a $CONTAINER_ID:/ ./mnt/

# unmount & cleanup
docker kill $CONTAINER_ID
docker image rm -f disk:local
sudo umount ./mnt
sudo rm -Rf ./mnt
