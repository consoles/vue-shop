#!/bin/bash

# chmod to prevent nginx 403
chmod +r dist/static/images/*.jpg
chmod +r dist/static/images/*.png

# setup api server
pm2 start server/bin/cluster

# timeout
# sleep 5

# setup chrome
google-chrome http://127.0.0.1/ &

# setup tunel,this is optional
/home/consoles/ngrok/ngrok -config=/home/consoles/ngrok/ngrok.cfg -subdomain consoles 80
