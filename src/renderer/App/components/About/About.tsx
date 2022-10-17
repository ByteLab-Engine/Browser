/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import packagejson from '../../../../../package.json';

import './style.scss';

export const About: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.app.analytics.page('/about');
  }, []);

  return (
    <>
      <div className="About__property-line">
        <span className="About__property">{t('App version')}:</span>{' '}
        {packagejson.version}
      </div>
      <div className="About__property-line">
        <span className="About__property">{t('Author')}:</span> CrabbyTheDev
      </div>
    </>
  );
};
