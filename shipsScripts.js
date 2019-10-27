var peoplePromise = d3.json("https://swapi.co/api/starships/");
peoplePromise.then(

function(ships)
    {
        var shipData = ships.results;
        d3.select("#name").on("click", function(){
            removeTable();
           makeTable(shipData, "name"); 
        });
        
        d3.select("#cost").on("click", function(){
            removeTable();
           makeTable(shipData, "cost"); 
        });
        
        d3.select("#crew").on("click", function(){
            removeTable();
           makeTable(shipData, "crew"); 
        });
        
        d3.select("#hyperDrive").on("click", function(){
            removeTable();
           makeTable(shipData, "hyperDrive"); 
        });
        
        makeTable(shipData, "gender");
    },
    
function(Error)
    {
        console.log(Error);
    }
    
)

var makeTable = function(ships, criteria)
{
    console.log(ships)
    sortShips(ships, criteria);
    var row = d3.select("tbody").selectAll("tr").data(ships).enter().append("tr");
    row.append("td").text(function(d) { return d.name; });
    row.append("td").text(function(d) { return d.cost_in_credits; });
    row.append("td").text(function(d) { return d.crew; });
    row.append("td").text(function(d) { return d.hyperdrive_rating; });
    
    var pilotList = row.append("td").append("ul").text(function(d){return formatPilots(d.pilots)});
    row.append("a").attr("src", "index.html").text("Pilots");
}

var removeTable = function()
{
    d3.selectAll("tbody *").remove();
}

var sortShips = function(ships, criteria)
{
    if(criteria == "name")
        {
            ships.sort(compareName);
        }
    else if(criteria == "cost")
        {
            ships.sort(compareCost);
        }
    else if(criteria == "crew")
        {
            ships.sort(compareCrew);
        }
    else if(criteria == "hyperDrive")
        {
            ships.sort(compareHyperDrive);
        }
}

var compareCrew = function(a, b)
{
    return b.crew - a.crew;
}

var compareHyperDrive = function(a, b)
{
    return b.hyperdrive_rating - a.hyperdrive_rating;
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

var compareCost = function(a, b)
{
    return b.cost_in_credits - a.cost_in_credits;
}

var formatPilots = function(pilots)
{
    
    var result = "\n";
    pilots.forEach(function(element){
        result += (element + "\n")
    })
    
    return result;
    
}