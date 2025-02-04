import React, { useState } from 'react';

const FetchUserReports = async (setpatientReports, patientNameInput: string) => {
     try {
          const response = await fetch("http://localhost:3001/patientReports", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    patientName: patientNameInput
               }),
          });

          if (!response.ok) {
               console.error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          const shouldAlert = data.patientReports.filter((patientReport: { summary: string }) => {
               return patientReport.summary.includes("tachycardia") || patientReport.summary.includes("arrhythmia");
          })

          if(shouldAlert.length > 0) {
               alert("tachycardia or arrhythmia detected");
          }
          setpatientReports(data.patientReports)
     } catch (error) {
          console.error("Error:", error);
     }
}

export default function Home() {
     const [patientReports, setpatientReports] = useState([]);
     const [patientNameInput, setPatientNameInput] = useState('');

     const handleInputChange = (event) => {
          setPatientNameInput(event.target.value); // Update state on change
     };

     return (
          <div>
               <input
                    type="text"
                    value={patientNameInput}
                    onChange={handleInputChange}
                    placeholder="Type something..."
               />
               <button onClick={() => FetchUserReports(setpatientReports, patientNameInput)}>Send</button>

               <h2>Patient Records</h2>
               <table border="1">
                    <thead>
                         <tr>
                              {patientReports.length > 0 && Object.keys(patientReports[0]).map((key) => (
                                   <th key={key}>{key}</th>
                              ))}
                         </tr>
                    </thead>
                    <tbody>
                         {patientReports.map((item, index) => (
                              <tr key={index}>
                                   {Object.values(item).map((value, i) => (
                                        <td key={i}>{value}</td>
                                   ))}
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
}
