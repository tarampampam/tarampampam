#!/usr/bin/env sh

# build the image
sudo docker build --file ./disk/Dockerfile --tag index_disk:local --platform=i386 ./disk

# preallocate space for the ext2 image
sudo fallocate -l 6M ./index_disk

# format to ext2 linux kernel revision 0
sudo mkfs.ext2 -r 0 ./index_disk

# create a directory for the fs
mkdir ./mnt

# mount the ext2 image to modify it
sudo mount -o loop -t ext2 ./index_disk ./mnt

# copy image content
sudo docker create --name index_disk index_disk:local
sudo docker cp -a index_disk:/ ./mnt
sudo docker rm index_disk

# unmount & cleanup
sudo umount ./mnt
rm -R ./mnt

mkdir ./public/disk
mv -vf ./index_disk ./public/disk/disk.ext2
split ./public/disk/disk.ext2 ./public/disk/disk.c -a 6 -b 128k -x --additional-suffix=.txt
bash -c "stat -c%s ./public/disk/disk.ext2 > ./public/disk/disk.meta"
