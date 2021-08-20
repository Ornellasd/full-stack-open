import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { setPatient } from "../state";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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

  if(patient) {
    return (
      <div className="App">
        <h2>{patient.name} <Icon name={genderIcon()} /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;
