import React from 'react';

class UpdateTask extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.task
    }
  }
  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    this.setState(() => ({
      [name]: value,
    }))
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    // let id = Date.now().toString();
    let task = { ...this.state}
    this.props.handleAddUpdateEvent(task);
  }
  
  render() {
    const {title, desc, date, piority} = this.state;
    return (
      <div className='task-update'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name='title' value={title} onChange={this.handleInputChange} placeholder='Change new task...' className='task-width-100'></input>
          </div>
          <div>
            <label from='desc'>Description</label>
            <br></br>
            <textarea name='desc' value={desc} onChange={this.handleInputChange} id='desc' className='task-width-100'></textarea>
          </div>
          <div className='task-container'>
            <div className='task-width-50 task-inline-block'>
              <label form='duedate'>Due Date</label>
              <br></br>
              <input name='date' value={date} onChange={this.handleInputChange} type='date' className='task-width-100'></input>
            </div>
            <div className='task-width-50 task-inline-block'>
              <label form='piority'>Piority</label>
              <br></br>
              <select name='piority' defaultValue={piority} onChange={this.handleInputChange} id='piority' className='task-width-100'>
                <option value='low'>low</option>
                <option value='normal'>Normal</option>
                <option value='high'>high</option>
              </select>
            </div>

          </div>
        <div>

        <input className='task-color-green task-width-100' type='submit' value="Update" ></input>
        </div>
      </form>
      </div>
    ) 
  }
}

export { UpdateTask }