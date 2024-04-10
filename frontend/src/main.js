/*
  COMP2110 - Web Development Assignment
  Bailey Mele - 46426124
  This file is main.js
*/

import {Router} from './router.js'
import {Views} from './views.js'
import {errorView} from './views.js'
import { Auth } from './auth.js'
import {Model} from './model.js'

//Toggles dark mode through css
const toggleDLMode = () => {
    var element = document.innerHTML;
    element.classlist.toggleDLMode("dark-mode")
}

//Obtains the element searchbutton and when pressed submit loads the loadSearch() function
let searchButton = document.getElementById("searchbutton");
searchButton.onsubmit = Model.loadSearch();


//Passes the authentication details and if not null, returns "Logged in as bob" else "Invalid Username or Password"
const loginSuccess = () => {
    console.log("login success function")
    console.log()
    if (Auth.userData != null) {
        let tgt = document.getElementById('login-form')
        tgt.innerHTMl = "Logged in as bob";
    } else {
        let tgt = document.getElementById('login-form')
        tgt.innerHTMl = "Invalid Username or Password"; 
    }
}

//New object 'router' intialised with ErrorView
const router = new Router(errorView);

//Router for home view and search view (loads the loadSearch() function)
router.get('/', () => {
    if(Model.searchArray.length >0) {
        Model.loadSearch()
    } else {
        Views.homeView('main', Model.jobData)
    }
})
//Router for about view     if(searchArray = 0) {     } else { loadSearch() }
       
router.get('/about', () => {
    Views.aboutView()
})

//Router for help view
router.get('/help', () => {
    Views.helpView()
})

//Router for jobs view
router.get('/jobs', (pathInfo) => {
    if (Model.jobWithId(pathInfo.id) == null) {
        errorView()
    } else {
        Views.jobView('main', Model.jobWithId(pathInfo.id))
    }
})

//Router for company view
router.get('/companies', (pathInfo) => {
    if (Model.compWithId(pathInfo.id) == null) {
        errorView()
    } else {
        Views.companyView('main', Model.compWithId(pathInfo.id))
    }
})

router.get('/search', () => {
    Model.loadSearch()
})

router.get('/user', (pathInfo) => {
    let user = loginSuccess()
    userView('login-form', user)
})

// Handles the login information
const loginFormHandler = () => {
    if (!Auth.getUser()) {
        // install login handler
        const loginform = document.getElementById('login-form')
        loginform.onsubmit = (event) => {
            event.preventDefault();
            const username = loginform.elements['username'].value;
            const password = loginform.elements['password'].value;
            const authInfo = {
                'identifier': username,
                'password': password
            }
        
            //send authInfo to backend for user authentication
            Auth.login(authInfo)
        }
    }
}

const loginbutton = document.getElementById("loginbutton");
loginbutton.onsubmit = loginSuccess();

window.onload = Model.loadData;


const bindings = () => {
    loginFormHandler();
}

export const redraw = () => {
    router.route() 
    bindings()
    console.log(Model.jobData)
}
