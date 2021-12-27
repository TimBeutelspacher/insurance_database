var customers = [];

customers.push(
    {
        customerID: "U1000",
        firstName: "Lisa",
        lastName: "Mueller",
        email: "lisa.mueller@gmail.com",
        phoneNumber: "+4917632314271",
        postalCode: "70619",
        city: "Stuttgart",
        street: "Glücksweg 77",
        country: "Deutschland"
    },{
        customerID: "U1001",
        firstName: "Bernd",
        lastName: "Brand",
        email: "bernd.brandy@web.de",
        phoneNumber: "+4917632364389",
        postalCode: "72762",
        city: "Reutlingen",
        street: "Alteburgstraße 150",
        country: "Deutschland"
    },{
        customerID: "U1002",
        firstName: "Berta",
        lastName: "Bunt",
        email: "bunteberta@gmail.com",
        phoneNumber: "+4917632367992",
        postalCode: "72074",
        city: "Tuebingen",
        street: "Geschwister-Scholl-Platz 1",
        country: "Deutschland"
    }
);


/*
    Customers-functions
 */

function getCustomerByContractNumber(contractID) {
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].contractNumber === contractID) {
            return customers[i];
        }
    }
    return false;
}

function getCustomerBycustomerID(reqcustomerID) {
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].customerID === reqcustomerID) {
            return customers[i];
        }
    }
    return false;
}

function existsContractnumber(contractID) {
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].contractNum === contractID) {
            return true;
        }
    }

    return false;
}

function getAllCustomers() {
    return customers;
}


module.exports = {customers, getCustomerByContractNumber, existsContractnumber, getAllCustomers, getCustomerBycustomerID};