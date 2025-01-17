<template>
  <vex-dialog
    v-model="isDialogOpened"
    :title="$t('module.wallet.balances.deposit')"
    :disabled="isLoading"
    :loading="isLoading"
    :button-true-text="$t('module.wallet.balances.process')"
    :button-false-text="$t('module.wallet.balances.cancel')"
    :hide-buttons="step !== STEPS.FORM"
    :persistent="true"
    @click:confirm="submitForm"
  >
    <validation-observer v-if="step === STEPS.FORM" ref="observer">
      <v-form>
        <validation-provider
          v-slot="{ errors }"
          :name="$t('module.wallet.balances.amount')"
          rules="required|assetGreaterOrEqual:1"
        >
          <asset-input
            v-model="asset"
            :label="$t('module.wallet.balances.amount')"
            required
            :assets-filter="assetsFilter"
            :error-messages="errors"
          />
        </validation-provider>
      </v-form>
    </validation-observer>

    <div v-else class="d-flex flex-column justify-center">
      <v-progress-circular
        v-show="isIframeSrcLoading"
        indeterminate
        color="primary"
        class="align-self-center"
      />
      <iframe
        :src="redirectToPaymentUrl"
        :height="iframeHeight"
        frameborder="0"
        @load="handleIframeLoad"
      />
    </div>
  </vex-dialog>
</template>

<script>
  import { VexDialog } from '@deip/vuetify-extended';
  import { extend } from '@deip/validation-plugin';
  import { AssetInput } from '@deip/assets-module';
  import { ASSET_TYPE } from '@deip/constants';
  import { createEnum } from '@deip/toolbox';
  import { proxydi } from '@deip/proxydi';

  const STEPS = createEnum({
    FORM: 1,
    PAYMENT: 2
  });

  extend('assetGreaterOrEqual', {
    params: ['target'],
    validate(value, { target }) {
      if (!target || !(value && value.amount)) return true;
      return parseFloat(value.amount) >= parseFloat(target);
    },
    message: (_, values) => {
      const i18n = proxydi.get('i18nInstance');
      return i18n.t('module.wallet.balances.validations.assetGreaterOrEqual', values);
    }
  });

  export default {
    name: 'DepositDialog',
    components: {
      VexDialog,
      AssetInput
    },

    props: {
      value: {
        type: Boolean,
        default: false
      },

      assetBalance: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
        asset: null,
        redirectToPaymentUrl: null,
        isLoading: false,
        isIframeSrcLoading: false,
        iframeHeight: 250,
        step: STEPS.FORM,
        STEPS
      };
    },

    computed: {
      isDialogOpened: {
        get() {
          return this.value;
        },

        set(val) {
          this.$emit('input', val);

          if (this.$refs.observer) {
            this.$refs.observer.reset();
          }
          if (this.asset) {
            this.asset.amount = null;
          }

          this.redirectToPaymentUrl = null;
          this.step = STEPS.FORM;
        }
      },

      assetsFilter() {
        return this.assetBalance
          ? { stringSymbol: this.assetBalance.assetSymbol }
          : { type: ASSET_TYPE.SYSTEM };
      }
    },

    watch: {
      assetBalance: {
        handler(val) {
          this.asset = val ? { assetId: val.assetSymbol } : null;
        },
        deep: true
      }
    },

    mounted() {
      window.addEventListener('message', this.handleMessageReceive, false);
    },

    beforeDestroy() {
      window.removeEventListener('message', this.handleMessageReceive);
    },

    methods: {
      handleMessageReceive(e) {
        if (!e.origin.startsWith(this.$env.DEIP_PAYMENT_SERVICE_URL)) return;

        if (e.data === 'stripe-payment-processed') {
          this.closeDialog();
          this.$emit('payment-processed');
          this.$notifier.showSuccess(this.$t('module.wallet.balances.paymentProcessed'));
        }

        if (e.data.name === 'document-size') {
          this.iframeHeight = e.data.height + 50;
        }
      },

      deposit() {
        this.isLoading = true;

        const account = this.assetBalance
          ? this.assetBalance.owner
          : this.$currentUser.username;
        const payload = {
          initiator: this.$currentUser,
          amount: parseInt(this.asset.amount, 10) * 100, // cents
          currency: this.asset.assetId,
          account,
          timestamp: Date.now()
        };

        this.$store.dispatch('wallet/deposit', payload)
          .then((data) => {
            this.redirectToPaymentUrl = data.redirectUrl;
            this.step = STEPS.PAYMENT;
            this.isIframeSrcLoading = true;
          })
          .catch((error) => {
            console.error(error);
            this.$notifier.showError(error.response.data);
          })
          .finally(() => {
            this.isLoading = false;
          });
      },

      submitForm() {
        this.$refs.observer.handleSubmit(this.deposit);
      },

      handleIframeLoad() {
        this.isIframeSrcLoading = false;
      },

      closeDialog() {
        this.isDialogOpened = false;
      }
    }
  };
</script>
