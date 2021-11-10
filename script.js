//Create Namespace 
const basketApp = {};

//save foundation URL in variable  
basketApp.apiUrl = 'https://www.balldontlie.io/api/v1/stats'

//function to request information from the API 
basketApp.getStats = function () {
    const url = new URL(basketApp.apiUrl)
    url.search = new URLSearchParams({
        start_date: '2021-10-18',
        per_page: 100,
        'player_ids[]': 237
    })
    fetch(url)
        .then(function (response) {
            return (response.json())
                .then(function (data) {
                    basketApp.getPlayerInfo(data);
                })
        })
}

//pull specific information from nested array 
basketApp.getPlayerInfo = function (datafromApi) {
    const playerObj = datafromApi.data;
    playerObj.forEach(function (playerStats) {
        console.log(playerStats); 
        //creating elements out of our data to append to a page
        const teamTitle = document.querySelector('h3')
        teamTitle.innerText = playerStats.team.full_name

        const gameDate = document.createElement('li')
        const uglyDateString = `${playerStats.game.date}`
        const date = new Date(uglyDateString);
        const dateOnly = date.toDateString();
        const humanReadable = new Date(uglyDateString).toDateString();
        gameDate.innerHTML = `<p>Game date:${humanReadable}</p>`

        const playerPoints = document.createElement('li')
        playerPoints.innerHTML = `<p>Points:${playerStats.pts}</p>`

        const playerRebounds = document.createElement('li')
        playerRebounds.innerHTML = `<p>Rebounds:${playerStats.reb}</p>` 

        const playerAssists = document.createElement('li')
        playerAssists.innerHTML = `<p>Assists:${playerStats.ast}</p>` 

        const playerSteals = document.createElement('li')
        playerSteals.innerHTML = `<p>Steals:${playerStats.stl}</p>`

        const playerBlocks = document.createElement('li')
        playerBlocks.innerHTML = `<p>Blocks:${playerStats.blk}</p>` 

        //appending elements to document
        const gameStats = document.createElement('ul')
        
        const statsPage = document.querySelector('#statsSection')
        gameStats.appendChild(gameDate)
        gameStats.appendChild(playerPoints)
        gameStats.appendChild(playerRebounds)
        gameStats.appendChild(playerAssists)
        gameStats.appendChild(playerSteals)
        gameStats.appendChild(playerBlocks)
        document.getElementById("statsSection").appendChild(gameStats)
    });
}


//create init function in order for app to display JS once it is loaded
basketApp.init = function () {
    basketApp.getStats();
}

//Call the init method to kickstart the app
basketApp.init()