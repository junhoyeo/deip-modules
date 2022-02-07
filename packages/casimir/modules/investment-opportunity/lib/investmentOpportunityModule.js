import Maska from 'maska';

import { setLocalesMessages } from '@deip/toolbox';
import { investmentOpportunityStore } from './store';

const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.js$/i);

// eslint-disable-next-line no-unused-vars
const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { store, i18n } = options;

  if (i18n) {
    setLocalesMessages(i18n, locales);
  } else {
    throw Error('[InvestmentOpportunityModule]: i18nInstance is not provided');
  }

  if (store) {
    store.registerModule('investmentOpportunity', investmentOpportunityStore);
  } else {
    throw Error('[InvestmentOpportunityModule]: storeInstance is not provided');
  }

  Vue.use(Maska);
};

export const InvestmentOpportunityModule = {
  name: 'InvestmentOpportunityModule',
  deps: [
    'EnvModule',
    'ValidationPlugin',
    'VuetifyExtended',
    'AssetsModule',
    'ProjectsModule'
  ],
  install
};
