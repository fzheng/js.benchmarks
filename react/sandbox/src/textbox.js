'use strict';

class TextBoxList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {count: 1};
    this.add = this.add.bind(this);
  }

  add () {
    this.setState({
      count: this.state.count + 1
    });
  }

  render () {
    const items = [];
    for (let i = 0; i < this.state.count; i++) {
      items.push(<li><input type="text" placeholder="change me!"/></li>);
    }
    return (
      <ul>
        {items}
        <input type="button" value="Add a TextBox" onClick={this.add}/>
      </ul>
    );
  }
}

ReactDOM.render(
  <div>
    <p>Every time adding a new text box to the list, the whole list is re-rendered, but any text entered in the text boxes is left untouched because React is smart enough to just append the new text
      box instead of blowing away the old DOM nodes.</p>
    <TextBoxList />
  </div>,
  document.getElementById("text-box")
);