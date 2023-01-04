const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
require("dotenv").config();
const key = process.env.ACCESS_KEY;
const secret_key = process.env.SECRET_KEY;
AWS.config.credentials = new AWS.Credentials(key, secret_key);
const ssm = new AWS.SSM();

const getParameters = async () => {
  const params = {
    Names: ["GOOGLE_CLIENT_ID", "GOOGLE_SECRET", "GOOGLE_CALLBACK"],
    WithDecryption: true,
  };

  try {
    const data = await ssm.getParameters(params).promise();
    return data.Parameters;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getParameters;

//const SECRETS = await getParameters();
//const GOOGLE_CLIENT_ID = SECRETS[0].Value
//const GOOGLE_SECRET = SECRETS[1].Value
//const GOOGLE_CALLBACK = SECRETS[2].Value