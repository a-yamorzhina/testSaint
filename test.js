//создала новый класс User, чтобы разделить свойства и методы
//внесла правки в названия на camelCase

class User {

  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }

  get getUserName() {
    return this.userName;
    // изменила с UserService.userName на this.userName по правилами обращения внутри классов
  }

  // изменила название методов для ясности

  get getPassword() {
    return this.password;
    // throw "You are not allowed to get password";
  }

}


class UserService {
  // var userName;
  // var password;
  //нужные переменные мы объявляем в конструкторе

  static authenticateUser(user) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' +
      user.getUserName + '&password=' + user.getPassword, true);
    xhr.responseType = 'json';

    // const result = false; изменила на let, потому что ниже переменная переопределяется. Константы переопределять нельзя

    let result = false;

    xhr.onload = function () {
      if (xhr.status !== 200) {
        // убрала кавычки из 200, так как код запроса приходит цифрами
        result = xhr.response;
      } else {
        result = true;
      }
    };

    return result;

  }

}



$('form#login').submit(function (e) {

  e.preventDefault();

  let username = $('#username').val();
  let password = $('#password').val();

  const user = new User(username, password);
  //создаем новый объект класса User

  let res = UserService.authenticateUser(user);

  //передаем в метод авторизции объект с данными

  if(res === true) {
    document.location.href = '/home';
  } else {
    alert(res.error);
  }
})



