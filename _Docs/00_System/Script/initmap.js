//<script language=javascript>
//	JScript ��� ��� ������ � ��'����� MapX � ��� �����
//	���� ���������:	14.11.98
//	������� ��������:
//	�����������: ��������� ������� map
//	�������� ��������� (������ �� ��� ������ �� �������� � ������� ������ ����� parent):
//		c_blnAskUser - �� ���������� ����������� ��� ��������� timeout
//		c_intDefaultTimeOut = 500;		// ����������� ����-��� ��� ������������ ������ (����)
//	���� ���� ������:
//		m_lrCurrentLayer
//		m_bTryMap - �������� ������ �������� ��'���� MapX (��������������� ��� �������� �������������� ��'����)
//
//		m_strGeoSet
//		m_strDataSet
//		m_fZoom
//		m_frmContents - �������� �� ����� contents
//		m_iAttCount - ������� ����� ��������� �����
//	���������� �. (10.10.98-20.10.98, 09.11.98-10.11.98)
//	������� �.

        var c_strMapframe = "..\\..\\00_system\\MapX.htm";
	var c_strMapPage = "MapX.htm";


// * * * * * * * * * * * * * * * LoadMap * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//	�����������: ������� ����� map, ���� �� �� �� ����������. ���������� ��� �������� ���������,
//				�� ������ ��������� �� �����.
//	���������:	a_blnFirstTime - ������������� ������� ������� (��� ������������)
//	���������:	true - ��� �������� ��������, false - �� ������� ���-�, ������ - - �� ����������
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *


function LoadMap(){
	parent.m_strGeoSet = m_strGeoSet;
//	parent.m_strLegend = m_strLegend;
//	parent.m_strDescr = m_strDescr;
	if (!parent.IsRegistered("map_IsLoaded")){ // ���� ����� map �� ����������, �� ��������� ����
		parent.frames["contents"].window.location.href = c_strMapframe;
	}
	else {
	 parent.InitiateMapX();
        }
	return true;
}

// �������� �������
function errortrap(msg,url,line){
alert("������� JScript \n"+ url+"\n�����:\t"+line+".\n"+msg);
	alert("������� JScript \n"+ url+"\n�����:\t"+line+".\n"+msg);
    return true;
}
function OnLoad() {
	LoadMap();

}
function OnUnLoad() {
	parent.frames['navigation'].mapname.innerHTML = "";
}
parent.frames['navigation'].mapname.innerHTML = window.document.title;
window.onload  = OnLoad;
window.onerror = errortrap;
// end script ";
//</script>
