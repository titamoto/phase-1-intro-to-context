const employeeRecordArr = [firstName, familyName, title, payPerHour];
function createEmployeeRecord(employeeRecordArr) {
    return {
        firstName:employeeRecordArr[0],
        familyName:employeeRecordArr[1],
        title:employeeRecordArr[2],
        payPerHour:employeeRecordArr[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
    employeeRecordObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecordObj;
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    employeeRecordObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecordObj;
}

function hoursWorkedOnDate(employeeRecordObj, dateStamp) {
    const outEvent = employeeRecordObj.timeOutEvents.
    find(event => event.date === dateStamp.slice(0, 10));
    const inEvent = employeeRecordObj.timeInEvents.
    find(event => event.date === dateStamp.slice(0, 10));
    return (outEvent.hour - inEvent.hour)/100;
}

function wagesEarnedOnDate(employeeRecordObj, dateStamp) {
    return hoursWorkedOnDate(employeeRecordObj, dateStamp) * employeeRecordObj.payPerHour;
}

function allWagesFor(employeeRecordObj) {
    let total = 0;
    for (const event of employeeRecordObj.timeInEvents) {
        total += wagesEarnedOnDate(employeeRecordObj, event.date);
    }
    return total;
}

function calculatePayroll(arrayOfArrays) {
    let total = 0;
    for (const employeeRecordObj of arrayOfArrays) {
        total += allWagesFor(employeeRecordObj);
    }
    return total;

} 