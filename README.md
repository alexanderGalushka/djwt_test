# djwt_test

1. bundle djwt lib:

`rm djwt.js || true && deno bundle "https://deno.land/x/djwt@v1.9/mod.ts"  > djwt.js`

2. run webserver:

`deno run --allow-net main.js`

3. curl localhost:8080 -vv

would return jwt token

4. curl -H 'Authorization: bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWZXJpem9uTWVkaWEiLCJleHAiOjE2MDQ5MDI5NzEsInByb2plY3QiOiJFZGdlQ29tcHV0ZSJ9.0p_IDMRuQxWUIxJ4zvnXqTUHsUvjmWR5QU--iOwrJGVC_-I6nmv2rs_WzNQ7cq_WtzfsjK8M8hoAI34BWm9j4g' -X POST localhost:8080 -vv

observe server error

```
ReferenceError: convertUint8ArrayToHex is not defined
```
