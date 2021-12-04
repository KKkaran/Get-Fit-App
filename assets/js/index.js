var api = "https://getfitapifinal.herokuapp.com/exercises"
var exerciseObjects = []//complete list of objects(exercises) on fetch api call
var chosenExercises = []//list of objects(exercises) on random on button click\
var daysNexercises = [] //list of all the exercises assigned to a specific day
var day
function getExercises(){

    fetch(api)
    .then(function(res){
        return res.json()
    }).then(function(resp){
        //console.log(resp)
        resp.forEach(exer => {
            var obj = {}
            obj["muscle"] = exer["muscle"]
            obj["exercises"] = exer["exercises"]

            exerciseObjects.push(obj)
        });
        //console.log(resp)
        
    })
}
function displayExercises(){

    var m1 = $(".muscle1").find(":selected").text()
    var m2 = $(".muscle2").find(":selected").text()
    var chosenExer = []
    exerciseObjects.forEach((el) =>{
        chosenExer = []
        if((m1 === el["muscle"]) || (m2 === el["muscle"])){
            var d = el["exercises"]
            for(let v=0;v<4;v++){
                var  g = Math.floor(Math.random() * (d.length - v))
                chosenExer.push(d[g])
                d.splice(d.indexOf(d[g]),1) 
            }
            var obj = {
                "muscle" : el["muscle"],
                "exercises" : chosenExer
            }
            chosenExercises.push(obj)
        }
    })
    //console.log(chosenExercises)
}
function createMuscleGroups(){

    var select1 = $("<select>").addClass("muscle1")
    select1.append(
        $("<option>").text("Muscle").val(""), 
    )
    var select2 = $("<select>").addClass("muscle2")
    select2.append(
        $("<option>").text("Muscle").val(""), 
    )
    var submit = $("<input>").addClass("button btn").attr({"type":"submit","value":"Submit"})
    $(".formhandler").append(select1,select2,submit)
    setTimeout(addDynamicMuscleGroups , 1000)
}
function addDynamicMuscleGroups(){
    var select = $(".muscle1")
    exerciseObjects.forEach(el =>{
        select.append(
            $("<option>").text(el["muscle"]).val(el["muscle"]), 
        )
    })
    var select2 = $(".muscle2")
    exerciseObjects.forEach(el =>{
        select2.append(
            $("<option>").text(el["muscle"]).val(el["muscle"]), 
        )
    })
    
}
function getCurrentDay(){
    day = moment().format("dddd")
    //console.log(day)
    $(`.${day}`).parent("article").css("background","lightgreen")
}
function displayInCard(ce,weekday){
    //console.log(ce,weekday)
    var musc1 = $("<div>")
    ce.forEach(el=>{
        var musc = $("<ul>").text(el["muscle"]).addClass("ul")

        el["exercises"].forEach(exer=>{
            var exerc = $("<li>").text(exer)
            musc.append(exerc)
        })
        $(`.${weekday}`).parent("article").find("img").css({"width": "80px","height":"80px"});
        musc1.append(musc)
        

    })
    $(`.${weekday} div`).replaceWith(musc1)
    var obj  ={}
    obj.day = weekday
    obj.exercises = chosenExercises
    if(chosenExercises.length == 0){
        return
    }
    var f = -1;
    daysNexercises.forEach(el=>{
        f++
        if(el["day"] === weekday){
            console.log("day already exists")
            daysNexercises.splice(f,1)
        }
    })
    daysNexercises.push(obj)
    console.log(daysNexercises)

    saveLocalStorage()
    chosenExercises = []
}
function saveLocalStorage(){
    //console.log(daysNexercises)
    localStorage.setItem("exercises1",JSON.stringify(daysNexercises))
}
function loadLocalStorage(){
    var ex = localStorage.getItem("exercises1")

    if(!ex){
        console.log("empty storage")
        return
    }
    daysNexercises = JSON.parse(ex)
    //console.log(daysNexercises)
    daysNexercises.forEach(el=>{
        //console.log(el)
        displayInCard(el["exercises"],el["day"])
    })

    //saveLocalStorage()

}

$(".closebtn").on("click",()=>{
    $(".modal").css("display","none")
})
window.addEventListener("click",(e)=>{
    
    if(e.target.matches(".modal")){
        $(".modal").css("display","none")
    }

})
$(".formhandler").on("submit",function(e){
    e.preventDefault()
    if(($('.muscle1').prop('selectedIndex') === 0) || ( $('.muscle2').prop('selectedIndex') === 0)){
        console.log("empty")
        $(".modal").css("display","block")
        return
    }
    displayExercises()
    displayInCard(chosenExercises,day)
    
})
getExercises() //this will fetch all the exercises
createMuscleGroups()//this will create the select options(muscles) in the form
getCurrentDay()
loadLocalStorage()
