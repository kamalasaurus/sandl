import  m from '../../../node_modules/mithril/mithril.js'

export default class Canvas {

  constructor() {
    // assign canvas to vnode somehow
    // maybe have the fetch for the glsl here
    // instead of oninit?
  }

  oninit(vnode) {
    //get shaders with fetch, assign to vnode
  }

  view(vnode) {
    // return the vnode's canvas that's been modified; don't create a new one here
    return m('canvas', {id: 'canvas', oncreate: ()=>{ console.log(this); }});
  }

}

