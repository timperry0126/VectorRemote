const { randomUUID } = require('crypto');

class PatientReport {
     constructor(patientName, date, summary) {
          this.id = randomUUID();
          this.patientName = patientName;
          this.date = date;
          this.summary = summary;
     }

     toObject() {
          return {
               id: this.id,
               patientName: this.patientName,
               date: this.date,
               summary: this.summary
          }
     }
}

module.exports = PatientReport;