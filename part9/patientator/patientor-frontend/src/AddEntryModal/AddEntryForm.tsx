import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, EntryTypeOption, SelectField, DiagnosisSelection, NumberField } from '../components/FormField';
import { EntryType, NewVisitEntry } from '../types';
import { useStateValue } from '../state';

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

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof Number(num) === 'number';
};

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
        sickLeave: { startDate: '', endDate: '' },
        employerName: '',
        healthCheckRating: 0, 
        type: EntryType.Hospital
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
        if(typeof values.description !== 'string') {
          errors.description = formatError;
        }
        if(typeof values.date !== 'string') {
          errors.date = formatError;
        }
        if(typeof values.specialist !== 'string') {
          errors.specialist = formatError;
        }
        if(values.type === EntryType.Hospital && (!values.discharge.date || !values.discharge.criteria)) {
          errors.discharge = requiredError;
        }
        if(values.type === EntryType.OccupationalHealthcare && (!isString(values.sickLeave.startDate) || !isString(values.sickLeave.endDate))) {
          errors.sickLeave = formatError;
        }
        if(values.type === EntryType.OccupationalHealthcare && !isString(values.employerName)) {
          errors.sickLeave = formatError;
        }
        if(values.type === EntryType.HealthCheck && values.healthCheckRating === null) {
          errors.healthCheckRating = requiredError;
        }
        if(values.type === EntryType.HealthCheck && !isNumber(values.healthCheckRating)) {
          errors.healthCheckRating = formatError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
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
            {values.type === EntryType.Hospital &&
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
            {values.type === EntryType.OccupationalHealthcare &&
              <div style={{ paddingBottom: '10px' }}>
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
                <Field
                  label="Employer Name"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />
              </div>
            }
            {values.type === EntryType.HealthCheck &&
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
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
