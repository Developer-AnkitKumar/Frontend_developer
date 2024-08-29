const ellipses = document.querySelectorAll('.ellipes');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-write');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');
const labelRepresent = document.querySelector('.label');
const codeProcess = document.querySelector('.code');

const allLabel = [
    'Raise the bar by completing your goals!',
    'Well begin is half done!',
    'Just a step away, keep going!',
    'Whoa! you just a complete all the goal, time for chill',
]
const allCode = [
    '"Move one step ahead, today!"',
    '"Move next step ahead, today/tommorow!"',
    '“Keep Going, You are making great progress!”',
    '"you are great person and thanks to achive goal!'
]

const allGoal = JSON.parse(localStorage.getItem('allGoal')) || { // ydi local storage me data nhi hai to empty{} assign kr do.
    first: {
        name: '',
        completed: false,
    },
    second: {
        name: '',
        completed: false,
    },
    third: {
        name: '',
        completed: false,
    }
}
let completedGoalCount = Object.values(allGoal).filter((goal) => goal.completed).length
progressValue.style.width = `${(completedGoalCount / 3)*100}%`
progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`
labelRepresent.innerText = allLabel[completedGoalCount]
codeProcess.innerText = allCode[completedGoalCount]

ellipses.forEach((ellipes) =>{
    // console.log(ellipes);
    ellipes.addEventListener('click',(e) => {
        // console.log('ellipes clicked');
        // ellipes.parentElement.classList.toggle('completed')
        const allGoalAdded = [...inputFields].every(function(input){ //inputField ek array me store hai tbhi hmm every method call kr pa rhe hai.
            return input.value; //jayse he input pass krenge value call hone lgegi
        })
        if(allGoalAdded){
            ellipes.parentElement.classList.toggle('completed');
            progressValue.style.width = '33.33%'
            const inputId = ellipes.nextElementSibling.id //ellipes ko check krke next element to identify krna
            allGoal[inputId].completed = !allGoal[inputId].completed // yha false hai to true, true hai to false
            completedGoalCount = Object.values(allGoal).filter((goal) => goal.completed).length
            progressValue.style.width = `${(completedGoalCount / 3)*100}%`
            progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`
            labelRepresent.innerText = allLabel[completedGoalCount]
            codeProcess.innerText = allCode[completedGoalCount]
            localStorage.setItem('allGoal', JSON.stringify(allGoal))
        } else{
            progressBar.classList.add('show-error')
        }
    })  
})

inputFields.forEach((input) =>{
    // console.log(allGoal[input.id]);
    input.value = allGoal[input.id].name
    if(allGoal[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () =>{ //focus mins, 
        progressBar.classList.remove('show-error')
    })
    input.addEventListener('input', (e) =>{
        if(allGoal[input.id].completed){
            input.value = allGoal[input.id].name
            return
        }
        allGoal[input.id] = {
            name : input.value,
            completed : false, 
        }
        // console.log(allGoal); 
        localStorage.setItem('allGoal', JSON.stringify(allGoal))//json kisi bhi object ko string me convert kr deta hai.
    })
});