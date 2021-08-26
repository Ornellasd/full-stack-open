// import React from 'react';
// import { Modal } from 'semantic-ui-react';
// import AddEntryForm, { EntryFormValues } from './AddEntryForm';

// interface Props {
//   modalOpen: boolean;
//   onClose: () => void;
//   onSubmit: (values: EntryFormValues) => void;
// }

// const AddEntryModal = ({ modalOpen, onClose }: Props) => (
//   <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
//     <Modal.Header>Add a new Entry</Modal.Header>
//     <Modal.Content>
//       {/* <AddPatientForm onSubmit={onSubmit} onCancel={onClose} /> */}
//       <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
//     </Modal.Content>
//   </Modal>
// );

// export default AddEntryModal;
import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
