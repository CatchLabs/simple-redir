# Simple Redir

## Docker

```
docker build -t catchlabs/redir .
sudo docker run -p 7000:80 -v /home/zenozeng/catch/simple-redir/config:/usr/src/app/config -t catchlabs/redir
```
