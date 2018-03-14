import delay from './delay';

//This would be performed on the server in a real app. Just stubbing in.
function generateId()
 {
   const rand = Math.floor(( 1+Math.random() * 800000)); 
  return rand;
}

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const users = [
  {
    id: generateId(),
    name: "Karthik",
    role: "admin"
  },
 {
    id: generateId(),
    name: "Shan",
    role: "HR"
  } ,
   {
    id: generateId(),
    name: "Gowsar",
    role: "admin"
  },
 {
    id: generateId(),
    name: "Kumar",
    role: "Developer"
  } ,
   {
    id: generateId(),
    name: "Mega",
    role: "Tester"
  },
 {
    id: generateId(),
    name: "Siva",
    role: "Developer"
  } 
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

class UserApi {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], users));
      }, delay);
    });
  }

  static saveUser(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
     
        if (user.id) {
          const existingUserIndex = users.findIndex(a => a.id == user.id);
          users.splice(existingUserIndex, 1, user);
        } else {
          //Just simulating creation here.
          //Cloning so copy returned is passed by value rather than by reference.
          user.id = generateId(user);
          users.push(user);
        }

        resolve(user);
      }, delay);
    });
  }

  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfUserToDelete = users.findIndex(user => {
          return user.id == userId;
        });
        debugger;
        users.splice(indexOfUserToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default UserApi;
