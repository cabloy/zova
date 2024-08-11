import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/',
    //to: '/a/home/home',
  },
  {
    separator: true,
  },
  {
    folder: true,
    title: 'Basic',
  },
  {
    title: 'State',
    caption: 'ref, computed',
    icon: '',
    to: '/a/demo/state',
  },
  {
    title: 'Component',
    caption: 'props, emits, slots',
    icon: '',
    to: '/a/demo/component',
  },
  {
    title: 'CSS-in-JS',
    caption: 'Style & Theme',
    icon: '',
    to: '/a/demo/style',
  },
  {
    folder: true,
    title: 'Quasar',
  },
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: ':social:school',
    href: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: ':editor:code',
    href: 'https://github.com/quasarframework',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: '::heart',
    href: 'https://awesome.quasar.dev',
  },
];

@Model()
export class ModelMenu extends BeanModelBase<ScopeModule> {
  select() {
    return this.$useQueryExisting({
      queryKey: ['select'],
      queryFn: async () => {
        return __MenuData;
        // const data = await this.scope.service.menu.select();
        // return data.filter(item => {
        //   return this.$router.checkPathValid(item.to);
        // });
      },
    });
  }
}
