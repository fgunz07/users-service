import jwt from "passport-jwt";

const Strategy = jwt.Strategy;
const Extract = jwt.ExtractJwt;

console.log(process.env.PUBLIC_KEY);

const access = new Strategy(
  {
    jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
    // issuer: "",
    // audience: "",
    secretOrKey: process.env.PUBLIC_KEY,
    algorithms: ["RS256"],
  },
  (payload, done) => {
    done(null, payload);
  }
);

export default access;
