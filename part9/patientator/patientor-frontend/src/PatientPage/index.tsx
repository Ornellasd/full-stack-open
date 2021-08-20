import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
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
