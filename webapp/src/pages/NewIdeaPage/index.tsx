import { useFormik } from 'formik';
import { useState } from 'react';
import { withZodSchema } from 'formik-validator-zod';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/Textarea';
import { trpc } from '../../lib/trpc';
import { zCreayeIdeaTrpcInput } from '@webapp/backend/src/router/createIdea/input';

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
    validate: withZodSchema(zCreayeIdeaTrpcInput),
    onSubmit: async values => {
      try{
        await createIdea.mutateAsync(values);
      formik.resetForm();
      setSuccessMessageVisible(true);
      setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 3000);  
      }catch(error:any){
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
      >
        <Input label="Name" name="name" formik={formik} />
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Description" name="description" formik={formik} />
        <TextArea name="text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Some fields are invalid</div>
        )}
        {!!submittingError && (<div style={{color:'red'}}>{submittingError}</div>)}
        {successMessageVisible && <div style={{ color: 'green' }}>Idea created!</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button>
      </form>
    </Segment>
  );
};
