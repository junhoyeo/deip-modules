import {
  ATTR_TYPES
} from '@deip/constants';

const avatarMask = `
<svg
  viewBox="0 0 320 320"
  fill="rgba(0,0,0,.5)"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M160 0H0V160V320H160H320V160V0H160ZM160 0C248.366 0 320 71.6344 320 160C320 248.366 248.366 320 160 320C71.6344 320 0 248.366 0 160C0 71.6344 71.6344 0 160 0Z"
  >
</svg>
`;

const ATTR_TYPES_SET_SCHEMAS = {
  [ATTR_TYPES.TEXT]: {
    is: 'v-text-field',
    data: {
      props: {
        label: '{{attribute.info.title}}',
        errorMessages: '{{attribute.errors}}'
      }
    },
    model: true
  },
  [ATTR_TYPES.TEXTAREA]: {
    is: 'v-textarea',
    data: {
      props: {
        label: '{{attribute.info.title}}',
        rows: 10,
        noResize: false,
        errorMessages: '{{attribute.errors}}'
      }
    },
    model: true
  },
  [ATTR_TYPES.RICHTEXT]: {
    is: 'vex-richedit',
    data: {
      props: {
        label: '{{attribute.info.title}}'
      }
    },
    model: true
  },

  [ATTR_TYPES.IMAGE]: {
    is: 'vex-image-input',
    data: {
      props: {
        label: '{{attribute.info.title}}',
        aspectRatio: '{{attribute.props.VexImageInput.aspectRatio}}',
        initialImage: '{{(attribute.info._id)::getAttributeFileSrc}}',
        errorMessages: '{{attribute.errors}}'
      }
    },
    model: {
      event: 'change',
      path: false
    }
  },

  [ATTR_TYPES.AVATAR]: {
    is: 'vex-image-input',
    data: {
      props: {
        label: '{{attribute.info.title}}',
        aspectRatio: 1,
        mask: avatarMask,
        noFlip: true,
        noRotate: true,
        initialImage: '{{(attribute.info._id)::getAttributeFileSrc}}',
        errorMessages: '{{attribute.errors}}'
      }
    },
    model: {
      event: 'change',
      path: false
    }
  },

  [ATTR_TYPES.LOCATION]: {
    is: 'vex-places-autocomplete',
    data: {
      props: {
        label: '{{attribute.info.title}}',
        errorMessages: '{{attribute.errors}}'
      }
    },
    model: {
      event: 'change',
      path: false
    }
  }
};

export { ATTR_TYPES_SET_SCHEMAS };
