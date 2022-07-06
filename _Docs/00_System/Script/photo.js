//<script language=javascript>
//	JScript код для подання збільшених фотографій у фреймі contents
//	Дата створення:	04.02.00	
//	Остання редакція:	
//	Призначення: подає фотографію за іменем, отриманим за preview фотографії
//	Глобальні константи (доступ до всіх змінних та констант з дочірніх фреймів через parent): 
//		g_strPhotoFile - файл фотографії
//		g_strPhotoAlt - підпис фотографії		



document.onclick = imgclick;

function imgclick()
{
var i;
var j;
var strSearch = 'Thumbnail';

var strPreviewImName = "";
if (window.event.srcElement.src ) {
strPreviewImName = window.event.srcElement.src;


j= strSearch.length;
i = strPreviewImName.search (strSearch);
parent.g_strPhotoFile = '../07_Photo/'+strPreviewImName.substr(i+j+4);
parent.g_strPhotoAlt = window.event.srcElement.alt;
parent.frames["contents"].window.location.href = '../00_System/BigPhoto.htm';

}


}

