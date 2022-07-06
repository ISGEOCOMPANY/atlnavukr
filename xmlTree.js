var openImg = new Image();
openImg.src = "images/ico_02.gif";
var closedImg = new Image();
closedImg.src = "images/ico_01.gif";

function showBranch(branch){
	var objBranch = document.getElementById(branch).style;
	if(objBranch.display=="block")
		objBranch.display="none";
	else
		objBranch.display="block";
	swapFolder('I' + branch);
}

function swapFolder(img){
	objImg = document.getElementById(img);
	if(objImg.src.indexOf('images/ico_01.gif')>-1)
		objImg.src = openImg.src;
	else
		objImg.src = closedImg.src;
}
