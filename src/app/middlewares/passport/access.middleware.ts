import jwt from "passport-jwt";
import { publicKey } from "../../../utils/keys.util";

const Strategy = jwt.Strategy;
const Extract = jwt.ExtractJwt;

const access = new Strategy(
  {
    jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
    // issuer: "",
    // audience: "",
    secretOrKey: publicKey(),
    algorithms: ["RS256"],
  },
  (payload, done) => {
    done(null, payload);
  }
);

export default access;
