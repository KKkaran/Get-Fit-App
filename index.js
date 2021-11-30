console.log("working")
var api = "https://getfitapifinal.herokuapp.com/exercises"

function getExercises(){

    fetch(api)
    .then(function(res){
        return res.json()
    }).then(function(resp){
        console.log(resp)
    })
}
getExercises()

$(".formhandler").on("submit",function(e){
    e.preventDefault()
    console.log("form submitted")
})