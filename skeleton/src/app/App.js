import m from '../../node_modules/mithril/mithril.js';

export default function App() {
  const div = document.createElement('div');
  div.innerHTML = 'Hello beachside world!';
  document.body.appendChild(div);
  const test = m('div', 'Hello beachside world!');
  console.log(test);
};

