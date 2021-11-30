var api = "https://getfitapifinal.herokuapp.com/exercises"
var exerciseObjects = []
var chosenExercises = []

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
    })
}

function displayExercises(){

    var m1 = $("#lang1").find(":selected").text()
    var m2 = $("#lang2").find(":selected").text()
    var chosenExer = []
    exerciseObjects.forEach((el) =>{
        chosenExer = []
        if((m1 === el["muscle"]) || (m2 === el["muscle"])){
            //  console.log(el["muscle"])
            //  console.log(el["exercises"])
            // console.log(el["muscle"])
            var d = el["exercises"]
            //console.log("random Now:")
            for(let v=0;v<4;v++){
                var  g = Math.floor(Math.random() * (d.length - v))
                //console.log(d[g])
                chosenExer.push(d[g])
                d.splice(d.indexOf(d[g]),1) 
            }
            console.log(chosenExer.length)
            var obj = {
                "muscle" : el["muscle"],
                "exercises" : chosenExer
            }
            chosenExercises.push(obj)
        }
        
    })

    console.log(chosenExercises)
}

function createRandomIndices(){

}
$(".formhandler").on("submit",function(e){
    e.preventDefault()
    displayExercises()
})
getExercises() //this will fetch all the exercises
