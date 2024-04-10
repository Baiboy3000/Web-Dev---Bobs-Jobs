/*
  COMP2110 - Web Development Assignment
  Bailey Mele - 46426124
  This file is views.js
*/

export const Views = {
    //Home page view function. Compiles and displays first 10 jobs ordered by earliest date published
    homeView: function(id,jobData) {
        console.log
        let prevPageId = document.getElementsByClassName('selected')[0]
        classSwap(prevPageId, 'Home')
        let slicedJobData = []
        slicedJobData = jobData.slice(0,10)  
        console.log(slicedJobData); 
        const template = Handlebars.compile(`
        <h2>Job Board!</h2>
        <h2>filtered by 'recently published'</h2>
        <div class = joblist>
        {{#each slicedJobData}}
            <div id='job'>
            <div class='job'>
                    <ul>
                        <p> <a href="/#!/jobs/{{id}}">{{attributes.title}}<a/></p>
                        <p>{{attributes.location}}</p>
                        <p>{{attributes.type}}</p>
                    </ul>
                </div>   
            </div>
        {{/each}}
        </div>
        `)
        console.log(slicedJobData);
        let target = document.getElementById(id)
        target.innerHTML = template({slicedJobData})
    },
    //About page view function. Compiles and displays the about text
    aboutView: function() {
        let prevPageId = document.getElementsByClassName('selected')[0]
        classSwap(prevPageId, 'About')
        let template = document.getElementById('main')
        template.innerHTML = `
        <h3>Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!</h3>
        <ol>1. Use facts, not hype</ol>
        <ol>2. Inspire trust by providing useful info.</ol>
        <ol>3. Tell visitors what they want to know.</ol>
        <ol>4. Specifics are better than bold claims.</ol>
        <ol>5. Allow a peek behind the curtains.</ol>
        <ol>6. Be empathetic to build a connection.</ol>
        <ol>7. Express your values and beliefs.</ol>
        <ol>8. List credentials, certifications, awards.</ol>
        <ol>9. Include a photo of you “in action.”</ol>
        <ol>10. Be interesting!</ol>
        `
    },
    //Help page view function. Compiles and displays the help text
    helpView: function() {
        let prevPageId = document.getElementsByClassName('selected')[0]
        classSwap(prevPageId, 'Help')
        let template = document.getElementById('main')
        template.innerHTML = `
        <h3>Be sure to he honest in your application!</h3>
        <p id="lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis nisl at nisi imperdiet, 
        quis imperdiet dui laoreet. Sed et eros eu tellus placerat rutrum. Nulla consectetur, velit in molestie mattis, 
        dolor libero mollis ex, non blandit justo odio at sem. Vivamus posuere risus a diam maximus facilisis. 
        Aliquam sit amet placerat sem. Aliquam eu augue vel felis tincidunt accumsan convallis ac ante. 
        Mauris eu lacinia metus. Pellentesque imperdiet sem eget risus lobortis gravida. Curabitur sed cursus libero.</p>
        <img src="https://c.tenor.com/xYxQwGma7NIAAAAC/application-finishing-up-job-application.gif">
        <img src="https://c.tenor.com/AnWNRWE78A8AAAAM/apply-apply-apply-apply.gif" height="50%" width="50%">

        `
    },
    //Company page view function. Compiles and displays a company
    companyView: function(id, compWithId) {
        console.log(id)
        console.log(compWithId)
        let template = document.getElementById(id)
        template = Handlebars.compile(`
            <div id='company'>
                <ul>
                    <a href="/#!/companies/{{id}}">{{attributes.name}}</a></li>
                    <li><img src='{{attributes.logo}}' alt='company logo'></li>
                    <li>{{attributes.createdAt}}</li>
                    <li>{{attributes.updatedAt}}</li>
                    <li>{{attributes.publishedAt}}</li>
                </ul>
            </div>
        `)
        let target = document.getElementById(id)
        target.innerHTML = template(compWithId);
    },
    //Job page view function. Compile template and displays jobs
    jobView: function(id, jobWithId) {
        console.log(id);
        console.log(jobWithId);
        let template = document.getElementById(id)
        template = Handlebars.compile(`
        <div id='job'>
            <div class="job-description">
            <a href="/#!/jobs/{{id}}"><h2>{{attributes.title}}</h2><a/>
            <p>{{attributes.location}}</p>
            <p>{{attributes.type}}</p>
            <b></b>
            {{{attributes.description}}}
            <b></b>
        </div> 
        `)

        let target = document.getElementById(id)
        target.innerHTML = template(jobWithId); 

    
    },

    userView: function (id, loginSuccess) {
        console.log(loginSuccess())
        const template = Handlebars.compile(`
        <h3> 'loginSuccess' </h3>
        `)

        let target = document.getElementById(id)
        target.innerHTML = template;
    }
}



export const searchView = (id , searchArray, val) => {
    console.log('on page', val)
    console.log(searchArray)
    console.log(id)
    const template = Handlebars.compile(`
    <h2> Search results for '{{val}}' </h2>

    <div id="joblist">
        {{#each searchArray}}
        <div id=job>
            <div class="job">
                <p> <a href="/#!/jobs/{{id}}">{{attributes.title}}<a/></p>
                <p>{{attributes.location}}</p>
                <p>{{attributes.type}}</p>
            </div>
            </div>
        {{/each}}
    </div>
    `);
    const target = document.getElementById(id);
    target.innerHTML = template({searchArray, val});

    console.log(window.location.href)

    
/*
    const tgt = document.getElementById('form');
    tgt.innerHTML = `
    <form id="form"> 
                <a href=""/#!/search/{{val}}"
                <input type="search" id="search" name="search" placeholder="Search...">
                <button id="searchbutton"  onsubmit="loadSearch()">Submit</button>
            </form>
    `*/
}



// Error message for unknown pages
export const errorView = function() {
    let target = document.getElementById('main')
    target.innerHTML = `
    <h3>Page Not Found! Please go back now!</h3>
    <img src="https://media0.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif?cid=ecf05e47nkni5btf0n7egnf1tqm76z5ezrvn7l3i2oyf7k2e&rid=giphy.gif&ct=g" height="50%" width="50%">

    `
}
// replaces the 'pagelink' class with the selected' class depending on current page the window is showing
export const classSwap = (prevPage, currentPage) => {
    if (prevPage == undefined) {
        document.getElementById(currentPage).classList.replace('pagelink', 'selected')
    } else {
        document.getElementById(prevPage.id).classList.replace('selected', 'pagelink')
        document.getElementById(currentPage).classList.replace('pagelink', 'selected')
    }
}