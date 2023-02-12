import path from "path"
import fs from "fs"

import jwt from "passport-jwt";

const Strategy = jwt.Strategy;
const Extract = jwt.ExtractJwt;

const access = new Strategy(
  {
    jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
    secretOrKey: fs.readFileSync(path.join(__dirname, "..", "..", "..", "..", "keys", "public.pem"), "utf8"),
    algorithms: ["RS256"]
  },
  (payload, done) => {
    console.log(payload);
    done(null, payload);
  }
);

export default access;
