//<BODY>
//<script language=javascript>
//	JScript ��� ��� ��������� "index.htm"
//	���� ���������:		20.10.98
//	������� ��������:	
//	�����������: ��������� ������� contents
//	�������� ��������� (������ �� ��� ������ �� �������� � ������� ������ ����� parent): 
//		c_strParentFile - ����� ����� ������ ��������� - �� ����������� ������
//		c_intDefaultTimeOut - �������� ���������� ��� ������������ 
//		c_blnAskUser - �� ���������� ����������� ��� ��������� timeout
//		c_strMapPageLocation - �������� ���� �� ������� � ��'����� mapxmap
//		c_intDefaultTimeOut = 500;		// ����������� ����-��� ��� ������������ ������	
//	�������� ���� : 
//		m_strMapPageLocation - ������ ���� �� ������� � ��'����� mapxmap 
//		m_PgDsc		- ���� ������� ������� ������ contents
//		m_frmContents - �������� �� ����� contents
//	���������� �. (10.10.98-20.10.98)

var c_strParentFile = "index.htm"; 
var c_intDefaultTimeOut = 500;			
var c_blnAskUser = true; 
var c_maxMaps = 1000;	// ������� ��� ID � ������� ����� ����

var m_strParentFileLocation = self.location.href; 
	m_strParentFileLocation = m_strParentFileLocation.substring(m_strParentFileLocation.length-c_strParentFile.length,0)
var m_strMapPageLocation = m_strParentFileLocation+c_strMapPageLocation; 
var m_PgDsc = null;		
var m_frmContents;
var g_strPhotoFile = "";
	
// * * * * * * * * * * * * * * * Atlas_ReloadContents * * * * * * * * * * * * * * * * * * *
//	�����������: ����������� ����� contents. ������� ������� ������� �� 
//				������ ���������� (�����, �������,...) ��� ����������� 
//	���������:	a_ID - ������������� �����, �������, ����
//	���������:	������� �� ������� ���������. ������� Atlas_ReloadContentsFrame 
//				�� Atlas_RedrawContentsFrame ����������� ����������, ���� ��������� ����������� 
//				���� ���������� ���� �������
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function Atlas_ReloadContents(a_ID, a_blnFirstTime) { 
	if (a_blnFirstTime) {
		if (!a_ID) 
			return false;
		m_PgDsc = null; // ������� ������� ��� ������������
		if (! Exec("script_RefreshPageDsc", a_ID)) // ��������� ����� �������
			return false;
	}

	if (!IsRegistered("script_IsLoaded")) // script ������� ���� ����������
		if (a_blnFirstTime) {
			setTimeout("Atlas_ReloadContents(0,false)", c_intDefaultTimeOut);
			return;
		}
		else 
			if (c_blnAskUser && confirm ("�� ������� ������������ �����. ���������� �� ���?")){
				setTimeout("Atlas_ReloadContents(0,false)", c_intDefaultTimeOut);
				return;
			}
			else return false;

	if (!Atlas_ReloadContentsFrame())
		return false;
	else return;
}


// * * * * * * * * * * * * * * * Atlas_ReloadContentsFrame * * * * * * * * * * * * * * * * * * * *
//	�����������: ����������� ������� ������ contents. ��� ������ ������� ����������, 
//				��� ����� ������� ���� mapxmap, ���� ����� ������� Atlas_RedrawContentsFrame
//	���������:	a_blnFirstTime - ������������� ������� ������� (��� ������������)
//	���������:	true - ��� �������� ��������, false - �� ���������� �� �� ������� ���-�. 
//				
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function Atlas_ReloadContentsFrame() { 
	m_PgDsc = Exec("script_GetPageDsc"); // �������� ���� ������� ������� (������� ��� ����)
	if (m_PgDsc.type!="map"){
		m_frmContents.window.location.href = m_PgDsc.src;
		return true;
	}
	if (m_PgDsc.type== "map") {
		if ( !IsRegistered("Contents_IsLoaded")) 
			m_frmContents.window.location.href = m_strMapPageLocation;
		Atlas_RedrawContentsFrame(true);// �� ��������� ���� ���������� - �� ������� ���� ������� ���������
		return ;
	}
	return;
}


// * * * * * * * * * * * * * * * Atlas_RedrawContentsFrame * * * * * * * * * * * * * * * * * * * *
//	�����������: ������� �� ��������� ����� � ����� contents. ��� ����� ���� ���������� �� 
//				�� ������
//	���������:	a_blnFirstTime - ������������� ������� ������� (��� ������������)
//	���������:	true - ��� �������� ��������, false - �� ���������� �� �� ������� ���-�. 
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function Atlas_RedrawContentsFrame( a_blnFirstTime){
	if (m_PgDsc==null)
		return false;
	if (!IsRegistered("Contents_IsLoaded")) // contents ������� ���� ����������, �����
		if ( a_blnFirstTime) {
			setTimeout("Atlas_RedrawContentsFrame(false)", c_intDefaultTimeOut);
			return false;
		}
		else 
			if (c_blnAskUser && confirm ("�� ������� ��������� �����. ���������� �� ���?")){
				setTimeout("Atlas_RedrawContentsFrame(false)", 2*c_intDefaultTimeOut);
				return false;
			}
			else return false;
		
	if (m_PgDsc.type== "map") { 
		mpxMap=Exec("Contents_GetMapX");
		mpxMap.object.AutoRedraw = false;
		Atlas_SetMapXParam(mpxMap, m_PgDsc);
		mpxMap.object.Refresh();
		mpxMap.object.AutoRedraw = true;
		return true;
	}
	return false;
}

// * * * * * * * * * * * * * * * Atlas_SetMapXParam * * * * * * * * * * * * * * * * * * * *
//	�����������: ���������� ��������� ��'����  � ����� contents.
//	���������:	a_mpxMap - ��������� �� ��'��� MapX,
//				a_PgDsc - �������� ��������� ��� ������������
//	���������:	true - ��� �������� ��������, false - �� ���������� �� �� ������� ���-�. 
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function Atlas_SetMapXParam(a_mpxMap, a_PgDsc){

	a_mpxMap.object.GeoSet = a_PgDsc.src;

	if (a_PgDsc.MapDataSet!=null && a_PgDsc.MapDataSet!="")
		var l_lrCurrentLayer = mpxMap.Layers(a_PgDsc.MapDataSet);
	else return false;


	a_mpxMap.Datasets.Add(6,l_lrCurrentLayer,a_PgDsc.MapDataSet);
	a_mpxMap.CurrentTool = 1007;
		
	return true;
}

function Load() {
	if (!IsRegistered("script_IsLoaded")) {
		if (confirm ("Load:script_IsLoaded is not registered. Wait...")){
			setTimeout("Load()", c_intDefaultTimeOut);
			return;
		}
		else 
			return;
	}
	Register (null, "Atlas_ReloadContentsFrame");
	Register (null, "Atlas_ReloadContents");
	m_frmContents = self.frames["contents"];
		return;
}


function UnLoad() {
	if (IsRegistered("script_IsLoaded")||IsRegistered("Contents_IsLoaded")) {
		setTimeout("UnLoad()", c_intDefaultTimeOut);
		return;
	}
	UnRegisterFrame(null);
}

function errortrap(msg,url,line){
    alert("������� JScript: \n\t "+msg);
    return true;
}

window.onerror=errortrap;
window.onload=Load;
window.onunload=UnLoad;
// end script 
//</script>
//</BODY></HTML>
