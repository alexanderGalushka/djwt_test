import { create, getNumericDate, verify } from "./djwt.js";

import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const authHeaderKey = "authorization";
const bearerLowerCaseKey = "bearer ";
const bearerUpperCaseKey = "Bearer ";
const secret = "secret";
const algorithm = "HS512";

function createErrorResponse(msg) {
  return JSON.stringify({
    msg: msg,
  });
}

(async function main() {
    const server = serve(`0.0.0.0:8080`);
    console.log("testing djwt")
    for await (const req of server) {
        switch (req.method) {
            case "GET": {
              const header = {
                alg: algorithm,
                typ: "JWT",
              };
              const expDate = getNumericDate(60 * 60 * 24);
              const payload = {
                iss: "dwjt_testing",
                exp: expDate,
              };
              let jwt = await create( header, payload, secret );
              const result = JSON.stringify({
                token: jwt,
              });
              req.respond({
                status: 200,
                body: result,
              });
              break;
            }
            case "POST": {
              const authHeader = req.headers.get(authHeaderKey);
              console.log(authHeader);
              if (authHeader != undefined) {
                let jwt = authHeader;
                if (authHeader.includes(bearerLowerCaseKey)) {
                  jwt = jwt.split(bearerLowerCaseKey)?.[1];
                } else if (authHeader.includes(bearerUpperCaseKey)) {
                  jwt = jwt.split(bearerUpperCaseKey)?.[1];
                }
                jwt = jwt.trim();
                try {
                  const payload = await verify(jwt, secret, algorithm);
                  const result = JSON.stringify(payload);
                  req.respond({
                    status: 200,
                    body: result,
                  });
                } catch (e) {
                  console.log(e);
                  req.respond({
                    status: 401,
                    body: createErrorResponse("invalid token"),
                  });
                }
              } else {
                req.respond({
                  status: 400,
                  body: createErrorResponse("authorization header is missing"),
                });
              }
            }
        }
    }
})();

