import axios from 'axios'

export const getList = () => {
    return axios
        .get('/api/tasks', {
        headers: { 
            'Content-Type': 'application/json',
        }
        })
        .then(res => {
            res.data.status = 'success'
            return res.data
        }).catch(err => {
            return {
                error:'Please login again!',
                status:'failed',
                message:err.message
            }
        })
}

export const addToList = task => {
  return axios
    .post(
      '/api/task',
      {
        name: task.name,
        description: task.description,
        timeTask: task.timeTask
      },
      {
        headers: {
            'Content-Type': 'application/json',
        }
      }
    )
    .then(function(response) {
        return response.data;
    }).catch(err => {
        return {
            error:'Error to add',
            status:'failed',
            message:err.message
        }
    })
}

export const deleteItem = (task) => {
  return axios
    .delete(`/api/task/${task}`, {
      headers: { 
            'Content-Type': 'application/json',
        }
    })
    .then(function(response) {
        console.log(response)
        return response;
    })
    .catch(function(error) {
      console.log(error)
      return error;
    })
}

export const updateItem = taskUpdateRequest => {
  return axios
    .put(
      `/api/task/${taskUpdateRequest.id}`,
      {
        name: taskUpdateRequest.name,
        description: taskUpdateRequest.description,
        timeTask: taskUpdateRequest.timeTask
      },
      {
        headers: { 
            'Content-Type': 'application/json',  
        }
      }
    )
    .then(function(response) {
        return response.data;
    })
}

