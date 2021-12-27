var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const port = normalizePort(process.env.PORT || '3000');
var fs = require('fs');

app.use(bodyParser.json());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello Worldasdsa!');
});


/**
 *  Databases
 */
const customersDatabaseExport = require('./components/customersDatabase.js');
const casesDatabaseExport = require('./components/casesDatabase.js');
const contractsDatabaseExport = require('./components/contractDatabase.js');
const workshopsDatabaseExport = require('./components/workshopDatabase.js');

/**
 *  Variables to create IDs
 */
let casesCounter = 6007;

/**
 * Middlewares
 */
// REQUEST LOGGER: Application level middleware, active for all endpoints
app.use('*', (req, res, next) => {

    const date = new Date();
    const currentDateIso = date.toISOString();

    var logText = `REQUEST: Time: ${currentDateIso} |Path: ${req.params[0]} |IP-Address: ${req.ip} |User agent: ${req.get('user-agent')} \n`;

    fs.appendFile('logFile.txt', logText, function (err) {
        if (err) throw err;
        console.log('REQUEST LOGGER Updated!');
    });

    next();
});


/**
 *  Customers - Routes
 */

/*
GET /customers/:customerID
Reading one customer
 */
app.get('/customers/:customerID', (req, res) => {

    const copyCustomerBody = customersDatabaseExport.getCustomerBycustomerID(req.params.customerID);

    if (copyCustomerBody === false) {
        return res.status(404).json({"message": "Customer does not exist."});
    }

    return res.status(200).json(copyCustomerBody);
});


/*
GET /customersByContract/:contractID
Reading one customer by contractID
 */
app.get('/customersByContract/:contractID', (req, res) => {

    const reqCustomerID = contractsDatabaseExport.getCustomerIDByContractID(req.params.contractID);
    if (reqCustomerID === false) {
        return res.status(404).json({"message": "Contract does not exist."});
    }

    const copyCustomerBody = customersDatabaseExport.getCustomerBycustomerID(reqCustomerID);

    if (copyCustomerBody === false) {
        return res.status(404).json({"message": "Customer does not exist."});
    }

    const copyContractBody = contractsDatabaseExport.getContractByContractNumber(req.params.contractID);
    if (reqCustomerID === false) {
        return res.status(404).json({"message": "Contract does not exist."});
    }

    copyCustomerBody.tarif = copyContractBody.tarif;
    copyCustomerBody.startDate = copyContractBody.tarifStart;


    return res.status(200).json(copyCustomerBody);
});



/*
GET /customers
Reading all customers
 */
app.get('/customers', (req, res) => {

    const copyCustomerBody = customersDatabaseExport.getAllCustomers();

    if (copyCustomerBody === false) {
        return res.status(404).json({"message": "No customers exists."});
    }

    return res.status(200).json(copyCustomerBody);
});


/**
 *  contracts - Routes
 */

/*
GET /contracts/:contractID
Reading one contracts
 */
 app.get('/contracts/:contractID', (req, res) => {

    const copyContractBody = contractsDatabaseExport.getContractByContractNumber(req.params.contractID);

    if (copyContractBody === false) {
        return res.status(404).json({"message": "Contract doesnt exist."});
    }

    return res.status(200).json(copyContractBody);
});

/*
GET /contracts
Reading all contracts
 */
app.get('/contracts', (req, res) => {

    const copyContractBody = contractsDatabaseExport.getAllContracts();

    if (copyContractBody === false) {
        return res.status(404).json({"message": "No Contracts exists."});
    }

    return res.status(200).json(copyContractBody);
});



/**
 *  Cases - Routes
 */

/*
GET /cases/:caseID
Reading one case
 */
app.get('/cases/:caseNum', (req, res) => {

    const copyCaseBody = casesDatabaseExport.getCaseByCaseID(req.params.caseNum);

    if (copyCaseBody === false) {
        return res.status(404).json({"message": "Case does not exist."});
    }

    return res.status(200).json(copyCaseBody);
});

/*
GET /cases
Reading all cases
 */
app.get('/cases', (req, res) => {

    const copyCaseBody = casesDatabaseExport.getAllCases();

    if (copyCaseBody === false) {
        return res.status(404).json({"message": "Case does not exist."});
    }

    return res.status(200).json(copyCaseBody);
});


/*
POST /cases/create
Register a new case
 */
app.post('/cases/create', (req, res) => {

    // If the one of the parameters is empty, send a "Bad-Request"-Response
    if (!req.body.caseLocation) {
        return res.status(400).json({"message": "Request requires a caseLocation."});
    } else if (!req.body.caseDate) {
        return res.status(400).json({"message": "Request requires a caseDate."});
    } else if (!req.body.contractID) {
        return res.status(400).json({"message": "Request requires a contractID."});
    }

    const copyCaseBody = req.body;

    //Add a caseID to the body
    copyCaseBody.caseID = `CA${casesCounter++}`;
    copyCaseBody.value = null;
    copyCaseBody.workshop = null;
    copyCaseBody.status = "laufend";
    if (!req.body.caseDescription) {
        copyCaseBody.caseDescription = null;
    }

    // Saving the received Object
    casesDatabaseExport.cases.push(copyCaseBody);

    return res.status(201).json(copyCaseBody);
});

/*
PUT /cases/:caseID
Register a new case
 */
