//Vérifier l'authentification de l'utilisateur
document.addEventListener("DOMcontentLoaded", function () {
    const storedUsername = localStorage.getItem("username")
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (storedUsername && isAuthenticated === "true") {
        showUserMenu(storedUsername)
    } else {
        window.location.href = "login.html"
    }
})
//
function checkAuth(){
    const isAuthenticated =localStorage.getItem("isAuthenticated")
    if(isAuthenticated !== "true"){
        alert("Veuillez vous connecter pour acceder au quiz") 
        window.location.href="login.html"
    }
}

// Afficher le menu utilisateur 
function showUserMenu(username) {
    const unsernameDisplay = document.getElementById("username-display")
    usernameDisplay.textContent = username
    }
// Gérer la déconnexion
document.getElementById("logout-btn").addEventListener("click", function (){
    localStorage.setItem("isAuthenticated", false)
    window.location.href = "login.html"
})

/**
 * cette function affiche username dans le span, le nom utilisateur du localStorage
 * @param {*} username 
 */
function showUserMenu(username){
    const usernameDisplay= document.getElementById("username-display")
    usernameDisplay.textContent= username
}
//Unefois le DOM chargé, la fonction récupère l'username ()=>
document.addEventListener("DOMContentLoaded", function(){
    const storedUsername= localStorage.getItem("username")
    const isAuthenticated= localStorage.getItem("isAuthenticated")
    if(storedUsername && isAuthenticated === "true"){

        const usernameDisplay= document.getElementById("username-display")
        usernameDisplay.textContent= storedUsername 

        showUserMenu(storedUsername)

    }else{
        window.location.href="login.html"
    }
})


document.querySelectorAll(".energy-btn").forEach((btn) =>{
    btn.addEventListener("click", function () {
        const level = btn.getAttribute("data-level")
        loadCovoiturages(level)
    })
})

//Chargement des questions en fonction du niveau sélectionné
let currentCovoiturageIndex = 0
let covoiturages = []
let selectedEnergy = ""

const URL = "https://5c04bb89-58bb-4305-81eb-281342ab4afa.mock.pstmn.io/api/AllCovoiturages"


async function loadCovoiturages(energy){
    try{
        const response = await fetch("covoiturages.json")

        if (!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`)
        }
        const allCovoiturages = await response.json()
       
//Filtrer les questions par la conduite driving
        covoiturages = allCovoiturages.filter((c) => c.energy === energy)
        selectedEnergy = energy
        currentCovoiturageIndex = 0

        startService()
    }
    catch (error) {
        console.error("Erreur lors du chargement des covoiturages", error)
    }
}

//Démarrer le serv
function startService() {
    document.querySelector(".energy-selection").classList.add("hidden")
    document.getElementById("service-container").classList.remove("hidden")
}
//Afficher la question actuelle
function showCovoiturage() {
    if(currentCovoiturageIndex <covoiturages.length) {
        console.log(covoiturages)
        const covoiturageData = covoiturages[currentCovoiturageIndex]
        console.log("covoiturage data" + covoiturageData)
        const covoiturageContainer= document.getElementById("service-container")

        covoiturageContainer.innerHTML = `
        <div class"covoiturage">
        <p> ${covoiturageData.covoiturage} <p/>
        <div/>
        <form id="service-form">
         ${covoiturageData.options
         .map(
                (option, index)=> `
                <label class="option"> 
                    <input type="radio" name="answer" value="${option}">
                    <span class="custom-radio"></span>
                    ${option}
                </label>
                `
                )
            .join("")}
            <button type="button" onclick="submitAnswer()">Soumettre</button>
        </form>
        `
        }else{
            showFinalResult()
        }
}

//Soumettre la réponse actuelle
function submitAnswer(){
    const form = document.getElementById("service-form")
    const selectAnswer = form.answer.value

    if (!selectAnswer){
        alert("Veuillez sélectionner une réponse")
        return
    }
    //Vérifier la réponse et passer à la question suivante
    checkAnswer(selectAnswer)
    nextCovoiturage()
}
function nextCovoiturage(){
    currentCovoiturageIndex++
    showCovoiturage()
}
// Vérifier si la réponse est correcte

function checkAnswer(selectAnswer) {
    const currentCovoiturage = covoiturages[currentCovoiturageIndex]
    if (selectAnswer === currentCovoiturage.answer){
        incrementSeat()
    }
}
    
//Incrémenter le score

let seat = 0
function incrementSeat() {
    score++
}
//Afficher le résultat final
function showFinalResult() {
    const serviceContainer = document.getElementById("service-container")
    serviceContainer.innerHTML = `
    <div id="result>
    <p>Votre score final est de ${seat} sur ${covoiturages.length}.</p>
    </div>
    `
}
//
function submitService() {
    calculateScore(function(score) {
        displayResult(score, function() {
            handleMessage(score)
        })
    })
}

function calculateScore(callback){
    const correctAnswers ={
        q1:"Paris",
        q2:"Mercure",
        q3:"Jupiter",
    }
    const form = document.getElementById("service-form")
    let score=0
    for(const covoiturage in correctAnswers){
        const userAnswers= form[covoiturage].value
        if(userAnswers===correctAnswers[covoiturage]){
            score++
        }
    }
    callback(score)
}
//une fonction qui a la responsabilité d'afficher un mss en f° du score*/
/**
 * 
 * @param {*int} score 
 */

function handleMessage(score){
    const resultDIV = document.getElementById("result")

    //To clean the result on page
    resultDIV.classList.remove("excellent","good","try-again")
    if(score===3){
        resultDIV.innerHTML+=" <br>Excellent!"
        resultDIV.classList.add("excellent")
        }else if(score===2){
        resultDIV.innerHTML+=" <br>Bon travail, vous pouvez vous améliorer!"
        resultDIV.classList.add("good")
        }else{
        resultDIV.innerHTML+=" <br>Vous pouvez faire mieux!"
        resultDIV.classList.add("try-again")
    }
}
