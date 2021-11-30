var api = "https://getfitapifinal.herokuapp.com/exercises"
var exerciseObjects = []//complete list of objects(exercises) on fetch api call
var chosenExercises = []//list of objects(exercises) on random on button click

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
        console.log(resp)
        
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
    console.log(chosenExercises)
}
function createMuscleGroups(){

    var select1 = $("<select>").addClass("muscle1")
    select1.append(
        $("<option>").text("Select Muscle").val(""), 
    )
    var select2 = $("<select>").addClass("muscle2")
    select2.append(
        $("<option>").text("Select Muscle").val(""), 
    )
    var submit = $("<input>").attr({"type":"submit","value":"submit"})
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
$(".formhandler").on("submit",function(e){
    e.preventDefault()
    displayExercises()
})
getExercises() //this will fetch all the exercises
//createMuscleGroups()//this will create the select options(muscles) in the form
createMuscleGroups()