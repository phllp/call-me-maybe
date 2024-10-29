Run the following command inside of this directory in order to generate the SSL certificates

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout localhost-key.pem -out localhost-cert.pem -days 365
```
