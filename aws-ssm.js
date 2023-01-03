const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const ssm = new AWS.SSM();

const params = {
  Name: "GOOGLE_CLIENT_ID",
  WithDecryption: true,
};

ssm.getParameter(params, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.Parameter.Value);
  }
});
