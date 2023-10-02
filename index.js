// Your code here
function createEmployeeRecord (employeeArray) {
    let employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
}

function createEmployeeRecords (employeeArrays) {
    let employees = [];
    employeeArrays.forEach(record => {
        employees.push(createEmployeeRecord(record))  
    });

    return employees;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let employeeObj = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    };
    employeeRecord.timeInEvents.push(employeeObj);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let employeeObj = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    };
    employeeRecord.timeOutEvents.push(employeeObj);
    return employeeRecord;
}

function hoursWorkedOnDate(record, date) {
    let time
    for (let i=0; i<record.timeInEvents.length; i++){
     if (record.timeInEvents[i].date === date){
        if (record.timeOutEvents[i].date === date){
            time = record.timeOutEvents[i].hour - record.timeInEvents[i].hour
        }
     }
     }
  return time/100
}

function wagesEarnedOnDate(record, date){
    return (hoursWorkedOnDate(record, date)) * record.payPerHour
  }
  
  function allWagesFor(record){
    let pay = [];
    let dates = [];
    for (let i = 0; i < record.timeInEvents.length; i++){
      dates.push(record.timeInEvents[i].date)
    }
    dates.forEach(date => {
      pay.push(wagesEarnedOnDate(record, date))
    });
    return pay.reduce(( accumulator, value ) => accumulator + value)
  }
  
  function calculatePayroll(recordArr){
    let payroll = [];
  
    recordArr.forEach(employee => {
        payroll.push(allWagesFor(employee)) 
    });
  
    return payroll.reduce((accumulator, value) => accumulator + value)
  }