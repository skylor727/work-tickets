const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const pool = require("../db");
const getSecrets = require("../aws-ssm");

const SECRETS = getSecrets();
const GOOGLE_CLIENT_ID = SECRETS[0].Value;
const GOOGLE_SECRET = SECRETS[1].Value;
const GOOGLE_CALLBACK = SECRETS[2].Value;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: GOOGLE_CALLBACK,
    },
    async (_, __, profile, done) => {
      const account = profile._json;
      let user = {};
      try {
        const currentUserQuery = await pool.query(
          "SELECT * FROM users WHERE google_id=$1",
          [account.sub]
        );
        //USER DOES NOT EXIST
        if (currentUserQuery.rows.length === 0) {
          await pool.query(
            "INSERT INTO users (username, img, google_id) VALUES ($1,$2,$3)",
            [account.name, account.picture, account.sub]
          );
          const id = await pool.query(
            "SELECT id FROM users WHERE google_id=$1",
            [account.sub]
          );
          user = {
            id: id.rows[0].id,
            username: account.name,
            img: account.picture,
          };
        } else {
          //USER ALREADY EXISTS
          user = {
            id: currentUserQuery.rows[0].id,
            username: currentUserQuery.rows[0].username,
            img: currentUserQuery.rows[0].img,
          };
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
