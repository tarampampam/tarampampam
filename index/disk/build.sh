#!/usr/bin/env sh
# reference: https://github.com/leaningtech/webvm/blob/e351ccdfa52c0e11580db90f4369c8691ef79c27/.github/workflows/deploy.yml

set -xe

# build the image
docker build --file ./Dockerfile --tag disk:local --platform=i386 .

# preallocate space for the ext2 image
fallocate -l 6M ./disk.ext2

# format to ext2 linux kernel revision 0
mkfs.ext2 -F -r 0 ./disk.ext2

# create a directory for the fs
mkdir ./mnt

# mount the ext2 image to modify it
sudo mount -o loop -t ext2 ./disk.ext2 ./mnt

# run the docker image so that we can export the container
CONTAINER_ID=$(docker run -d --dns 1.1.1.1 --dns 1.0.0.1 disk:local sleep 5m)

# copy image content
sudo docker cp -a $CONTAINER_ID:/ ./mnt/

# unmount & cleanup
docker kill $CONTAINER_ID
docker rmi -f disk:local
sudo umount ./mnt
sudo rm -Rf ./mnt

# the .txt suffix enabled HTTP compression for free (for the GitHub)
#split ./disk.ext2 ./disk.c -a 6 -b 128k -x --additional-suffix=.txt
#bash -c "stat -c%s ./disk.ext2 > ./disk.meta"
