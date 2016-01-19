'use strict';

class TextBoxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    let items = [];
    for (let i = 0; i < this.state.count; i++) {
      items.push(React.createElement(
        "li",
        null,
        React.createElement("input", { type: "text", placeholder: "change me!" })
      ));
    }
    return React.createElement(
      "ul",
      null,
      items,
      React.createElement("input", { type: "button", value: "Add an item", onClick: this.onAddClick })
    );
  }
}

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(
    "p",
    null,
    "Every time adding a new text box to the list, the whole list is re-rendered, but any text entered in the text boxes is left untouched because React is smart enough to just append the new text box instead of blowing away the old DOM nodes."
  ),
  React.createElement(TextBoxList, null)
), document.getElementById("text-box"));