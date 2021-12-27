var workshops = [];

workshops.push(
    {
        workshopID: "W9000",
        name: "AutoGlass",
        city: "Stuttgart",
        email: "tim.beutelspacher@student.reutlingen-university.de"
    },{
        workshopID: "W9001",
        name: "AutoGlass",
        city: "Reutlingen",
        email: "lukas.scherzinger@student.reutlingen-university.de"
    },{
        workshopID: "W9002",
        name: "AutoGlass",
        city: "Tuebingen",
        email: "fabian.wallisch@student.reutlingen-university.de"
    }
);


/*
    workshop-functions
 */


function getWorkshopByWorkshopID(reqWorkshopID) {
    for (let i = 0; i < workshops.length; i++) {
        if (workshops[i].workshopID == reqWorkshopID) {
            return workshops[i];
        }
    }
    return false;
}

function getAllWorkshops() {
    return workshops;
}

function getWorkshopForCustomer(reqCustomerCity) {
    for (let i = 0; i < workshops.length; i++) {
        if (workshops[i].city == reqCustomerCity) {
            return workshops[i];
        }
    }
    return false;
}

module.exports = {workshops, getWorkshopForCustomer, getAllWorkshops, getWorkshopByWorkshopID};