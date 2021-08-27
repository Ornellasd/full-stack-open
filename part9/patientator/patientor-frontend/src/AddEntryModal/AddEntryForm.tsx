import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, EntryTypeOption, SelectField, DiagnosisSelection } from './EntryFormField';
import { EntryType, NewVisitEntry } from '../types';
import { useStateValue } from '../state';


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
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: { date: '', criteria: '' },
        type: EntryType.HealthCheck
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const formatError = 'Formatted incorrectly';
        const errors: { [field: string]: string } = {};
        if(!values.description) {
          errors.description = requiredError;
        }
        if(!values.date) {
          errors.date = requiredError;
        }
        if(!values.specialist) {
          errors.specialist = requiredError;
        }
        if(values.type === 'Hospital' && !values.discharge.date || !values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        if(typeof values.description !== 'string') {
          errors.description = formatError;
        }
        if(typeof values.date !== 'string') {
          errors.date = formatError;
        }
        if(typeof values.specialist !== 'string') {
          errors.specialist = formatError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
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
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
            />
            {values.type === 'Hospital' &&
              <div style={{ paddingBottom: '10px' }}>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            }

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
