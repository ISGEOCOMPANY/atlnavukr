var mainwindow;
window.onload = function() {
	mainwindow = window;
	var testwindow = $("#xmlFrame").contents().find("a");
	// alert(testwindow);



	// var divParrent = testwindow[0].children;//document.getElementById("linkList"); // onclick="onClick()
	// var divChildrens =  divParrent[0].children;

	createClicker(testwindow);
}
function createClicker(aDivList)
{
	for (i = 0; i < aDivList.length; i++)
	{
		aDivList[i].onclick = SpanClicked;
	}
}
// 	$("object#tree").click(
// function(evt)
// {
// 	alert(evt.target.value);
// }
// 		)

function SpanClicked(evt)
{
	var path = evt.currentTarget.attributes[1].textContent;
	document.getElementById("mapView").setAttribute("src","./" + path);

	// alert(test + " кликнут");

}