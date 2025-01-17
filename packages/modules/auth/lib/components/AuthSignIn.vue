<template>
  <validation-observer v-slot="{ invalid, handleSubmit }" ref="observer">
    <v-form
      :disabled="loading"
      @submit.prevent="handleSubmit(signIn)"
    >
      <slot v-bind="binds">
        <slot name="prepend" v-bind="binds" />

        <slot name="fields" v-bind="binds">
          <vex-stack :gutter="8" class="mb-7">
            <validation-provider
              v-slot="{ errors }"
              :name="usernameLabel"
              rules="required"
            >
              <v-text-field
                v-model="formModel.username"
                :label="usernameLabel"
                :error-messages="errors"
                v-bind="fieldsProps"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              :name="passwordLabel"
              rules="required"
            >
              <vex-password-input
                v-model="formModel.password"
                :label="passwordLabel"
                :error-messages="errors"
                v-bind="fieldsProps"
                counter
              >
                <template #counter>
                  <div class="text-caption">
                    <router-link :to="{name: 'passwordRestore'}" class="text-decoration-none">
                      {{ passwordRestoreLabel }}
                    </router-link>
                  </div>
                </template>
              </vex-password-input>
            </validation-provider>
          </vex-stack>
        </slot>

        <slot name="submit" v-bind="binds">
          <vex-stack :gutter="24">
            <v-btn
              type="submit"
              color="primary"
              block
              depressed
              :disabled="invalid || loading || disabled"
              :loading="loading"
            >
              {{ submitLabel }}
            </v-btn>

            <div class="text-center">
              {{ $t('module.auth.noAccountQuestion') }}
              <router-link :to="{ name: 'signUp' }" class="font-weight-medium text-decoration-none">
                {{ $t('module.auth.signUp') }}
              </router-link>
            </div>
          </vex-stack>
        </slot>

        <slot name="append" v-bind="binds" />
      </slot>
    </v-form>
  </validation-observer>
</template>

<script>
  import { VexStack, VexPasswordInput } from '@deip/vuetify-extended';

  export default {
    name: 'AuthSignIn',

    components: {
      VexStack,
      VexPasswordInput
    },

    props: {
      usernameLabel: {
        type: String,
        default() { return this.$t('module.auth.username'); }
      },
      passwordLabel: {
        type: String,
        default() { return this.$t('module.auth.password'); }
      },
      passwordRestoreLabel: {
        type: String,
        default() { return this.$t('module.auth.forgotPasswordQuestion'); }
      },
      submitLabel: {
        type: String,
        default() { return this.$t('module.auth.signIn'); }
      },

      fieldsProps: {
        type: Object,
        default: () => ({
          outlined: true
        })
      }
    },

    data() {
      return {
        loading: false,
        disabled: false,

        formModel: {
          username: '',
          password: ''
        }
      };
    },

    computed: {
      binds() {
        return {
          formModel: this.formModel,
          signIn: this.signIn
        };
      }
    },

    mounted() {
      document.body.click();
    },

    methods: {
      setLoading(state) {
        this.loading = state;
        this.disabled = state;
      },

      emitSuccess(data) {
        this.setLoading(false);
        this.$emit('success', data);
      },

      emitError(error) {
        this.setLoading(false);
        this.$emit('error', error);
      },

      signIn() {
        this.setLoading(true);

        return this.$store.dispatch('auth/signIn', this.formModel)
          .then((res) => {
            this.emitSuccess(res);
          })
          .catch((error) => {
            this.emitError(error.message);
          });
      }
    }
  };
</script>
