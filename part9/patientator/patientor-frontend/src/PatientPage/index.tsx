import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { setPatient } from "../state";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientInfoFromApi));
      } catch(e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const genderIcon = (): SemanticICONS => {
    switch (patient?.gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'genderless';
    }
  };
  
  const filteredDiagnosisName = (code: string): string => {
    return Object.values(diagnoses).filter((diagnosis: Diagnosis) => diagnosis.code === code )[0].name;
  };

  if(patient) {
    return (
      <div className="App">
        <h2>{patient.name} <Icon name={genderIcon()} /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry, index) =>
          <div key={index}>
            {entry.date} <em>{entry.description}</em>
            {entry.diagnosisCodes &&
              <ul>
                {entry.diagnosisCodes.map((code, index) =>
                  <li key={index}>
                    {code} {filteredDiagnosisName(code)}
                  </li>
                )}
              </ul>
            }
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;
