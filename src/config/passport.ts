import {User} from "../models/User";

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'key',
    algorithm: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({where: {id: payload.sub}})
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null))
});

module.exports = (passport) => {
    passport.use(strategy);
}