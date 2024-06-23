#!/bin/bash
echo "starting"

sudo su -

cd /root/Taas/backend/

# Run the backend service
/usr/bin/python3 main.py &

# Run the frontend app
cd /root/Taas/taas-frontend
/root/.nvm/versions/node/v20.13.1/bin/serve -s build