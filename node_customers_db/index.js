const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');
const auth = require('./services/authenticate');

const app = express();
app.use(bodyParser.json());

const port = 3000;

process.env.SECRET_KEY = "XXX";

//ROUTES for REST API
app.get("/api/customers", auth.authenticate, query.getAllCustomers);
app.get("/api/customers/:id", auth.authenticate, query.getCustomerById);
app.post("/api/customers", auth.authenticate, query.addCustomer);
app.delete("/api/customers/:id", auth.authenticate, query.deleteCustomer);
app.put("/api/customers/:id", auth.authenticate, query.updateCustomer);

//ROUTE for login
app.post("/login", auth.login);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${port}.`)
})

module.exports = app;