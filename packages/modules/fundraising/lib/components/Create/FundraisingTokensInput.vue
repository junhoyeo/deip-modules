<template>
  <vex-block
    :title="$t('module.fundraising.createForm.determineNumberOfTokens')"
    compact
  >
    <v-row>
      <v-col cols="6">
        <validation-provider
          v-slot="{ errors }"
          :name="$t('module.fundraising.createForm.units')"
          :rules="{
            required: true,
            minMaxValue: {
              min: MIN_TOKEN_UNITS_TO_SELL,
              max: issuedTokens.amount
            }
          }"
        >
          <v-text-field
            v-model="internalTokens"
            outlined
            persistent-hint
            :error-messages="errors"
            :suffix="issuedTokens.assetId"
            :hint="tokensHint"
            autocomplete="off"
          >
            <template #message="{ message }">
              <div class="text-caption" v-html="message" />
            </template>
          </v-text-field>
        </validation-provider>
      </v-col>
    </v-row>
  </vex-block>
</template>

<script>
  import { defineComponent } from '@deip/platform-util';
  import { VexBlock } from '@deip/vuetify-extended';
  import { assetsMixin } from '@deip/assets-module';
  import { MIN_TOKEN_UNITS_TO_SELL } from '@deip/constants';

  export default defineComponent({
    name: 'FundraisingTokensInput',

    components: {
      VexBlock
    },

    mixins: [assetsMixin],

    model: {
      prop: 'tokens',
      event: 'input'
    },

    props: {
      tokens: {
        type: String,
        default: null
      },
      issuedTokens: {
        type: Object,
        default: null
      },
      availableTokens: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
        MIN_TOKEN_UNITS_TO_SELL
      };
    },

    computed: {
      internalTokens: {
        get() {
          return this.tokens;
        },
        set(value) {
          this.$emit('input', value);
        }
      },

      tokensHint() {
        if (!this.internalTokens) return '';

        const messages = [
          `${this.toPercent(this.internalTokens, this.issuedTokens)} of ${this.$$toAssetUnits(this.issuedTokens)} issued tokens`
        ];
        if (this.issuedTokens?.amount > this.availableTokens?.amount) {
          messages.push(
            `${this.toPercent(this.internalTokens, this.availableTokens)} of ${this.$$toAssetUnits(this.availableTokens)} team's tokens`
          );
        }

        return messages.join('<br>');
      }
    },

    methods: {
      toPercent(val, from) {
        if (!val) return '';
        const target = from;
        const pc = (val / target.amount) * 100;

        return `${Math.round(pc * 100) / 100}%`;
      }
    }
  });
</script>
