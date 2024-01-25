import React, { Component } from 'react'
import logoImg from './logo.png';

class Landing extends Component {
  render() {
    return (
      <div className="info">
        <div className="d-flex">
          <div className="col-md-7 float-left">
          <div class='float-right icon'><img src={logoImg} alt="logo" /></div>
          <div class='text-info-times'>
            <h1 className="display-4 text-left">Добро пожаловать в приложение Times.</h1>
            <h1 className="lead text-left mt-5">Times - это интуитивно понятное и пользовательски 
            дружественное приложение, 
            которое помогает организовать вашу жизнь, позволяя легко добавлять задачи, 
            отслеживать время выполнения и вносить изменения по мере необходимости.
            </h1>
            <h1 className="lead text-left mt-3">Простой и лаконичный интерфейс Times делает процесс добавления задач 
            максимально удобным. 
            Вы можете быстро записывать все свои обязательства, цели или проекты, нажимая на 
            соответствующую кнопку добавления новой задачи.</h1>
             <h1 className="lead text-left mt-3">Но Times не только позволяет добавлять задачи, он также предоставляет возможность 
            отслеживать время их выполнения. Это особенно полезно, когда вы стремитесь быть более 
            продуктивным и эффективным. Просто нажмите на кнопку "Засечь время" рядом с задачей, которую вы хотите 
            начать.
            </h1>
            <h1 className="lead text-left mt-3">
            Более того, Times предлагает возможность изменять задачи в любое время. 
            Если вам необходимо внести изменения в описание задачи или связанные с ней детали, 
            вы можете сделать это с легкостью. Просто нажмите на кнопку 'Отредактировать' рядом с задачей.</h1>
            <h1 className="lead text-left mt-4">
            Приложение Times поможет вам стать более организованным, продуктивным и эффективным. 
            Не откладывайте на завтра то, что можно сделать сегодня - начните использовать Times прямо 
            сейчас и приведите свою жизнь в порядок.</h1>
          </div>
          </div>
        </div>
        <div>
        
        </div>
      </div>
    )
  }
}

export default Landing