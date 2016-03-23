# JavaScript Triggers Test (Deprecated)
triggers have been added into uEngine's unit test
```
$ cd jacks.engine/uEngine && npm test
```

## Triggers
### Data Validation
* [Server-Side Injection](main/express/serversideinjection)

### View
* [Cross-Site Scripting](main/express/xss)
* [Insecure Script](main/express/insecurescript)

### Route
* [Open Redirect](main/express/openredirect)

### Encryption
* [Client-Side PRNG](main/express/randomclient)
* [Server-Side PRNG](main/express/randomserver)

### Persistence
* [Mongo: Mass Assignment](main/express/massassignment)
* [Mongo: Untrusted Input in Find](main/express/untrustedfindinput)

### State Management
* [X-Powered-By](main/express/xpoweredby)
* [HTTP Only Session](main/express/httponlysession)
* [Secure Session](main/express/securesession)

### Hapi related triggers
* [Hapi](main/hapi)