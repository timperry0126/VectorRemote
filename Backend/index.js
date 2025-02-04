const express = require('express');

const PatientReport = require('./patientReport');
const { PatientReportFactory } = require('./patientReportFactory');
const LRUCache = require('./lruCache');
const { getRandomFullName, cleanString } = require('./utility')
const Tree = require('./patientTree');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const port = 3001;

const lruCache = new LRUCache(100);

const tree = new Tree();

// Seed DB ************

for (let i = 0; i < 100; i++) {
     const report = PatientReportFactory.generatePatientReport();
     tree.addNode(cleanString(report.patientName), report);
}

const patientZero = new PatientReport(getRandomFullName(), new Date(), "arrhythmia");
const patientZeroOne = new PatientReport(getRandomFullName(), new Date(), "tachycardia");
tree.addNode(cleanString(patientZero.patientName), patientZero);
tree.addNode(cleanString(patientZeroOne.patientName), patientZeroOne);

// *************

app.post('/patientReports', (req, res) => {
     const { patientName } = req.body;
     let patientReports;

     if(patientName) {
          const cachedRequest = lruCache.get(patientName)

          if(cachedRequest) {
               patientReports = cachedRequest;
          } else {
               patientReports = tree.getAllEntriesUnder(cleanString(patientName));
               lruCache.put(patientName, patientReports);
          }
     } else {
          patientReports = tree.getAllEntries();
     }

     return res.send({ patientReports }).end();
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`);
})