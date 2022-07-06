
function circle_click(evt) 
{
 
    var circle = evt.target;
    var currentID = circle.getAttribute("id");
	alert("Clicked circle with id: " + currentID);
	testjson("circle", currentID);
}


function path_click(evt) 
{
 	var path = evt.target;
    var currentID = path.getAttribute("id");
  	alert("Clicked path with id: " + currentID);
	testjson("path", currentID);
}


function testjson(type, id)
{
var json = jQuery.parseJSON("testItems.json");

var array = [];
for(var i in json) {

    if(json.hasOwnProperty(i) && !isNaN(+i)) {
        array[+i] = json[i];
    }
}

}
