import { BeanBase, getZovaIcon, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { VIcon } from 'vuetify/components';
import { computed, ref, toRef } from 'vue';
import { provideTheme } from 'vuetify/lib/composables/theme.mjs';
import { useIcon } from 'vuetify/lib/composables/icons.mjs';
import { useSize } from 'vuetify/lib/composables/size.mjs';
import { useTextColor } from 'vuetify/lib/composables/color.mjs';
import { convertToUnit, flattenFragments } from 'vuetify/lib/util/index.mjs';
import { VSvgIconCabloy } from './svg.js';

@Local()
export class PatchIcon extends BeanBase<ScopeModule> {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    const self = this;
    VIcon.setup = function (props, { attrs, slots }) {
      const slotIcon = ref<string>();

      const { themeClasses } = provideTheme(props);
      const { sizeClasses } = useSize(props);
      const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'));

      return () => {
        const { iconData } = self._getIconData(slotIcon.value || props.icon);
        const slotValue = slots.default?.();
        if (slotValue) {
          slotIcon.value = flattenFragments(slotValue).filter(
            node => node.type === Text && node.children && typeof node.children === 'string',
          )[0]?.children as string;
        }
        const hasClick = !!(attrs.onClick || attrs.onClickOnce);

        return (
          <iconData.value.component
            tag={props.tag}
            icon={iconData.value.icon}
            class={[
              'v-icon',
              'notranslate',
              themeClasses.value,
              sizeClasses.value,
              textColorClasses.value,
              {
                'v-icon--clickable': hasClick,
                'v-icon--disabled': props.disabled,
                'v-icon--start': props.start,
                'v-icon--end': props.end,
              },
              props.class,
            ]}
            style={[
              !sizeClasses.value
                ? {
                    fontSize: convertToUnit(props.size),
                    height: convertToUnit(props.size),
                    width: convertToUnit(props.size),
                  }
                : undefined,
              textColorStyles.value,
              props.style,
            ]}
            role={hasClick ? 'button' : undefined}
            aria-hidden={!hasClick}
            tabindex={hasClick ? (props.disabled ? -1 : 0) : undefined}
          >
            {slotValue}
          </iconData.value.component>
        );
      };
    };
  }

  private _getIconData(iconName) {
    const iconInfo = getZovaIcon(iconName);
    if (iconInfo === undefined) return useIcon(computed(() => iconName));
    return {
      iconData: {
        value: {
          component: VSvgIconCabloy,
          icon: `#${iconInfo.symbolId}`,
        },
      },
    };
  }
}
