import React from 'react';
import { Field, FieldProps } from 'formik';
import { Form } from 'semantic-ui-react';

import { EntryType } from '../types';

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField= ({
  field,
  label,
  placeholder
}: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    {/* <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div> */}
  </Form.Field>
);

// structure of a single option
export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
};

export const SelectField = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);