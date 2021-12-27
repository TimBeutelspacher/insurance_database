var contracts = [];

contracts.push(
    {
        contractID: "C3500",
        customerID: "U1000",
        tarif: "Vollkasko Plus",
        startDate: new Date(2017,1,5)
    },{
        contractID: "C3501",
        customerID: "U1001",
        tarif: "Haftpflicht",
        startDate: new Date(2017,12,3)
    },{
        contractID: "C3502",
        customerID: "U1001",
        tarif: "Vollkasko Standard",
        startDate: new Date(2017,10,11)
    },{
        contractID: "C3503",
        customerID: "U1002",
        tarif: "Teilkasko Standard",
        startDate: new Date(2017,9,12)
    }
);


/*
    Cases-functions
 */

function getContractByContractNumber(reqContractID) {
    for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].contractID == reqContractID) {
            return contracts[i];
        }
    }
    return false;
}

function getCustomerIDByContractID(reqContractID) {
    for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].contractID == reqContractID) {
            return contracts[i].customerID;
        }
    }
    return false;
}

function getContractsBycustomerID(customerID) {
    var reqContracts = [];
    var foundContract = false;
    for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].customerID == customerID) {
            reqContracts.push(contracts[i].contractID)
            foundContract = true;
        }
    }
    if(foundContract){
        return reqContracts;
    }
    return false;
}




function getAllContracts() {
    return contracts;
}

module.exports = {contracts, getContractByContractNumber, getContractsBycustomerID, getAllContracts, getCustomerIDByContractID};