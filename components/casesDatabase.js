var cases = [];

cases.push(
    {
        caseID: "CA6000",
        contractNumber: "C3500",
        status: "laufend",
        caseLocation: "B27",
        caseDate: new Date(2020,3,12),
        value: 150.32,
        caseDescription: "Stein auf der Bundesstrasse gegen die Windschutzscheibe geknallt.",
        workshop: "AutoGlass"
    },{
        caseID: "CA6001",
        contractNumber: "C3500",
        status: "erfolgreich abgeschlossen",
        caseLocation: "B27",
        caseDate: new Date(2018,5,7),
        value: null,
        caseDescription: "Stein auf der Bundesstrasse gegen die Windschutzscheibe geknallt.",
        workshop: null
    },{
        caseID: "CA6002",
        contractNumber: "C3501",
        status: "laufend",
        caseLocation: "B27",
        caseDate: new Date(2019,3,12),
        value: null,
        caseDescription: "Stein auf der Bundesstrasse gegen die Windschutzscheibe geknallt.",
        workshop: null
    },{
        caseID: "CA6003",
        contractNumber: "C3501",
        status: "Betrugsversuch",
        caseLocation: "B27",
        caseDate: new Date(2019,1,5),
        value: null,
        caseDescription: "Stein auf der Bundesstrasse gegen die Windschutzscheibe geknallt.",
        workshop: null
    },{
        caseID: "CA6004",
        contractNumber: "C3501",
        status: "erfolgreich abgeschlossen",
        caseLocation: "B27",
        caseDate: new Date(2018,4,12),
        value: 425.59,
        caseDescription: "Stein auf der Bundesstrasse gegen die Windschutzscheibe geknallt.",
        workshop: "GlasFix"
    },{
        caseID: "CA6005",
        contractNumber: "C3502",
        status: "abgelehnt nach Gutachten",
        caseLocation: "B27",
        caseDate: new Date(2020,3,12),
        value: 512.92,
        caseDescription: "Stein auf der Bundesstrasse gegen die Windschutzscheibe geknallt.",
        workshop: "Car Repairshop"
    },{
        caseID: "CA6006",
        contractNumber: "C3502",
        status: "nicht abgedeckt",
        caseLocation: "B27",
        caseDate: new Date(2020,3,12),
        value: null,
        caseDescription: "Stein auf der Bundesstrasse gegen die Windschutzscheibe geknallt.",
        workshop: null
    },
);


/*
    Cases-functions
 */

function getCaseByCaseID(caseid) {
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].caseID == caseid) {
            return cases[i];
        }
    }
    return false;
}

function getAllCases() {
    return cases;
}

function editCase(reqCase){
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].caseID === reqCase.caseID) {

            cases[i].status = reqCase.status;
            cases[i].workshop = reqCase.workshop;
            cases[i].value = reqCase.value;
            return cases[i];
        }
    }
    return false;
}

function getNumSuccessful(reqContractID){
    var count = 0;
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].contractNumber === reqContractID) {
            if (cases[i].status == "erfolgreich abgeschlossen") {
                count++;
            }
        }
    }
    return count;
}

function getNumOngoing(reqContractID){
    var count = 0;
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].contractNumber === reqContractID) {
            if (cases[i].status == "laufend") {
                count++;
            }
        }
    }
    return count;
}

function getNumRejected(reqContractID){
    var count = 0;
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].contractNumber === reqContractID) {
            if (cases[i].status == "abgelehnt nach Gutachten") {
                count++;
            }
        }
    }
    return count;
}

function getNumNotCovered(reqContractID){
    var count = 0;
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].contractNumber === reqContractID) {
            if (cases[i].status == "nicht abgedeckt") {
                count++;
            }
        }
    }
    return count;
}

function getPreviousFraud(reqContractID){
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].contractNumber === reqContractID) {
            if (cases[i].status == "Betrugsversuch") {
                return true;
            }
        }
    }
    return false;
}

module.exports = {cases, getCaseByCaseID, getAllCases, editCase, getNumSuccessful, getNumOngoing, getNumRejected, getPreviousFraud, getNumNotCovered};