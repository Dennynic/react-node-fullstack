import { FormikProps } from 'formik';
import cn from 'classnames';
import css from './index.module.scss';

export const TextArea = ({
  name,
  formik,
  label,
}: {
  name: string;
  label: string;
  formik: FormikProps<any>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const isTouched = !!formik.touched[name];
  const isDisabled = formik.isSubmitting;
  const isInvalid = isTouched && !!error;
  return (
    <div className={cn({ [css.field]: true, [css.disabled]: isDisabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={cn({
          [css.input]: true,
          [css.invalid]: isInvalid,
        })}
        disabled={isDisabled}
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
      {isInvalid && <div className={css.error}>{error}</div>}
    </div>
  );
};
