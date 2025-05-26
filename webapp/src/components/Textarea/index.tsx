import { FormikProps } from 'formik';
export const TextArea = ({
  name,
  formik,
}: {
  name: string;
  formik: FormikProps<any>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="text">Text</label>
      <br />
      <textarea
        disabled={formik.isSubmitting}
        onChange={e => {
          formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id="text"
      />
      {!!touched && !!error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
