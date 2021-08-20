import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/d2773822-f723-11e9-8f0b-362b9e155667`
        );
        dispatch({ type: 'SET_PATIENT', payload: patientInfoFromApi });
      } catch(e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  console.log(patient);
  
  return (
    <div>
      <p>DERP</p>
    </div>
  );
};

export default PatientPage;
