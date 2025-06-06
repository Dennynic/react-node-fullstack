import { useParams } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { ViewRouteParams } from '../../lib/routes';
import { format } from 'date-fns/format';
import { Segment } from '../../components/Segment';
import css from './index.module.scss';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewRouteParams;

  const { data, error, isLoading, isError } = trpc.getIdea.useQuery({
    ideaNick,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error - {error.message}</span>;
  }

  if (!data?.idea) {
    return <span>Idea not found</span>;
  }

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={css.createdAt}>
        Created at: {format(data.idea.createdAt, 'dd-MM-yyyy')}
      </div>
      <div
        className={css.text}
        dangerouslySetInnerHTML={{ __html: data.idea.text }}
      />
    </Segment>
  );
};
