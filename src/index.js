import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var pages = {
  start: {
    content:
      "Welcome to the farmer's market! What will you be shopping for today?",
    image: "market.jpg",
    label1: "Fruit",
    label2: "Vegetables",
    page1: "fruit",
    page2: "veggies"
  },
  fruit: {
    content: "Welcome to the fruit section! What are you interested in today?",
    image: "fruit.jpg",
    input: {
      type: "select",
      values: [
        "",
        "Tangerines",
        "Apples",
        "Pears",
        "Bananas",
        "Peaches",
        "Apricots"
      ],
      saveKey: "fruit"
    },
    label1: "Next",
    page1: "quantity"
  },

  checkout: {
    content:
      "We'll get that in a bag for you! Slide your card whenever you're ready!",
    input: {},
    label1: "Pay"
  },

  veggies: {
    content:
      "Welcome to the vegetable section! What are you interested in today?",
    image: "veggies.jpg",
    input: {
      type: "select",
      values: [" ", "Carrots", "Cucumbers", "Bell Peppers", "Beets"],
      saveKey: "veggie"
    },
    label1: "Next",
    page1: "quantity"
  },

  quantity: {
    content: "Wonderful! How many lbs would you like?",
    input: {
      type: "text",
      saveKey: "lbs"
    },
    label1: "Next",
    page1: "checkout"
  },

  checkout: {
    content:
      "We'll get that in a bag for you! Slide your card whenever you're ready!",

    label1: "Pay",
    page1: "start"
  }
};

class Page extends Component {
  render() {
    var pageData = pages[this.props.pageName];
    if (!pageData) {
      throw new Error("Eek! No page here!");
    }

    var goToPage = this.props.goToPage;
    var saveUserData = this.props.saveUserData;

    function goToPage1() {
      goToPage(pageData.page1);
    }
    function goToPage2() {
      goToPage(pageData.page2);
    }
    function handleChange(event) {
      saveUserData(pageData.input.saveKey, event.target.value);
    }

    var image = "";
    if (pageData.image) {
      image = (
        <div>
          <img className="main-page-image" src={pageData.image} />
        </div>
      );
    }
    var button1 = "";
    if (pageData.page1) {
      button1 = <button onClick={goToPage1}>{pageData.label1}</button>;
    }
    var button2 = "";
    if (pageData.page2) {
      button2 = <button onClick={goToPage2}>{pageData.label2}</button>;
    }
    var input = "";
    if (pageData.input) {
      var inputData = pageData.input;
      if (inputData.type == "select") {
        input = (
          <p>
            <select
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            >
              {inputData.values.map(v => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </p>
        );
      } else if (inputData.type == "text") {
        input = (
          <p>
            <input
              type="text"
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            />
          </p>
        );
      }
    }

    return (
      <div>
        <p>{pageData.content}</p>
        {input}
        <img className="main-page-image" src={pageData.image} />
        <br />
        {button1}
        {button2}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "start",
      userData: {}
    };

    this.goToPage = this.goToPage.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }

  saveUserData(key, value) {
    function updateState(state) {
      var newState = { userData: { ...state.userData, [key]: value } };
      return newState;
    }
    this.setState(updateState);
  }

  render() {
    return (
      <div className="App">
        <Page
          pageName={this.state.page}
          goToPage={this.goToPage}
          userData={this.state.userData}
          saveUserData={this.saveUserData}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
