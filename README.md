# Simple Redir

## Docker

```
docker build -t catchlabs/redir:0.3.0 .
docker run -p 7000:80 -d catchlabs/redir
```