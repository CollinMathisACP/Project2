var peoplePromise = d3.json("https://swapi.co/api/people/");
peoplePromise.then(

function(people)
    {
        var peopleData = people.results;
        d3.select("#name").on("click", function(){
            removeTable();
           makeTable(peopleData, "name"); 
        });
        
        d3.select("#height").on("click", function(){
            removeTable();
           makeTable(peopleData, "height"); 
        });
        
        d3.select("#mass").on("click", function(){
            removeTable();
           makeTable(peopleData, "mass"); 
        });
        
        d3.select("#gender").on("click", function(){
            removeTable();
           makeTable(peopleData, "gender"); 
        });
        
        makeTable(peopleData, "gender");
    },
    
function(Error)
    {
        console.log(Error);
    }
    
)

var makeTable = function(people, criteria)
{
    console.log(people)
    sortPeople(people, criteria);
    var row = d3.select("tbody").selectAll("tr").data(people).enter().append("tr");
    row.append("td").text(function(d) { return d.name; });
    row.append("td").text(function(d) { return d.height + "cm"; });
    row.append("td").text(function(d) { return d.mass + "kg"; });
    row.append("td").text(function(d) { return d.gender; });
    
    var shipList = row.append("td").append("a").text(function(d){return formatShips(d.starships)}).attr("href", "starships.html");
}

var removeTable = function()
{
    d3.selectAll("tbody *").remove();
}

var sortPeople = function(people, criteria)
{
    if(criteria == "name")
        {
            people.sort(compareName);
        }
    else if(criteria == "gender")
        {
            people.sort(compareGender);
        }
    else if(criteria == "height")
        {
            people.sort(compareHeight);
        }
    else if(criteria == "mass")
        {
            people.sort(compareMass);
        }
}

var compareHeight = function(a, b)
{
    return b.height - a.height;
}

var compareMass = function(a, b)
{
    return b.mass - a.mass;
}

var compareName = function(a, b)
{
    if(a.name < b.name)
        {
            return -1;
        }
    else if (a.name > b.name)
        {
            return 1;
        }
    else
        return 0;
}

var compareGender = function(a, b)
{
    if(a.gender < b.gender)
        {
            return -1;
        }
    else if (a.gender > b.gender)
        {
            return 1;
        }
    else
        return 0;
}

var formatShips = function(ships)
{
    var result = "\n";
    ships.forEach(function(element){
        console.log(element);
        switch(element)
        {
            case "https://swapi.co/api/starships/12/":
                    result += "\nX-Wing, "
                    break;
            case "https://swapi.co/api/starships/22/":
                    result += "\nImperial Shuttle, "
                    break;
            case "https://swapi.co/api/starships/13/":
                    result += "\nTIE Advanced x1, "
                    break;
            case "https://swapi.co/api/starships/48/":
                    result += "\nJedi Starfighter, "
                    break;
            case "https://swapi.co/api/starships/59/":
                    result += "\nTrade Federation Cruiser, "
                    break;
            case "https://swapi.co/api/starships/64/":
                    result += "\nNaboo Star Skiff, "
                    break;
            case "https://swapi.co/api/starships/65/":
                    result += "\nJedi Interceptor, "
                    break;
            case "https://swapi.co/api/starships/74/":
                    result += "\nBelbullab-22 Starfighter, "
                    break;
        }
    })
    
    return result;
}