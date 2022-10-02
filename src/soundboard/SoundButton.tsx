import React from "react";
import "./SoundButton.css"

type MyProps = any;
type MyState = { [key: string]: any };

class SoundButton extends React.Component<MyProps, MyState> {
  constructor(props:object) {
    super(props);
    this.state = {counter: 0};
    this.count.bind(this);
  }

  count = () => {
    this.setState({counter: this.state.counter+1});
    this.props.onClick(this.props.file);
  }

  render() {
    return <button
      onClick={( ) => this.count()}
      className={`${this.props.isActive ? "active" : ""} ${this.props.isStop ? "stop" : ""}`}>
      {this.props.text || this.props.file} ({this.state.counter})
    </button>
  }
}

export default SoundButton;
