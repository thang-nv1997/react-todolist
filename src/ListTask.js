import React from 'react';
import { ItemTask } from './ItemTask.js';
import { NewTask } from './NewTask.js';
import './style.css'

class ListTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      listTask: [],
      filterTask: [],
      selectTask: []
    };
  }

  handleAddUpdateEvent = (task) => {
    const update = this.state.listTask.some((taskupdate) => (task.id == taskupdate.id))
    console.log(update);
    if (!update) {
      this.setState(this.state.listTask = [...this.state.listTask, task])
    } else {
      const result = this.state.listTask.filter((taskupdate) => taskupdate.id != task.id);
      this.setState(() => ({ listTask: [...result, task] }));
    }

  }

  handleSearch = (event) => {
    const q = event.target.value.trim();
    this.setState(() => ({ q }))
    if (q == '') return;
    if (this.state.listTask.length > 0) {
      const result = this.state.listTask.filter((task) => task.title.toLowerCase().includes(q));
      console.log(result)
      this.setState(() => ({ filterTask: result }));
    }
  }

  handleDelete = (id) => {
    console.log(id);
    const result = this.state.listTask.filter((task) => task.id != id);
    console.log(result);
    this.setState(() => ({ listTask: result }));
  }

  handleDeleteBulk = () => {
    const listTask = this.state.listTask;
    const selectTask = this.state.selectTask;
    const result = listTask.filter((task) => {
      return !selectTask.some((selected) => selected == task.id)
    })
    console.log(result);
    this.setState(() => ({ listTask: [...result], selectTask: [] }))
  }

  handleCheck = (id) => {
    this.setState(() => ({ selectTask: [...this.state.selectTask, id] }));
  }

  handleUncheck = (id) => {
    const result = this.state.selectTask.filter((uncheckid) => uncheckid != id)
    console.log(result);
    this.setState(() => ({ selectTask: [...result] }));
  }

  renderContent(id) {

  }

  render() {
    const tasks = this.state.listTask;
    const length = tasks.length;
    return (
      <div className='task-div'>
        <div className='task-container'>
          <div className='task-width-50 '>
            <NewTask handleAddUpdateEvent={this.handleAddUpdateEvent}></NewTask>
          </div>
          <div className='task-width-50 '>
            <div className='task-div'>
              <h1>To Do list</h1>
              <div className=''>
                <input placeholder='Search...' value={this.state.q} onChange={this.handleSearch} className='task-width-100 task-center'></input>
              </div>
              {length > 0 && tasks.map((task) =>
                <ItemTask key={task.id} task={task} deleteTask={this.handleDelete} checkTask={this.handleCheck} uncheckedTask={this.handleUncheck} handleAddUpdateEvent={this.handleAddUpdateEvent}>
                </ItemTask>
              )}
              <div className='task-color-bulk-action'>
                {this.state.selectTask.length > 0 ?
                  
                  (<div className='task-container'>
                    <p>Bulk Action:</p>
                    <button className='task-color-done' onClick={this.hadnleDetail}>Done</button>
                    <button className='task-color-remove' onClick={this.handleDeleteBulk}>Remove</button>
                  </div>) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { ListTask }