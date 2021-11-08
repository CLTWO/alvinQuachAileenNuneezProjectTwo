//save relevant API information 

basketApp.apiUrl = 'https://www.balldontlie.io/api/v1/stats'


//function to request information from the API 

basketApp.getStats = function(){


    const url = new URL (basketApp.apiUrl)
    url.search = new URLSearchParams({
        page:8, 
    })
    fetch(url)
    .then(function(response){
        return (response.json())
        .then(function(data){
            console.log(data)
        })
    })
   
}

basketApp.getStats(); 