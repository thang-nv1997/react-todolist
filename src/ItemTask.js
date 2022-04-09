import React from 'react';
import { UpdateTask } from './UpdateTask.js';


class ItemTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      checked: false,
    }
  }
  handleShow = () => {
    this.setState({ show: !this.state.show });
  }

  handleCheck = (event) => {
    const checked = event.target.checked;
    this.setState(() => ({ checked }))
    const { checkTask, uncheckedTask, task } = this.props;
    if (checked) {
      checkTask(task.id);
    } else {
      uncheckedTask(task.id);
    }
  }

  render() {
    const task = this.props.task;

    return (
      <>
      <div className='task-border'>
        <div>
          <div className='task-container'>
            <input type="checkbox" onChange={this.handleCheck} checked={this.state.checked}></input>
            <p>{task.title}</p>
            <button className='task-color-detail ' onClick={() => this.handleShow()} >Detail</button>
            <button className='task-color-remove ' onClick={() => this.props.deleteTask(task.id)} >Remove</button>
          </div>

        </div>
      </div>
      {!this.state.show ? null :
          ( 
            
            <UpdateTask task={task} handleAddUpdateEvent={this.props.handleAddUpdateEvent}></UpdateTask>
            
          ) 
      }
      </>
    )
  }
}

export { ItemTask }