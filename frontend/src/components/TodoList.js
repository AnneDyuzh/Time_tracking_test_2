import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './TodoListFunctions'
import FormValidator from './FormValidator'

export class TodoList extends Component {
  
  constructor() {
    super()
    this.validator = new FormValidator([
      {
        field: 'task',
        method: 'isEmpty',
        validWhen: false,
        message: 'Task name is required'
      },
      {
        field: 'description',
        method: 'isEmpty',
        validWhen: false,
        message: 'Description is required'
      }
    ]);

    this.state = {
      id: '',
      task: '',
      description: '',
      createdAt: '',
      timeTask: '',
      isUpdate: false,
      isCount: false,
      errorMessage: '',
      items: [],
      validation: this.validator.valid(),
      timerOn: false,
      timerStart: 0,
      timerTime: 0
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }

  componentDidMount() {
    this.getAll()
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onCreate(e) {
    e.preventDefault()
    this.setState({
      id: '',
      task: '',
      description: '',
      createdAt: '',
      timeTask: '',
      isUpdate: false,
      errorMessage: '',
      items: [],
      validation: this.validator.valid(),
    });
    this.getAll()
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear();
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          task: '',
          description: '',
      timeTask: '',
          items: [...data]
        },
        () => {
          console.log(this.state.items)
        }
      )
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    if (validation.isValid) {

      const taskRequest = {
        name: this.state.task,
        description: this.state.description
      }

      addToList(taskRequest).then(() => {
        this.getAll()
      }).catch(err => {
        this.setState({ editDisabled: false, errorMessage: err.message })
      })
      this.setState({ editDisabled: false })
    }
  }

  onUpdateTime = e => {
    e.preventDefault()
      const taskUpdateRequest = {
        id: this.state.id,
        timeTask:  this.state.task
      }
      updateItem(taskUpdateRequest).then(() => {
        this.getAll()
      }).catch(err => {
        this.setState({ editDisabled: false, isUpdate: false, errorMessage: err.message })
      })
    this.setState({ editDisabled: false, isUpdate: false})
  }

  onUpdate = e => {
    e.preventDefault()
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    if (validation.isValid) {
      const taskUpdateRequest = {
        id: this.state.id,
        name: this.state.task,
        description: this.state.description,
      }
      updateItem(taskUpdateRequest).then(() => {
        this.getAll()
      }).catch(err => {
        this.setState({ editDisabled: false, isUpdate: false, errorMessage: err.message })
      })
    }
    this.setState({ editDisabled: false, isUpdate: false})
  }

  onEdit = (item_id, item, description, e) => {
    e.preventDefault()
    this.setState({
      id: item_id,
      task: item,
      description: description,
      errorMessage: '',
      isUpdate: true,
      validation: this.validator.valid(),
    })
  }

  TimerShow = (item_id, item, description, timeTask, e) => {
    e.preventDefault()
    this.setState({
      id: item_id,
      task: item,
      description: description,
      timeTask: timeTask,
      errorMessage: '',
      isCount: true
    })
  };

  onDelete = (val, e) => {
    e.preventDefault()
    deleteItem(val).then((res) => {
      if (res.data.status === 'failed') {
        this.setState({ errorMessage: res.data.message })
      }
      this.getAll();
    }).catch(err => {
      this.setState({ errorMessage: err.data.message })
    })
  }

  startTime = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTime = e => {
    let seconds = ("0" + (Math.floor(this.state.timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(this.state.timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(this.state.timerTime / 3600000)).slice(-2);
    let time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
    clearInterval(this.timer);
   e.preventDefault()
   this.setState({ timerOn: false});
      const taskUpdateRequest = {
        id: this.state.id,
        timeTask: time
      }
      updateItem(taskUpdateRequest).then(() => {
        this.getAll()
      }).catch(err => {
        this.setState({ editDisabled: false, errorMessage: err.message })
      })
    this.setState({timerStart: 0,timerTime: 0,
    isCount: false,})
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
        <div class="content">
          <div className="col-md-12 mt-5">
          <div className="col-md-6 justify-content-center">
            {this.state.errorMessage !== '' ?
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error Message: </strong> {this.state.errorMessage}
              </div>
              :
              <div></div>
            }
          </div>
          <div class='d-flex'>
              <div className="col-md-6 mt-2 AddTask">
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label class="float-left"  htmlFor="task">Название</label>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.task}
                    name="task"
                    onChange={this.onChange}
                  />
                  <span className="help-block">{this.state.validation.task.message}</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label class="float-left mt-4" htmlFor="description">Описание</label>
              <label htmlFor="task"></label>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.description}
                    name="description"
                    onChange={this.onChange}
                  />
                  <span className="help-block">{this.state.validation.description.message}</span>
              </div>
              </div>
            </div>
            <button className="btn btn-outline-primary mt-3 " onClick={this.onUpdate.bind(this)}
              style={this.state.isUpdate ? {} : { display: 'none' }}
            >
              Добавить изменения
            </button>
            <button class="btn btn-primary float-center col-5 mt-3" type="submit" onClick={this.onSubmit.bind(this)}
              style={this.state.isUpdate ? { display: 'none' } : {}}
            >
              Добавить
            </button>
            <button onClick={this.onCreate.bind(this)} className="btn btn-outline-danger mt-3 ml-3"
              style={this.state.isUpdate ? {} : { display: 'none' }}
            >
              Отменить редактирование
            </button>
          </form>
          </div>
            <div className="Stoptimer"  style={this.state.isCount ? {} : { display: 'none' }}>
                <div className="Stoptimer-display">
                    {hours} : {minutes} : {seconds}
                </div>
                {this.state.timerOn === false && (
                    <button class='btn-primary btn ' onClick={this.startTime}>Начать</button>
                )}
                {this.state.timerOn === true && (
                    <button class='btn-primary btn' onClick={this.stopTime}>Закончить</button>
                )}
                </div>
          </div>
          <table className="table col-md-12 mt-5">
            <thead class='bg-primary text-center text-white'>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th  class="">Дата</th>
                <th >Затраченное время</th>
                <th ></th>
              </tr>
            </thead>
            <tbody class='bg-light justify-content-center'>
              {this.state.items.map((item, index) => (
                <tr key={index}>
                  <td class='pt-4'>{item.name}</td>
                  <td class='text-left pt-4 pl-2'>{item.description}</td>
                  <td class='pt-4'>{this.formatDate(new Date(item.createdAt))}</td>
                  <td class='pt-4'>{item.timeTask}</td>
                  <td><button
                      className="btn btn-primary mr-3"
                       disabled={this.state.editDisabled}
                      onClick={this.TimerShow.bind(this, item.id, item.name, item.description, item.timeTask)}
                    >
                      Показать таймер
                    </button>
                 
                    <button
                      className="btn btn-primary mr-3"
                      disabled={this.state.editDisabled}
                      onClick={this.onEdit.bind(this, item.id, item.name, item.description)}
                    >
                      Отредактировать
                    </button>
                 
                
                    <button
                      href=""
                      className="btn btn-danger"
                      onClick={this.onDelete.bind(this, item.id)}
                    >
                      Выполнено
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    )
  }
}


export default TodoList