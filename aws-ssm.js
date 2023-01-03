const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const ssm = new AWS.SSM();
let SECRETS;

const params = {
  Names: ["GOOGLE_CLIENT_ID", "GOOGLE_SECRET"],
  WithDecryption: true,
};

ssm.getParameters(params, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    SECRETS = data.Parameters;
  }
});

console.log(SECRETS);
