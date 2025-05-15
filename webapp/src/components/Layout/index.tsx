import { createRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import * as routes from '../../lib/routes';
import css from './index.module.scss';

export const layoutContentElRef = createRef<HTMLDivElement>();

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>IdeaNick</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={routes.getAllIdeasRoute()}>
              All Ideas
            </Link>
            
          </li>
          <li className={css.item}>
          <Link className={css.link} to={routes.getNewIdeaRoute()}>
              New Idea
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
      
    </div>
  );
};
