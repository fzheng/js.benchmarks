#  Socket.io with SSL

- Set up SSL certificate

```
$ openssl genrsa 1024 > file.pem
$ openssl req -new -key file.pem -out csr.pem
$ openssl x509 -req -days 365 -in csr.pem -signkey file.pem -out file.crt
$ node app.js
```

- Now visit https://localhost:7443