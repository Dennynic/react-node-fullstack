import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { Link } from 'react-router-dom';

import css from './index.module.scss';
import { Segment } from '../../components/Segment';

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError } = trpc.getIdeas.useQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error - {error.message}</span>;
  }

  return (
    <Segment title="All Ideas">
      <div className={css.ideas}>
        {data?.ideas.map(item => (
        <div className={css.idea} key={item.nick}>
            <Segment
              size={2}
              title={
                <Link
                  className={css.ideaLink}
                  to={getViewIdeaRoute({ ideaNick: item.nick })}
                >
                  {item.name}
                </Link>
              }
              description={item.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};
