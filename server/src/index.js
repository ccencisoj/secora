const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT;

mongoose.connect("mongodb://localhost:27017/truecolor")
  .then(()=> {
    app.listen(port, ()=> {
      console.log(`server listening on port ${port}`);
    });
  })
  .catch(()=> {
    console.log("There is a problem in the db connection");
  });
  