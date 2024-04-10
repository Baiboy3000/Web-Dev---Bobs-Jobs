export { Model }
import {errorView} from './views.js'
import {searchView} from './views.js'
import { redraw } from './main.js'

const Model = {

//Global variablesc (array)
    jobData : [],
    companyData : [],
    searchArray : [],

//Variables storing data from backend
    jobDatabaseUrl  : 'http://localhost:1337/api/jobs?populate=*&sort=publishedAt:Desc',
    compDatabaseUrl : 'http://localhost:1337/api/companies',

//function to load job data into the main.js
    loadData : () => {
    fetch(Model.jobDatabaseUrl)
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((data) => {
        Model.jobData = data.data
        console.log(Model.jobData)
        redraw()
    })
},

// Finds the job with given id and returns it
    jobWithId : (id) => {
    console.log(id)
    for (let i=0; i<Model.jobData.length; i++) {
        if(Model.jobData[i].id == id) {
            return Model.jobData[i];
        }
    }
    return null;
},

// Finds the company with given id and returns it
    compWithId : (id) => {
    for (let i=0;i<Model.jobData.length; i++) {
        if (Model.jobData[i].attributes.company.data.id == id) {
            console.log(Model.jobData)
            return Model.jobData[i];
        }
    }
    return null
},
    //Loads the data required for the search function and adds it to the array searchArray
    loadSearch : () => {
    let val = window.location.href.substring(window.location.href.lastIndexOf("=")+1)
    fetch('http://localhost:1337/api/jobs?populate=company&filters[description][$containsi]=' + val)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("hit")
            console.log(val);
            Model.searchArray = data.data
            console.log(Model.searchArray)
            if (Model.searchArray.length > 0) {
                searchView('main', Model.searchArray, val)
            } else { errorView('main', val) }
        })
},
};
/*
const loadDataComp = () => {
    fetch(compDatabaseUrl)
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((data) => {
        companyData = data.data
        console.log(companyData)
        redraw()
    })
}*/


