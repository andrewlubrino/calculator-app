import React from "react";
import "bootstrap";
import "./styles.css";

const operatorObject = {
  "+": function (x, y) {
    return x + y;
  },
  "-": function (x, y) {
    return x - y;
  },
  "*": function (x, y) {
    return x * y;
  },
  "/": function (x, y) {
    return x / y;
  }
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      firstOperand: "",
      operator: null,
      secondOperand: ""
    };
    this.handleNumClick = this.handleNumClick.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }
  handleNumClick = (numValue) => {
    if (this.state.operator === null) {
      this.setState({
        display: this.state.firstOperand + numValue,
        firstOperand: this.state.firstOperand + numValue,
        operator: this.state.operator,
        secondOperand: this.state.secondOperand
      });
    } else {
      this.setState({
        display: this.state.secondOperand + numValue,
        firstOperand: this.state.firstOperand,
        operator: this.state.operator,
        secondOperand: this.state.secondOperand + numValue
      });
    }
  };

  handleOperator = (numValue) => {
    if (this.state.secondOperand === "") {
      this.setState({
        display: this.state.display,
        firstOperand: this.state.firstOperand,
        operator: numValue,
        secondOperand: this.state.secondOperand
      });
    } else {
      let first = this.evaluateExpression(this.state);
      this.setState({
        display: first,
        firstOperand: first,
        operator: numValue,
        secondOperand: ""
      });
    }
  };

  evaluateExpression = (state) => {
    let first = parseFloat(state.firstOperand, 10);
    let second = parseFloat(state.secondOperand, 10);
    let operator = state.operator;
    return operatorObject[operator](first, second);
  };

  handleDecimal = (numValue) => {
    let regEx = /[.]/g;
    if (this.state.operator === null) {
      if (!regEx.test(this.state.firstOperand)) {
        this.setState({
          display: this.state.firstOperand + numValue,
          firstOperand: this.state.firstOperand + numValue,
          operator: this.state.operator,
          secondOperand: this.state.secondOperand
        });
      }
    } else {
      if (!regEx.test(this.state.firstOperand)) {
        this.setState({
          display: this.state.secondOperand + numValue,
          firstOperand: this.state.firstOperand,
          operator: this.state.operator,
          secondOperand: this.state.secondOperand + numValue
        });
      }
    }
  };

  handleEqual = () => {
    if (this.state.secondOperand === "") {
      let displayToken = this.state.firstOperand;
      this.setState({
        display: displayToken,
        firstOperand: displayToken,
        operator: null,
        secondOperand: ""
      });
    } else {
      let first = this.evaluateExpression(this.state);
      this.setState({
        display: first,
        firstOperand: first,
        operator: null,
        secondOperand: ""
      });
    }
  };

  handleClear = () => {
    this.setState({
      display: 0,
      firstOperand: "",
      operator: null,
      secondOperand: ""
    });
  };

  handleZero = (numValue) => {
    if (this.state.operator === null) {
      if (!(this.state.firstOperand === "")) {
        this.setState({
          display: this.state.firstOperand + numValue,
          firstOperand: this.state.firstOperand + numValue,
          operator: this.state.operator,
          secondOperand: this.state.secondOperand
        });
      }
    } else {
      if (!(this.state.secondOperand === "")) {
        this.setState({
          display: this.state.secondOperand + numValue,
          firstOperand: this.state.firstOperand,
          operator: this.state.operator,
          secondOperand: this.state.secondOperand + numValue
        });
      }
    }
  };

  render() {
    return (
      <div className="body-class">
        <div id="container">
          <div id="display">
            <p>{this.state.display}</p>
          </div>
          <div className="row row-format">
            <Button numValue="0" callBack={this.handleZero} />
            <Button numValue="1" callBack={this.handleNumClick} />
            <Button numValue="2" callBack={this.handleNumClick} />
            <Button numValue="+" callBack={this.handleOperator} />
          </div>
          <div className="row row-format">
            <Button numValue="3" callBack={this.handleNumClick} />
            <Button numValue="4" callBack={this.handleNumClick} />
            <Button numValue="5" callBack={this.handleNumClick} />
            <Button numValue="-" callBack={this.handleOperator} />
          </div>
          <div className="row row-format">
            <Button numValue="6" callBack={this.handleNumClick} />
            <Button numValue="7" callBack={this.handleNumClick} />
            <Button numValue="8" callBack={this.handleNumClick} />
            <Button numValue="*" callBack={this.handleOperator} />
          </div>
          <div className="row row-format">
            <Button numValue="9" callBack={this.handleNumClick} />
            <Button numValue="." callBack={this.handleDecimal} />
            <Button numValue="=" callBack={this.handleEqual} />
            <Button numValue="/" callBack={this.handleOperator} />
          </div>
          <div className="row row-format">
            <Button numValue="Clear" callBack={this.handleClear} />
          </div>
        </div>
      </div>
    );
  }
}

class Button extends React.Component {
  onPress = (event) => {
    this.props.callBack(this.props.numValue);
  };

  render() {
    return <button onClick={this.onPress}>{this.props.numValue}</button>;
  }
}

export default Calculator;
