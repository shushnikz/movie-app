//https://api.themoviedb.org/3/movie/550?api_key=954ce68a7df57e38c710852b0c2f08b0
// /discover/movie?sort_by=popularity.desc

//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=954ce68a7df57e38c710852b0c2f08b0

let url="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=954ce68a7df57e38c710852b0c2f08b0"

let imgurl="https://image.tmdb.org/t/p/w1280"

let searchurl="https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=954ce68a7df57e38c710852b0c2f08b0&query="

//get movies

getMovieData(url)

async function getMovieData(url){
   let data=await fetch(url)
   let res=await data.json()
   console.log(res)
   showMovies(res.results)
}

var mainMovieDiv=document.getElementById('mainMovieDiv')

function showMovies(movies){
   mainMovieDiv.innerHTML=""
   movies.map((element)=>{
    var movieDiv=document.createElement('div')
    movieDiv.classList.add('col','movie')

    movieDiv.innerHTML=`
    <div class="card h-100">
                <img src=${imgurl+element.backdrop_path} class="card-img-top" alt="...">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="w-100 me-3 card-title">${element.original_title}</h5>
                        <h6 class="p-1 w-auto"><span class='${getClassByRate(element.vote_average)}'>${element.vote_average}</span></h6>
                    </div>
                    <div class="card card-header overview">
                        <p>Overview</p>
                        <p>${element.overview}</p>
                      </div>
                </div>
              </div>

    `
    mainMovieDiv.append(movieDiv)
   })
}

//search
const form=document.getElementById('form')
const search=document.getElementById('search')

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  searchTerm=search.value
  console.log(searchTerm)
  console.log(searchurl+searchTerm)
  if(searchTerm && searchTerm.value!==""){
    getMovieData(searchurl+searchTerm)
  }
  else{
    window.location.reload()
  }
})


//ratng color

function getClassByRate(vote){
  console.log(vote)
  if(vote>8){
    return "green"
  }
  else if(vote>=5){
    return "orange"
  }
  else{
    return "red"
  }
}
