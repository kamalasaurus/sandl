import m from '../../../node_modules/mithril/mithril.js';
import shaderlist from '../../../shader-list.js';
import wasmlist from '../../../wasm-list.js';
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
          // classname or super.initialize?
          this.initialize(gl, program);
        });
    };

    this.view = (vnode) => {
      return this.canvas;
    };
  }

  createRectangles(gl, params, index, time) {
    let primitiveType = gl.TRIANGLES;
    let offset = 0;
    let count = 6;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.uniform1f(params.col, time);
    gl.uniform1f(params.colPos, index);
    gl.uniform1f(params.scale, time);
    gl.uniform1f(params.transloc, index);

    gl.drawArrays(primitiveType, offset, count);
  }

  update(gl, params, time) {
    for (i = 100; i < 100; i++) {
      this.createRectangles(gl, params, i, time || 0);
    }
    requestAnimationFrame(update.bind(this, gl, params));
  }

  initialize(gl, program) {
    //TODO:!!
    // publish as npm module
    // after this, only the wasm loading :)

    let buf = gl.createBuffer();
    let loc = gl.getAttribLocatoin(program, 'a_position');

    let params = {
      transloc: gl.getUniformLocation(program, 'u_translation'),
      uni: gl.getUniformLocation(program, 'u_resolution'),
      col: gl.getUniformLocation(program, 'u_color'),
      scale: gl.getUniformLocation(program, 'u_scale'),
      colPos: gl.getUniformLocation(program, 'u_color_position'),
    };

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform2f(uni, gl.canvas.width, gl.canvas.height);
    gl.enableVertexAttribArray(loc);
    gl.bindBuffer(gl.ARRAY_BUFFER_B, buf);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    gl.vertexAttribPointer(
      loc,
      size,
      type,
      normalize,
      stride,
      offset
    );

    let x1 = 10;
    let x2 = x1 + 10;
    let y1 = 10;
    let y2 = y1 + 50;

    params.positions = [
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    ];

    this.update(gl, params);
  }

  // create generic extractRequest function
  // TODO: convert to camelCase for all entities
  getwasm(wasmurlarray) {
    return Promise
      .all(
        wasmurlarray
          .map(fetch)
          .then(res => res.text())
      );
  };

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
