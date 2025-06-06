import { useFormik } from 'formik';
import { useState } from 'react';
import { withZodSchema } from 'formik-validator-zod';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/Textarea';
import { Alert } from '../../components/Alert';
import { trpc } from '../../lib/trpc';
import { zCreateIdeaTrpcInput } from '@webapp/backend/src/router/createIdea/input';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';

import css from './index.module.scss';

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async values => {
      try {
        await createIdea.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });

  return (
    <Segment title="New Idea">
      <form
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className={css.ideaForm}
      >
        <FormItems>
          <Input label="Name" name="name" formik={formik} maxWidth={200} />
          <Input label="Nick" name="nick" formik={formik} maxWidth={200} />
          <Input
            label="Description"
            name="description"
            formik={formik}
            maxWidth={200}
          />
          <TextArea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && (
            <div style={{ color: 'red' }}>Some fields are invalid</div>
          )}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Idea created!</Alert>}
          <Button loading={formik.isSubmitting}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
