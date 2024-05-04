import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherPageComponent } from './mother.js';
import Card from '../../component/card/index.vue';
import * as MotherCard from '../../component/card/mother.js';

export interface RenderPageComponent extends MotherPageComponent { }

@Local()
export class RenderPageComponent extends BeanRenderBase {
  render() {
    const slots = {
      header: () => {
        return <div>this is a header slot from parent</div>;
      },
      default: () => {
        return <div>this is a default slot from parent</div>;
      },
      footer: () => {
        return <div>this is a footer slot from parent</div>;
      },
    } as MotherCard.Slots;
    return (
      <div>
        <Card
          header="header"
          content={this.resetTime.toString()}
          footer="footer"
          onReset={time => {
            this.resetTime = time;
          }}
          v-slots={slots}
        ></Card>
      </div>
    );
  }
}
