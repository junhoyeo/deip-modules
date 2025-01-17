import { defineComponent } from '@deip/platform-util';
import { formFactory } from '@deip/platform-components';

import {
  VRow,
  VCol,
  VTextField,
  VBtn,
  VDivider,
  VSpacer,
  VForm
// eslint-disable-next-line import/extensions,import/no-unresolved
} from 'vuetify/lib/components';

import {
  VexAutocomplete,
  VexBlock,
  VexStack
  // eslint-disable-next-line import/extensions,import/no-unresolved
} from '@deip/vuetify-extended';

const defaultMapKeys = () => [
  'userDetails',
  'userEdit',
  'teamDetails',
  'teamEdit',
  'projectDetails',
  'projectEdit'
];

const defaultData = () => ({
  mapping: defaultMapKeys().map((key) => ({
    key,
    value: ''
  }))
});

export default defineComponent({
  name: 'LayoutsSettings',

  mixins: [formFactory(
    'value',
    'input',
    defaultData,
    defaultData()
  )],

  computed: {
    layoutsList() {
      return this.$store.getters['layouts/list'](this.getterFilter);
    }
  },

  methods: {
    addMapKey() {
      this.formData.mapping.push({ key: '', value: '' });
    },

    removeMapKey(index) {
      this.formData.mapping.splice(index, 1);
    },

    genMapBlock() {
      return (
        <VexBlock title='Glodal layout map'>
          <div>
            {this.genMapFields()}
            {this.genMapAdd()}
          </div>
        </VexBlock>
      );
    },

    genMapFields() {
      return this.formData.mapping.map((item, index) => (
        <VRow>
          <VCol>
            <VTextField
              vModel={this.formData.mapping[index].key}
              hide-details="auto"
            />
          </VCol>
          <VCol>
            <VexAutocomplete
              vModel={this.formData.mapping[index].value}
              items={this.layoutsList}
              item-text={this.getLayoutName}
              item-value="_id"
              hide-details="auto"
              clearable
            />
          </VCol>
        </VRow>
      ));
    },

    genMapAdd() {
      return (
        <VRow>
          <VCol>
            <VBtn
              outlined
              color="primary"
              small
              onClick={() => this.addMapKey()}
            >Add key</VBtn>
          </VCol>
        </VRow>
      );
    },

    genFormControls() {
      return (
          <div class="d-flex">
            <VSpacer />
            <VBtn
              text
              color="primary"
              disabled={this.loading}
              onClick={() => this.$router.back()}
            >Cancel</VBtn>
            <VBtn
              color="primary"
              type="submit"
              loading={this.loading}
              disabled={this.disabled || this.loading || this.untouched}
            >Save</VBtn>
          </div>
      );
    },

    getLayoutName(item) {
      return [
        item.name,
        ...(item.isForm ? ['(form)'] : [])
      ].join(' ');
    },

    onSubmit() {
      // this.$emit('submit', this.lazyFormData);
      this.loading = true;
      this.disabled = true;

      this.$store.dispatch('layouts/updateSettings', this.lazyFormData)
        .then(() => {
          this.loading = false;
          this.disabled = false;
          this.$emit('success', this.lazyFormData);
          this.$store.dispatch('layouts/getSettings');
        })
        .catch((err) => {
          this.loading = false;
          this.disabled = false;
          this.$emit('error', err.message);
        });
    }
  },

  render() {
    return (
      <VForm onSubmit={() => this.onSubmit()}>
        <VexStack gutter={32}>
          {this.genMapBlock()}
          <VDivider />
          {this.genFormControls()}
        </VexStack>

      </VForm>

    );
  }
});
