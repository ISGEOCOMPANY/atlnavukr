window.onload = function() {
	// $("#dialog").dialog({autoOpen: false});
	// $("#legendButton").on("click", LegendbuttonPressed, false);
	var testwindow = $("#xmlFrame").contents().find("a");
	// var xmlBody = $("#xmlFrame").contents().find("span");
	// xmlBody.setAttribute("style", "font: Arial;");
	// fontSetter(xmlBody);
	createClicker(testwindow);
}
function createClicker(aDivList)
{
	for (i = 0; i < aDivList.length; i++)
	{
		aDivList[i].onclick = SpanClicked;
		aDivList[i].setAttribute("style", "cursor: pointer;");

	}
}
function fontSetter(aDivList)
{
	for (i = 0; i < aDivList.length; i++)
	{
		aDivList[i].setAttribute("style", "font: Arial;");

	}
}

function SpanClicked(evt)
{
	var url = evt.currentTarget.attributes[1].textContent;
	var type = evt.currentTarget.attributes[2].textContent;
	if(type=="doc")
	{
		document.getElementById("mapView").setAttribute("src","./" + url);
		document.getElementById("legendDialogContent").setAttribute("src","");
		document.getElementById("descriptDialogContent").setAttribute("src","");
		document.getElementById("dialog-link-legend").style.visibility = "hidden";
		document.getElementById("dialog-link-description").style.visibility = "hidden";
	}
	if(type == "map"){

		var mapDirectory = "./_Maps/SVG/" + url +"/";
		document.getElementById("mapView").setAttribute("src","./_Maps/SVG/" + url +"/" + url + ".svg");
		document.getElementById("legendDialogContent").setAttribute("src","./_Maps/SVG/" + url +"/_legends_dscr/" + url + "_U_legend.htm");
		document.getElementById("descriptDialogContent").setAttribute("src","./_Maps/SVG/" + url +"/_legends_dscr/" + url + "_U_descr.htm");
		document.getElementById("dialog-link-legend").style.visibility = "visible";
		document.getElementById("dialog-link-description").style.visibility = "visible";
		

	}


}
