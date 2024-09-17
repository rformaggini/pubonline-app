#!/bin/bash
#install docker
    sudo apt-get update -y &&
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg-agent \
        software-properties-common &&
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" &&
    sudo apt-get update -y &&
    sudo sudo apt-get install docker-ce docker-ce-cli containerd.io -y &&
    sudo usermod -aG docker ubuntu
    sudo systemctl enable docker.service
    sudo systemctl enable containerd.service

#install docker compose
    #sudo apt install docker-compose -y

#access user root
    #sudo su

#create directory for angular application
    #sudo mkdir app

#create directory for runner
    sudo mkdir actions-runner && sudo cd actions-runner

#download runner
    sudo curl -o actions-runner-linux-x64-2.319.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.319.1/actions-runner-linux-x64-2.319.1.tar.gz

#extract runner
    sudo tar xzf ./actions-runner-linux-x64-2.319.1.tar.gz

#configuring runner to conect EC2
    sudo sudo RUNNER_ALLOW_RUNASROOT=true ./config.sh --url https://github.com/rformaggini/pubonline-app --token AMTFRHC7FUWL4YZTQA2PKTDG5HAHY

#installs svc agent job
    sudo ./svc.sh install

#start the listing job
    sudo ./svc.sh start

#curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
#source ~/.bashrc
#nvm install --lts

#sudo apt update -y
#sudo apt install nginx -y
#sudo service nginx start

