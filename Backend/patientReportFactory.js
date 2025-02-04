const PatientReport = require('./patientReport');
const { getRandomFullName } = require('./utility');

module.exports.PatientReportFactory = {
     generatePatientReport () {
          const patientName = getRandomFullName();
          const year = Math.ceil(Math.random() * 100) + 1950; // Year
          const month = Math.floor(Math.random() * 12);
          const daysInAMonth = new Date(year, month + 1, 0).getDate()
          const day = Math.ceil(Math.random() * daysInAMonth);
          const date = new Date(
               year,
               month,
               day
          );

          const summary = "Lorem Ipsum".repeat(Math.ceil(Math.random() * 10));

          return new PatientReport(patientName, date, summary).toObject();
     }
};