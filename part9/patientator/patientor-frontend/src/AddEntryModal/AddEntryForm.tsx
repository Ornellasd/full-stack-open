import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, EntryTypeOption, SelectField } from './EntryFormField';
import { EntryType, NewVisitEntry } from '../types';


/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<NewVisitEntry, 'type'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: { date: '', criteria: '' },
      }}
      onSubmit={onSubmit}
      // validate={values => {
      //   const requiredError = 'Field is required';
      //   const errors: { [field: string]: string } = {};
      //   if (!values.name) {
      //     errors.name = requiredError;
      //   }
      //   if (!values.ssn) {
      //     errors.ssn = requiredError;
      //   }
      //   if (!values.dateOfBirth) {
      //     errors.dateOfBirth = requiredError;
      //   }
      //   if (!values.occupation) {
      //     errors.occupation = requiredError;
      //   }
      //   return errors;
      // }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField
              label="Entry Type"
              name="entryType"
              options={entryTypeOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
