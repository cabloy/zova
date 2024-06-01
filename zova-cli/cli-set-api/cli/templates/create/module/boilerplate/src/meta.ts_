// atomClass
import atomClasses from './meta/atomClass/atomClasses.js';
// validate
import schemas from './meta/validation/schemas.js';
import keywords from './meta/validation/keywords.js';
// static
import staticApps from './meta/static/apps.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
import staticDicts from './meta/static/dicts.js';
// meta
export const meta = {
  base: {
    atoms: atomClasses,
    statics: {
      'a-app:app': {
        items: staticApps,
      },
      'a-baselayout:layout': {
        items: staticLayouts,
      },
      'a-base:resource': {
        items: staticResources,
      },
      'a-dict:dict': {
        items: staticDicts,
      },
    },
  },
  validation: {
    validators: {},
    keywords,
    schemas,
  },
  index: {
    indexes: {},
  },
};
