import { AssetsService } from '@deip/assets-service';

import {
  listGetter,
  oneGetterFactory,
  setListMutation,
  setOneMutation
} from '@deip/platform-store';

const assetsService = AssetsService.getInstance();

const STATE = {
  data: []
};

const GETTERS = {
  list: listGetter,

  listKeys: (_, getters) => (query = {}) => getters.list(query)
    .map((ass) => ass.symbol),

  one: oneGetterFactory({ selectorKey: 'symbol' })
};

const ACTIONS = {
  getList({ commit }) {
    return assetsService.lookupAssets('', 10000)
      .then((res) => {
        commit('setList', res.data.items);
      });
  },

  getBySymbol({ commit }, symbol) {
    return assetsService.getAssetBySymbol(symbol)
      .then((res) => {
        commit('setOne', res.data);
      });
  },

  create(_, payload) {
    const { user, data } = payload;
    return assetsService.createFungibleToken(user, data);
  }
};

const MUTATIONS = {
  setList: setListMutation,
  setOne: setOneMutation
};

export const assetsStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
