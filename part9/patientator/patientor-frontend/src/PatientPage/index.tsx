/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import React from 'react';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, setPatient } from '../state';
import { useParams } from 'react-router';
import { Icon, SemanticICONS, Button } from 'semantic-ui-react';
import EntryDetails from './Entry';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedEntry = (entry: any) => {
    const baseEntry = {
      date: entry.date,
      description: entry.description,
      diagnosisCodes: entry.diagnosisCodes,
      specialist: entry.specialist,
      type: entry.type
    };

    if(entry.type === 'Hospital') {
      const newEntry = {
        ...baseEntry,
        discharge: entry.discharge
      };
      
      return newEntry;
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    formattedEntry(values);
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        formattedEntry(values)
      );
      dispatch(setPatient(newEntry));
      closeModal();
    } catch(e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  if(patient) {
    return (
      <div className="Patient-Details">
        <h2>{patient.name} <Icon name={genderIcon()} /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
        <Button onClick={() => openModal()}>Add New Entry</Button>
        <h3>entries</h3>
        {patient.entries.map(entry =>
          <EntryDetails key={entry.id} entry={entry} />
        )}
        <AddEntryModal 
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          onClose={closeModal} 
        />
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;
