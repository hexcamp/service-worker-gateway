#! /bin/bash

cd dist

rsync -vaP . root@nuc-home:/var/lib/rancher/k3s/storage/pvc-ead16f9e-8b07-495d-b7e6-c8c3f9afabaf_gkgv6_ipfs-service-worker-gateway
