import m from '../../../node_modules/mithril/mithril.js';
import shaderlist from '../../../shader-list.js';
// create manifest list to import wasm array
// create css -> json converters to import as js

export default class Canvas {
  constructor(opts) {
    // create css parser script to make it a loadable json for modular height/width
    // create script to generate module that has default css
    this.canvas = m('canvas', {id: 'canvas'});
    this.shaderlist = this.getshaders(shaderlist);

    this.oncreate = (vnode) => {
      let gl = vnode.dom.getContext('webgl');
      let program = gl.createProgram();

      let shaderTypes = {
        vert: 'VERTEX_SHADER',
        frag: 'FRAGMENT_SHADER'
      };

      this.shaderlist
        .then((shaderSrcs) => {
          Object.keys(shaderSrcs).forEach((type) => {
            shaderSrcs[type].forEach((src) => {
              let shader = gl.createShader(gl[shaderTypes[type]]);
              gl.shaderSource(shader, src);
              gl.compileShader(shader);
              gl.attachShader(program, shader);
            });
          });

          gl.linkProgram(program);
          this.initialize(gl, program);
        };
    };

    this.view = (vnode) => {
      return this.canvas;
    };
  }

  initialize(gl, program) {
    //TODO:!!
    //after this, only the wasm loading :)
    //then publish as npm module :)
    //build out the program here!!
  }

  getshaders({vert, frag}) {
     return Promise.resolve({
       vert: this.extractshaders(vert),
       frag: this.extractshaders(frag)
     });
  }

  extractshaders(shaderurlarray) {
    return Promise
      .all(
        shaderurlarray
          .map(fetch)
          .then(res => res.text())
      );
  }
}

