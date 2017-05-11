import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Button(props) {
  return (
    <button className={'btn-' + props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      screen: 0, // Screen will be only one rerendered
    };

    this.acumulator = 0; // Acumule the results
    this.operator = null; // Distincts operator
    this.isNewEntry = true; // Controls screen '0' default remove
  }

  // Reset all stats to default
  clearScreen() {
    this.acumulator = 0;
    this.operator = null;
    this.isNewEntry = true;
    this.setState({
      screen: 0,
    });
  }

  // Can write on screen while no operator is pushed
  numPressed( num ) {

    let output;

    // Omit 0's as first num
    if ( this.isNewEntry && num === "0") {
      return;
    }

    if ( this.isNewEntry ) {
      this.isNewEntry = false;
      output = num; // Remove the default '0' in screen for first time
    } else {
      output = this.state.screen + num; // Add nums on screen
    }

    // Update screen, and rerender
    this.setState({
      screen: output
    });
  }

  // Set operator, start second stage of operation
  opPressed( op ) {
    this.operator = op;
    this.acumulator = this.state.screen;
    this.isNewEntry = true;
  }

  showResult() {

    if ( this.operator ) {

      // Parse the string and transform it to code for simplicity.
      let res = eval( this.acumulator + this.operator + this.state.screen );

      this.acumulator = res;
      this.operator = null;
      this.isNewEntry = true;

      this.setState({
        screen: res
      });

    }

  }

  render() {
    return(
      <div className="app">
        <div className="screen">{this.state.screen}</div>

        <div className="numPanel">
          <div className="numRow">
            <Button value="1" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
            <Button value="2" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
            <Button value="3" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
          </div>
          <div className="numRow">
            <Button value="4" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
            <Button value="5" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
            <Button value="6" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
          </div>
          <div className="numRow">
            <Button value="7" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
            <Button value="8" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
            <Button value="9" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
          </div>
          <div className="numRow">
            <Button value="0" onClick={(ev) => {this.numPressed(ev.target.innerHTML);}}/>
          </div>
        </div>

        <div className="opPanel">
          <Button value="C" onClick={() => {this.clearScreen();}}/>
          <Button value="+" onClick={(ev) => {this.opPressed(ev.target.innerHTML);}}/>
          <Button value="-" onClick={(ev) => {this.opPressed(ev.target.innerHTML);}}/>
          <div>
            <Button value="=" onClick={(ev) => {this.showResult(ev.target.innerHTML);}}/>
          </div>

        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);