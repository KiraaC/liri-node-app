// links all the .env files
require("dotenv").config();

var keys = require("./keys.js")
var axios = require("axios")
var moment = require("moment")
var fs = require("fs")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
// will load keys.js with console.log
var inquirer = require("inquirer")

var API_KEY = '8d513994'
var url = `http://www.omdbapi.com/?apikey=${API_KEY}&`

function searchOmdb(){
  inquirer.prompt ([{
    type: "input",
    message: "Search for a movie",
    name: "OmdbSearch"
  }]).then(inquireResponse => {
    console.log(inquireResponse.OmdbSearch)
    let queryURL = `${url}t=${inquireResponse.OmdbSearch}`
    // 
    axios.get(queryURL).then(res => {
      console.log(res)
    })
  })

}


function searchBands() {
  inquirer.prompt ([{
    type: "input",
    message: "Search for a band",
    name: "BandsInTown"
  }]).then(inquirerResponse => {
    console.log(inquirerResponse.BandsInTown)
    let queryURL = "https://rest.bandsintown.com/artists/" + inquirerResponse.BandsInTown + "?app_id=codingbootcamp";
    axios.get(queryURL).then(res => {
      console.log(res)
    })

  })
}

function searchSpotify() {
  inquirer.prompt([{
    type: "input",
    message: "Search by song or Artist",
    name: "SpotifySearch"
  }]).then(inquirerResponse => {
    console.log(inquirerResponse.SpotifySearch)
    spotify.search({
      type: "track",
      query: inquirerResponse.SpotifySearch
    },
      function (err, data) {
        if (err) throw err
        let tracks = data.tracks.items
        for(let i=0; i < tracks.length; i++){ 
          console.log(tracks[i].name)
        }
      }
    )
  })
}

inquirer.prompt([{
  type: "list",
  message: "Choose a service for Liri",
  choices: ["Search Spotify", "Search OMDB", "Search Bands in Town", "Quit App"],
  name: "Options"
}]).then(inquireResponse => {

  //Ternery Expressions
  inquireResponse.Options === 'Quit App'
    ? process.exit()

    : inquireResponse.Options === 'Search Spotify'
    ? searchSpotify()

    : inquireResponse.Options === "Search OMDB"
    ? searchOmdb()

    : inquireResponse.Options === "Search Bands in Town"
    ? searchBands()
    : console.log('get to this later')
})
