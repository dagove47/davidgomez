import {
    resume
} from "./data.js";

const loader = document.getElementById("loader");
const formNewMessage = document.getElementById('formNewMessage');
const formInputs = document.querySelectorAll('#newName, #newEmail, #newSubject, #newMessage')
const submitBtn = document.getElementById('submitBtn');

window.addEventListener("load", () => {
    loader.style.display = "none";
})

/* 
    Home
*/

const name = document.querySelector('[data-name]');
const profession = document.querySelector('[data-profession]');
name.textContent = resume.basics.name;
profession.textContent = resume.basics.label;

/* 
    About
*/

const aboutInfo = document.querySelector('[data-aboutInfo]');

const sanitizer1 = new Sanitizer();
const aboutInfoText = document.createElement('p');
aboutInfoText.setHTML(resume.basics.summary, {
    sanitizer: sanitizer1
});
aboutInfo.append(aboutInfoText);

const skills = document.createElement('ul');
skills.className = "skills";
const skillList = resume.skills[0].keywords;
skillList.map(skill => {
    const liSkill = document.createElement('li');
    liSkill.textContent = skill;
    skills.append(liSkill);
})
aboutInfo.append(skills);

const aboutInfoImg = document.querySelector('[data-aboutInfo-img]');
const profileImg = document.createElement('img');
profileImg.setAttribute("src", `${resume.basics.image}`);
profileImg.setAttribute("alt", `${resume.basics.imageDescription}`);
aboutInfoImg.append(profileImg);


const aboutInfoJobs = document.querySelector('[data-jobs]');
const jobTemplate = document.querySelector('[data-jobs-template]');
const jobs = resume.work;
jobs.map(job => {
    const liJob = jobTemplate.content.cloneNode(true).children[0];
    const imgJob = liJob.querySelector('[data-job-img]');
    const linkJob = liJob.querySelector('[data-job-link]');

    imgJob.src = job.image;
    imgJob.alt = job.imageDescription;
    linkJob.href = job.url;
    linkJob.textContent = job.name;

    aboutInfoJobs.append(liJob);
})

/* 
    Work
*/

const cardContainer = document.querySelector('[data-card-container]');
const cardTemplate = document.querySelector('[data-card-template]');
const cards = resume.projects;
cards.map(card => {
    const project = cardTemplate.content.cloneNode(true).children[0];
    const cardImg = project.querySelector('[data-card-img]');
    const cardTitle = project.querySelector('[data-card-title]');
    const cardDescription = project.querySelector('[data-card-description]');
    const cardLink = project.querySelector('[data-card-link]');

    cardImg.src = card.image;
    cardImg.alt = card.imageDescription;
    cardTitle.textContent = card.name;
    cardDescription.textContent = card.description;
    cardLink.href = card.url;

    cardContainer.append(project);
})

/* 
    Contact
*/

formNewMessage.addEventListener('submit', function (event) {
    event.preventDefault();


    if (!formNewMessage.checkValidity()) {
        formNewMessage.classList.add('was-validated');
    } else {
        submitBtn.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'portfolio_form';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.value = 'Send Message!';
                clearInputs(formInputs);
                formNewMessage.classList.remove('was-validated');
                alert('Sent!');
            }, (err) => {
                submitBtn.value = 'Send Message!';
                clearInputs(formInputs);
                formNewMessage.classList.remove('was-validated');
                alert(JSON.stringify(err));
            });
    }
});

function clearInputs(inputs) {
    inputs.forEach(input => {
        input.value = '';
    });
}

/* 
    Footer
*/

const socialMediaFooter = document.querySelector('[data-footer-socialMedia]');
const socialMediaTemplate = document.querySelector('[data-socialMedia-template]');
const socialMedias = resume.basics.profiles;
socialMedias.map(socialMedia => {
    const conctact = socialMediaTemplate.content.cloneNode(true).children[0];
    const socialMediaIcon = conctact.querySelector('[data-socialMedia-icon]');

    conctact.href = socialMedia.url;
    socialMediaIcon.className = socialMedia.iconClassCall;

    socialMediaFooter.append(conctact);
})

const author = document.querySelector('[data-author]');
const authorLink = document.createElement('a');
authorLink.href = resume.basics.url;
authorLink.target = '_blank';
authorLink.textContent = resume.basics.name;
author.append(authorLink);