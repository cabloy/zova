// from: quasar/ui/src/plugins/Meta.js
import { extend } from '@cabloy/extend';
import * as devalue from 'devalue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { Cast, SSRContext, SSRMetaOptions, SSRMetaOptionsWrapper } from '../../types/index.js';

export class CtxSSRMetaStore extends BeanSimple {
  private _updateId: number = 0;
  private _currentClientMeta?: SSRMetaOptions;
  private _clientList: SSRMetaOptionsWrapper[] = [];

  protected __init__() {
    if (process.env.SERVER) {
      const ssrContext = this.ctx.meta.ssr.context;
      ssrContext.__qMetaList = [];
      if (process.env.DEV) {
        ssrContext.__qMetaList.push({
          bodyStyle: { display: 'none' },
        });
      }
      ssrContext.rendered = () => {
        this._onRenderedLast();
        ssrContext.rendered = () => {};
      };
    }
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      this._currentClientMeta = Cast(window).__Q_META__;
      document.getElementById('ssr-meta-init')?.remove();
    }
  }

  private _onRenderedLast() {
    const ssrContext = this.ctx.meta.ssr.context;
    injectContextState(ssrContext);
    injectServerMeta(ssrContext);
  }

  addMetaOptions(metaOptionsWrapper: SSRMetaOptionsWrapper) {
    this._clientList.push(metaOptionsWrapper);
  }

  removeMetaOptions(metaOptionsWrapper: SSRMetaOptionsWrapper) {
    this._clientList.splice(this._clientList.indexOf(metaOptionsWrapper), 1);
  }

  planClientUpdate() {
    if (this._updateId !== 0) {
      clearTimeout(this._updateId);
    }
    this._updateId = window.setTimeout(() => {
      this._updateId = 0;
      this._updateClientMeta();
    }, 50);
  }

  private _updateClientMeta() {
    const data: SSRMetaOptions = {
      title: '',
      titleTemplate: undefined,
      meta: {},
      link: {},
      script: {},
      htmlAttr: {},
      bodyAttr: {},
    };

    for (let i = 0; i < this._clientList.length; i++) {
      const { active, val } = this._clientList[i];

      if (active === true) {
        extend(true, data, val);
      }
    }

    normalize(data);

    apply(diff(this._currentClientMeta, data));
    this._currentClientMeta = data;
  }
}

function normalize(meta) {
  if (meta.title) {
    meta.title = meta.titleTemplate ? meta.titleTemplate(meta.title) : meta.title;
    delete meta.titleTemplate;
  }

  [
    ['meta', 'content'],
    ['link', 'href'],
  ].forEach(type => {
    const metaType = meta[type[0]],
      metaProp = type[1];

    for (const name in metaType) {
      const metaLink = metaType[name];

      if (metaLink.template) {
        if (Object.keys(metaLink).length === 1) {
          delete metaType[name];
        } else {
          metaLink[metaProp] = metaLink.template(metaLink[metaProp] || '');
          delete metaLink.template;
        }
      }
    }
  });
}

function changed(old, def) {
  if (Object.keys(old).length !== Object.keys(def).length) {
    return true;
  }
  for (const key in old) {
    if (old[key] !== def[key]) {
      return true;
    }
  }
}

function bodyFilter(name) {
  return ['class', 'style'].includes(name) === false;
}

function htmlFilter(name) {
  return ['lang', 'dir'].includes(name) === false;
}

function diff(meta, other) {
  const add: any = {},
    remove: any = {};

  if (meta === void 0) {
    return { add: other, remove };
  }

  if (meta.title !== other.title) {
    add.title = other.title;
  }

  ['meta', 'link', 'script', 'htmlAttr', 'bodyAttr'].forEach(type => {
    const old = meta[type],
      cur = other[type];
    remove[type] = [];

    if (old === void 0 || old === null) {
      add[type] = cur;
      return;
    }

    add[type] = {};

    for (const key in old) {
      if (cur.hasOwnProperty(key) === false) {
        remove[type].push(key);
      }
    }
    for (const key in cur) {
      if (old.hasOwnProperty(key) === false) {
        add[type][key] = cur[key];
      } else if (changed(old[key], cur[key]) === true) {
        remove[type].push(key);
        add[type][key] = cur[key];
      }
    }
  });

  return { add, remove };
}

