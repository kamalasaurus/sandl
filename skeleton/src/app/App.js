import m from '../../node_modules/mithril/mithril.js';

// add mithril router, initialize canvas, initialize webassembly

export default function App(root) {
  const div = document.createElement('div');
  div.innerHTML = 'Hello beachside world!';
  document.body.appendChild(div);
  const test = m('div', 'Hello beachside world!');
  console.log(test);
};

