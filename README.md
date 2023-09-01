# node.js-tf-typescript
Experiment on web server built with node.js, typescript and tensorflow.js


## Installation
```shell
npm install --save-dev typescript @types/node
```

## cudnn

```shell
# https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html

sudo dpkg -i cudnn-local-repo-ubuntu2204-8.9.4.25_1.0-1_amd64.deb

sudo cp /var/cudnn-local-repo-ubuntu2204-8.9.4.25/cudnn-local-3C3A81D3-keyring.gpg /usr/share/keyrings/

sudo apt-get update

sudo apt-get install libcudnn8-samples=8.9.4.25-1+cuda12.2


tar -xvf cudnn-linux-x86_64-8.9.4.25_cuda12-archive.tar.xz

sudo cp /home/xiao/Downloads/cudnn-linux-x86_64-8.9.4.25_cuda12-archive/include/cudnn*.h /usr/local/cuda/include 

sudo cp -P /home/xiao/Downloads/cudnn-linux-x86_64-8.9.4.25_cuda12-archive/lib/libcudnn* /usr/local/cuda/lib64 

sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*

# verify
cp -r /usr/src/cudnn_samples_v8/ $HOME

cd  $HOME/cudnn_samples_v8/mnistCUDNN

sudo apt-get install libfreeimage3 libfreeimage-dev

make clean && make

./mnistCUDNN

npm install @tensorflow/tfjs-node

npm install @tensorflow/tfjs-node-gpu

```

