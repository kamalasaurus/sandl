import  m from '../../../node_modules/mithril/mithril.js'

export default class Canvas {
  constructor(opts) {
    // create css parser script to make it a loadable json for modular height/width
    // create script to generate module that has default css
    this.canvas = m('canvas', {id: 'canvas', oncreate: ()=> { console.log('canvas created!')}});
    // maybe have the fetch for the glsl here
    // instead of oninit?

    this.oninit = (vnode) => {
      //get shaders with fetch, assign to vnode?  Or promise link earlier in const.
    };

    this.view = (vnode) => {
      return this.canvas;
    }
  }
}