app.put('/cases/:caseID', (req, res) => {

    const copyCaseBody = casesDatabaseExport.getCaseByCaseID(req.params.caseID);
    if (copyCaseBody === false) {
        return res.status(404).json({"message": "Case does not exist."});
    }

    const copyReqBody = req.body;

    if (!req.body.workshop) {
    }else{
        copyCaseBody.workshop = copyReqBody.workshop;
    }

    if (!req.body.status) {
    }else{
        copyCaseBody.status = copyReqBody.status;
    }

    if (!req.body.costs) {
    }else{
        copyCaseBody.value = copyReqBody.costs;
    }

    // update database
    casesDatabaseExport.editCase(copyCaseBody)

    return res.status(201).json(copyCaseBody);
});


/**
 *  workshops - Routes
 */

/*
GET /workshop/:workshopID
Read single workshop
 */
app.get('/workshops/:workshopID', (req, res) => {

    const workshopBody = workshopsDatabaseExport.getWorkshopByWorkshopID(req.params.workshopID)

    if (workshopBody === false) {
        return res.status(404).json({"message": "Workshop does not exist."});
    }

    return res.status(200).json(workshopBody);
});

/*
GET /workshops
Read single workshop
 */
app.get('/workshops', (req, res) => {

    const workshopBody = workshopsDatabaseExport.getAllWorkshops()

    if (workshopBody === false) {
        return res.status(404).json({"message": "No workshops exists."});
    }
    
    return res.status(200).json(workshopBody);
});

/*
GET /workshop/:customerID
Find best workshop for customer
 */
app.get('/workshopForCustomer/:customerID', (req, res) => {

    const copyCustomerBody = customersDatabaseExport.getCustomerBycustomerID(req.params.customerID);

    if (copyCustomerBody === false) {
        return res.status(404).json({"message": "Customer does not exists."});
    }

    const workshopBody = workshopsDatabaseExport.getWorkshopForCustomer(copyCustomerBody.city)

    return res.status(200).json(workshopBody);
});


/**
 *  fraud detection - Routes
 */

/*
GET /fraudDetectionData/:contractID
Read fraud data by contractID
*/
 app.get('/fraudDetectionDataContract/:contractID', (req, res) => {

    const copyContractBody = contractsDatabaseExport.getContractByContractNumber(req.params.contractID);

    if (copyContractBody === false) {
        return res.status(404).json({"message": "Contract doesnt exist."});
    }

    const fraudDataBody = {
        numErfolgreich: casesDatabaseExport.getNumSuccessful(req.params.contractID),
        numLaufend: casesDatabaseExport.getNumOngoing(req.params.contractID),
        numAbgelehnt: casesDatabaseExport.getNumRejected(req.params.contractID),
        previousFraudDetected: casesDatabaseExport.getPreviousFraud(req.params.contractID),
        tarifAbschluss: copyContractBody.startDate
    };

    /*
    fraudDataBody.numErfolgreich = casesDatabaseExport.getNumSuccessful(req.params.contractID);
    fraudDataBody.numLaufend = casesDatabaseExport.getNumOngoing(req.params.contractID);
    fraudDataBody.numAbgelehnt = casesDatabaseExport.getNumRejected(req.params.contractID);
    fraudDataBody.previousFraudDetected = casesDatabaseExport.getPreviousFraud(req.params.contractID);
    fraudDataBody.tarifAbschluss = copyContractBody.startDate;
    */
    return res.status(200).json(fraudDataBody);
});


/*
GET /fraudDetectionData/:customerID
Read fraud data by customerID
*/
app.get('/fraudDetectionData/:customerID', (req, res) => {

    const copyCustomerBody = customersDatabaseExport.getCustomerBycustomerID(req.params.customerID);

    if (copyCustomerBody === false) {
        return res.status(404).json({"message": "Customer does not exists."});
    }

    const contractIDsOfCustomer = contractsDatabaseExport.getContractsBycustomerID(req.params.customerID);

    var numErfolgreich = 0;
    var numLaufend = 0;
    var numAbgelehnt = 0;
    var numNichtAbgedeckt = 0;
    var previousFraudDetected = false;

    for (let i = 0; i < contractIDsOfCustomer.length; i++) {
        numErfolgreich += casesDatabaseExport.getNumSuccessful(contractIDsOfCustomer[i]);
        numLaufend += casesDatabaseExport.getNumOngoing(contractIDsOfCustomer[i]);
        numAbgelehnt += casesDatabaseExport.getNumRejected(contractIDsOfCustomer[i]);
        numNichtAbgedeckt += casesDatabaseExport.getNumNotCovered(contractIDsOfCustomer[i]);

        if(!previousFraudDetected){
            previousFraudDetected = casesDatabaseExport.getPreviousFraud(contractIDsOfCustomer[i])
        }
    }

    const fraudDataBody = {
        resNumErfolgreich: numErfolgreich,
        resNumLaufend: numLaufend,
        resNumAbgelehnt: numAbgelehnt,
        resNumNichtAbgedeckt: numNichtAbgedeckt,
        resPreviousFraudDetected: previousFraudDetected,
        contracts: contractIDsOfCustomer
    };

    return res.status(200).json(fraudDataBody);
});



/*
Help-functions
*/
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


app.listen(process.env.PORT || 3000, function () {
    console.log('Insurance app listening on port 3000!');
  });
