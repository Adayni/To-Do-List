import React, { Component } from 'react';
import './app.css'; //import stylesheet

class App  extends Component {
  constructor (props) {
    super (props);

    //creation of variables
    this.state={
      newItem:"",
      list:[]
    };
  }

  //local storgae functionality
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    window.addEventListener(
      "beforeunload", this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload", this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  //save to Local Storage
  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  
  //update react state
  updateInput(key, value){
    this.setState({
      [key]: value
    });
  }

  //AddItem function
  addItem() {

    //give each list item a unique ID
    const newItem={
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    //copy of current list of items
    const list = [...this.state.list];

    //add new item
    list.push(newItem);

    //update state with new list and reset input field
    this.setState({
      list,
      newItem:""
    });
  }

  //deleteItem function
  deleteItem(id) {
    
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({list: updatedList});
  }

  //JSX 
  render() {
    return (

      <div>

      <h1 className="heading">To-Do List</h1>

      <div className="App">
        <div>

          <p>What do you have to get done today?</p>
          <br/>

          <input type="text" placeholder="New item here..." value={this.state.newItem} onChange={e => this.updateInput("newItem", e.target.value)}/>
          <button className="add" onClick={() => this.addItem()} disabled={!this.state.newItem.length}>Add</button> 
          <br/>

          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>{item.value} {" "}
                  <button className="delete" onClick={() => this.deleteItem(item.id)}>
                    X
                  </button>
                </li>
              );              
            })}
          </ul>

        </div>
      </div>
      </div>
    );
  }
}
  
export default App;
