//Create Namespace 
const basketApp = {};

//save foundation URL in variable  
basketApp.apiUrl = 'https://www.balldontlie.io/api/v1/stats'


//function to request information from the API 
basketApp.getStats = function () {
    const url = new URL(basketApp.apiUrl)
    url.search = new URLSearchParams({
        start_date: '2021-10-18',
        page: 1,
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
    playerObj.map(function (playerStats) {
        console.log(playerStats)
        // const { ast, blk } = playerStats
        // console.log(ast, blk);
        const { first_name, last_name } = playerStats.player
        console.log(first_name, last_name);



    });
}


//create init function in order for app to display JS once it is loaded
basketApp.init = function () {
    basketApp.getStats();
}

//Call the init method to kickstart the app
basketApp.init()