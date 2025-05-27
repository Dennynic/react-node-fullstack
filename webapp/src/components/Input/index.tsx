import { FormikProps } from "formik";
import cn from "classnames";

import css from './index.module.scss';


export const Input = ({
  name,
  label,
  formik,
  maxWidth,
}: {
  name: string;
  label: string;
  formik: FormikProps<any>;
  maxWidth?: number;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined
  const isTouched = !!formik.touched[name];
  const isDisabled = formik.isSubmitting;
  const isInvalid = isTouched && !!error;
  return (
    <div className={cn({[css.field]:true, [css.disabled]:isDisabled })}>
      <label className={css.label} htmlFor={name}>{label}</label>
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: isInvalid
        })}
        style={{maxWidth}}
        type="text"
        disabled = {isDisabled}
        onChange={e => {
          formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
      />
      {isInvalid && <div className={css.error}>{error}</div>}
    </div>
  );
};
