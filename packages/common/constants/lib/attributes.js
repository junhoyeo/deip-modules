import { createEnum } from '@deip/toolbox';

const ATTR_TYPES = createEnum({
  TEXT: 1,
  TEXTAREA: 2,
  SELECT: 3,
  SWITCH: 4,
  CHECKBOX: 5,
  DATE: 6,
  DATE_TIME: 7,
  FILE: 8,
  IMAGE: 9,
  URL: 10,
  NUMBER: 11,
  VIDEO_URL: 12,
  USER: 13,
  AVATAR: 14,
  LOCATION: 15,
  RICHTEXT: 16,

  STEPPER: 501,
  DISCIPLINE: 502,
  RESEARCH_GROUP: 503,
  EXPRESS_LICENSING: 504,
  NETWORK_CONTENT_ACCESS: 505,
  ROADMAP: 506,
  PARTNERS: 507,
  EDUCATION: 508,
  EMPLOYMENT: 509,

  CUSTOM: 1001,
  FEATURE: 1002
});

const ATTR_TYPES_LABELS = {
  [ATTR_TYPES.TEXT]: 'Text field',
  [ATTR_TYPES.TEXTAREA]: 'Textarea',
  [ATTR_TYPES.RICHTEXT]: 'Rich text',

  [ATTR_TYPES.SELECT]: 'Dropdown select',

  [ATTR_TYPES.SWITCH]: 'Switch',
  [ATTR_TYPES.CHECKBOX]: 'Checkbox',

  [ATTR_TYPES.DATE]: 'Date picker',
  [ATTR_TYPES.DATE_TIME]: 'Date/Time picker',

  [ATTR_TYPES.FILE]: 'File input',
  [ATTR_TYPES.IMAGE]: 'Image',
  [ATTR_TYPES.URL]: 'Url',
  [ATTR_TYPES.NUMBER]: 'Number',

  [ATTR_TYPES.VIDEO_URL]: 'Video url',
  [ATTR_TYPES.USER]: 'User selector',
  [ATTR_TYPES.AVATAR]: 'Avatar/Photo image',
  [ATTR_TYPES.LOCATION]: 'Location',

  // temp section

  [ATTR_TYPES.STEPPER]: 'STEPPER',
  [ATTR_TYPES.DISCIPLINE]: 'DISCIPLINE',
  [ATTR_TYPES.RESEARCH_GROUP]: 'RESEARCH_GROUP',
  [ATTR_TYPES.EXPRESS_LICENSING]: 'EXPRESS_LICENSING',
  [ATTR_TYPES.NETWORK_CONTENT_ACCESS]: 'NETWORK_CONTENT_ACCESS',
  [ATTR_TYPES.ROADMAP]: 'ROADMAP',
  [ATTR_TYPES.PARTNERS]: 'PARTNERS',
  [ATTR_TYPES.EDUCATION]: 'EDUCATION',
  [ATTR_TYPES.EMPLOYMENT]: 'EMPLOYMENT',

  // - temp section

  [ATTR_TYPES.CUSTOM]: 'Custom attribute',
  [ATTR_TYPES.FEATURE]: 'Feature attribute'
};

const ATTR_TYPES_ICONS = {
  [ATTR_TYPES.TEXT]: 'mdi-form-textbox',
  [ATTR_TYPES.TEXTAREA]: 'mdi-form-textarea',
  [ATTR_TYPES.RICHTEXT]: 'mdi-file-document-edit-outline',

  [ATTR_TYPES.SELECT]: 'mdi-form-select',

  [ATTR_TYPES.SWITCH]: 'mdi-toggle-switch-outline',
  [ATTR_TYPES.CHECKBOX]: 'mdi-check-box-outline',

  [ATTR_TYPES.DATE]: 'mdi-calendar',
  [ATTR_TYPES.DATE_TIME]: 'mdi-clock-outline',

  [ATTR_TYPES.FILE]: 'mdi-file-outline',
  [ATTR_TYPES.IMAGE]: 'mdi-file-image-outline',
  [ATTR_TYPES.URL]: 'mdi-link-variant-plus',
  [ATTR_TYPES.NUMBER]: 'mdi-numeric',

  [ATTR_TYPES.VIDEO_URL]: 'mdi-video-outline',
  [ATTR_TYPES.USER]: 'mdi-account-outline',
  [ATTR_TYPES.AVATAR]: 'mdi-account-circle-outline',
  [ATTR_TYPES.LOCATION]: 'mdi-map-marker-outline',

  // temp section

  [ATTR_TYPES.STEPPER]: 'mdi-format-list-numbered',
  [ATTR_TYPES.DISCIPLINE]: 'mdi-flask-empty-outline',
  [ATTR_TYPES.RESEARCH_GROUP]: 'mdi-account-box-outline',
  [ATTR_TYPES.EXPRESS_LICENSING]: 'mdi-file-certificate-outline',
  [ATTR_TYPES.NETWORK_CONTENT_ACCESS]: 'mdi-account-key-outline',
  [ATTR_TYPES.ROADMAP]: 'mdi-timeline-clock-outline',
  [ATTR_TYPES.PARTNERS]: 'mdi-account-tie-outline',

  [ATTR_TYPES.EDUCATION]: 'EDUCATION',
  [ATTR_TYPES.EMPLOYMENT]: 'EMPLOYMENT',

  // - temp section

  [ATTR_TYPES.CUSTOM]: 'mdi-cogs',
  [ATTR_TYPES.FEATURE]: 'mdi-star-circle-outline'
};

const ATTR_TYPES_PROPS = {
  [ATTR_TYPES.TEXT]: {
    VeLineClamp: {
      lines: {
        type: String,
        default: null
      }
    }
  },
  [ATTR_TYPES.AVATAR]: {
    VexAvatar: {
      size: {
        type: Number,
        default: 48
      }
    }
  }
};

const ATTR_SCOPES = createEnum({
  PROJECT: 1,
  USER: 2,
  TEAM: 3
});

const ATTR_SCOPES_LABELS = {
  [ATTR_SCOPES.PROJECT]: 'Project',
  [ATTR_SCOPES.USER]: 'User',
  [ATTR_SCOPES.TEAM]: 'Team'
};

const ATTR_TYPES_SET_RULES = {
  [ATTR_TYPES.TEXT]: 'required',
  [ATTR_TYPES.TEXTAREA]: 'required'
};

export {
  ATTR_TYPES,
  ATTR_TYPES_LABELS,
  ATTR_TYPES_ICONS,
  ATTR_TYPES_PROPS,

  ATTR_SCOPES,
  ATTR_SCOPES_LABELS,
  ATTR_TYPES_SET_RULES
};
