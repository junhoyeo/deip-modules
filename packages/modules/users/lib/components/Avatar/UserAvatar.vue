<template>
  <vex-avatar
    :src="avatarSrc"
    :text="$$userInitials(user)"
    v-bind="avatarProps"
  />
</template>

<script>
  import { VexAvatar } from '@deip/vuetify-extended';
  import { getBindableProps } from '@deip/vuetify-extended/lib/composables/props';
  import { userHelpersMixin } from '../../mixins';

  export default {
    name: 'UserAvatar',

    components: { VexAvatar },

    mixins: [userHelpersMixin],

    props: {
      ...VexAvatar.options.props,

      user: {
        type: Object,
        default: null
      }
    },

    computed: {
      avatarProps() {
        return getBindableProps.call(this, VexAvatar.options.props);
      },

      avatarSrc() {
        const opts = {
          width: this.$props.size,
          height: this.$props.size
        };
        return this.$$userAvatarSrc(this.user, opts);
      }
    }
  };
</script>
