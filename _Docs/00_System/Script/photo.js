//<script language=javascript>
//	JScript ��� ��� ������� ��������� ���������� � ����� contents
//	���� ���������:	04.02.00	
//	������� ��������:	
//	�����������: ���� ���������� �� ������, ��������� �� preview ����������
//	�������� ��������� (������ �� ��� ������ �� �������� � ������� ������ ����� parent): 
//		g_strPhotoFile - ���� ����������
//		g_strPhotoAlt - ����� ����������		



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