function apply({ add, remove }) {
  if (add.title) {
    document.title = add.title;
  }

  if (Object.keys(remove).length !== 0) {
    ['meta', 'link', 'script'].forEach(type => {
      remove[type].forEach(name => {
        document.head.querySelector(`${type}[data-qmeta="${name}"]`)?.remove();
      });
    });
    remove.htmlAttr.filter(htmlFilter).forEach(name => {
      document.documentElement.removeAttribute(name);
    });
    remove.bodyAttr.filter(bodyFilter).forEach(name => {
      document.body.removeAttribute(name);
    });
  }

  ['meta', 'link', 'script'].forEach(type => {
    const metaType = add[type];

    for (const name in metaType) {
      const tag = document.createElement(type);
      for (const att in metaType[name]) {
        if (att !== 'innerHTML') {
          tag.setAttribute(att, metaType[name][att]);
        }
      }
      tag.setAttribute('data-qmeta', name);
      if (type === 'script') {
        tag.innerHTML = metaType[name].innerHTML || '';
      }
      document.head.appendChild(tag);
    }
  });
  Object.keys(add.htmlAttr)
    .filter(htmlFilter)
    .forEach(name => {
      document.documentElement.setAttribute(name, add.htmlAttr[name] || '');
    });
  Object.keys(add.bodyAttr)
    .filter(bodyFilter)
    .forEach(name => {
      document.body.setAttribute(name, add.bodyAttr[name] || '');
    });
}

function getAttr(seed) {
  return att => {
    const val = seed[att];
    return att + (val !== true && val !== void 0 ? `="${val}"` : '');
  };
}

function getHead(meta) {
  let output = '';
  if (meta.title) {
    output += `<title>${meta.title}</title>`;
  }
  ['meta', 'link', 'script'].forEach(type => {
    const metaType = meta[type];

    for (const att in metaType) {
      const attrs = Object.keys(metaType[att])
        .filter(att => att !== 'innerHTML')
        .map(getAttr(metaType[att]));

      output += `<${type} ${attrs.join(' ')} data-qmeta="${att}">`;
      if (type === 'script') {
        output += (metaType[att].innerHTML || '') + '</script>';
      }
    }
  });
  return output;
}

function injectServerMeta(ssrContext: SSRContext) {
  const data: SSRMetaOptions = {
    title: '',
    titleTemplate: undefined,
    meta: {},
    link: {},
    htmlAttr: {},
    bodyAttr: {},
    bodyStyle: {},
    noscript: {},
  };

  const list = ssrContext.__qMetaList;

  for (let i = 0; i < list.length; i++) {
    extend(true, data, list[i]);
  }

  normalize(data);

  const nonce = ssrContext.nonce !== void 0 ? ` nonce="${ssrContext.nonce}"` : '';

  const ctx = ssrContext._meta;

  const htmlAttr = Object.keys(data.htmlAttr!).filter(htmlFilter);

  if (htmlAttr.length !== 0) {
    ctx.htmlAttrs += (ctx.htmlAttrs.length !== 0 ? ' ' : '') + htmlAttr.map(getAttr(data.htmlAttr)).join(' ');
  }

  ctx.headTags += getHead(data);

  const bodyAttr = Object.keys(data.bodyAttr!).filter(bodyFilter);

  if (bodyAttr.length !== 0) {
    ctx.bodyAttrs += (ctx.bodyAttrs.length !== 0 ? ' ' : '') + bodyAttr.map(getAttr(data.bodyAttr)).join(' ');
  }

  const bodyStyle = Object.keys(data.bodyStyle!)
    .filter(name => !!data.bodyStyle![name])
    .map(name => `${name}=${data.bodyStyle![name]};`)
    .join('');
  if (bodyStyle) {
    ctx.bodyAttrs += (ctx.bodyAttrs.length !== 0 ? ' ' : '') + `style="${bodyStyle}"`;
  }

  data.title = '\'"`';

  ctx.headTags +=
    Object.keys(data.noscript!)
      .map(name => `<noscript data-qmeta="${name}">${data.noscript![name]}</noscript>`)
      .join('') +
    `<script${nonce} id="ssr-meta-init">window.__Q_META__=${delete data.bodyStyle && delete data.noscript && devalue.uneval(data)}</script>`;
}

function injectContextState(ssrContext: SSRContext) {
  const ctx = ssrContext._meta;

  const nonce = ssrContext.nonce !== void 0 ? ` nonce="${ssrContext.nonce}"` : '';

  ctx.headTags += `<script${nonce} id="ssr-state-init">window.__INITIAL_STATE__=${devalue.uneval(ssrContext.state)}</script>`;
}
