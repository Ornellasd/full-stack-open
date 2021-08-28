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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatient(newEntry));
      closeModal();
    } catch(e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  if(!patient) return null;
  
  return (
    <div className="Patient-Details">
      <h2>{patient.name} <Icon name={genderIcon()} /></h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <Button onClick={() => openModal()}>Add New Entry</Button>
      {patient.entries.length > 0 &&
        <div style={{ paddingTop: '10px' }}>
          <h3>entries</h3>
          {patient.entries.map(entry =>
            <EntryDetails key={entry.id} entry={entry} />
          )}
        </div>
      }
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal} 
      />
    </div>
  );
};

export default PatientPage;
