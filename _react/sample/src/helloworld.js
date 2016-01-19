'use strict';

class Hello extends React.Component {
  render() {
    return <div>Hello, World!</div>;
  }
}

ReactDOM.render(
  <Hello />,
  document.getElementById("hello-world")
);