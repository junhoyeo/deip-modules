<template>
  <v-card v-if="!loading" elevation="0" light>
    <v-card-text>
      <vex-stack gutter="24">
        <template v-if="tokenSale">
          <fundraising-progress
            :token-sale="tokenSale"
          />

          <v-card
            v-if="tokenSale.status != TS_TYPES.INACTIVE"
            outlined
            class="py-2 px-3 d-flex justify-space-between"
          >
            <span>{{ $t('module.fundraising.fundraisingWidget.yourInvestment') }}</span>
            <span
              v-if="userInvestment"
              class="primary--text font-weight-medium"
            >{{ $$toAssetUnits(userInvestment) }}</span>
          </v-card>

          <v-btn
            v-if="tokenSale.status === TS_TYPES.ACTIVE"
            :to="contributeLink"
            color="primary"
            depressed
          >
            {{ $t('module.fundraising.fundraisingWidget.invest') }}
          </v-btn>
        </template>

        <span v-else>
          {{ $t('module.fundraising.fundraisingWidget.noFundraising') }}
        </span>

        <v-btn
          v-if="isFundraisingCanBeStarted"
          :to="startFundraisingLink"
          color="primary"
          depressed
        >
          {{ $t('module.fundraising.fundraisingWidget.startFundraising') }}
        </v-btn>
      </vex-stack>
    </v-card-text>
  </v-card>
</template>

<script>
  import { defineComponent } from '@deip/platform-util';
  import { dateMixin } from '@deip/platform-components';
  import { orderBy } from '@deip/toolbox/lodash';
  import { TS_TYPES } from '@deip/constants';
  import { assetsMixin } from '@deip/assets-module';
  import { VexStack } from '@deip/vuetify-extended';

  import FundraisingProgress from '../Progress/FundraisingProgress';

  export default defineComponent({
    name: 'FundraisingWidget',

    components: {
      VexStack,
      FundraisingProgress
    },

    mixins: [assetsMixin, dateMixin],

    props: {
      projectId: {
        type: String,
        required: true
      },

      contributeLink: {
        type: Object,
        default: null
      },

      startFundraisingLink: {
        type: Object,
        default: null
      },

      canUserStartFundraising: {
        type: Boolean,
        default: false
      },

      autoUpdateTime: {
        type: Number,
        default: 60000 // 1 minute
      }
    },

    data() {
      return {
        loading: false,
        TS_TYPES,
        timerId: ''
      };
    },

    computed: {
      tokenSale() {
        const projectTokenSales = this.$store.getters['fundraising/list']({
          researchExternalId: this.projectId
        });

        if (!projectTokenSales.length) {
          return null;
        }

        const tokenSales = projectTokenSales.map((s) => ({
          ...s,
          startTime: this.$$parseISO(s.startTime, true),
          endTime: this.$$parseISO(s.endTime, true)
        }));

        const sorted = orderBy(tokenSales, ['startTime'], ['desc']);

        return sorted[0];
      },

      isFundraisingCanBeStarted() {
        return this.canUserStartFundraising
          && (!this.tokenSale
            || [TS_TYPES.FINISHED, TS_TYPES.EXPIRED].includes(this.tokenSale?.status));
      },

      userInvestment() {
        if (!this.tokenSale) {
          return null;
        }

        if (!this.tokenSale.contributions) {
          return {
            ...this.$$fromAssetUnits(this.tokenSale.hardCap),
            amount: 0
          };
        }

        const amount = this.tokenSale.contributions.reduce((acc, current) => {
          if (current.contributor === this.$currentUser.username) {
            // eslint-disable-next-line no-param-reassign
            acc += this.$$fromAssetUnits(current.amount).amount;
          }
          return acc;
        }, 0);

        return {
          ...this.$$fromAssetUnits(this.tokenSale.hardCap),
          amount
        };
      }
    },

    created() {
      this.timerId = setInterval(this.updateComponentData.bind(this), this.autoUpdateTime);

      this.loading = true;
      this.getProjectTokenSaleData().finally(() => { 
        this.loading = false; 
        });
    },

    destroyed() {
      this.cancelAutoUpdate();
    },

    methods: {
      updateComponentData() {
        if (!this.tokenSale) return null;
        const { status } = this.tokenSale;
        const {
          INACTIVE, EXPIRED, FINISHED
        } = TS_TYPES;

        if (status === INACTIVE) {
          return this.$store.dispatch('fundraising/getListByProjectId', this.projectId)
            .catch((error) => { console.error(error); });
        }

        if ([FINISHED, EXPIRED].includes(status)) {
          this.cancelAutoUpdate();
          return this.getProjectTokenSaleData();
        }
        
        return this.getProjectTokenSaleData();
      },

      getProjectTokenSaleData() {
        return this.$store.dispatch('fundraising/getListByProjectId', this.projectId)
          .then(() => {
            if (this.tokenSale) {
              this.$store.dispatch('fundraising/getTokenSaleContributions', this.tokenSale.externalId);
            }
          })
          .catch((error) => {
            console.error(error);
          })
          
      },

      cancelAutoUpdate() {
        clearInterval(this.timerId);
      }
    }
  });
</script>
