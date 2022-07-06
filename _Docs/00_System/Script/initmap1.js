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

// * * * * * * * * * * * * * * * InitiateMapX * * * * * * * * * * * * * * * * * * * * * * * * * * *
//	�����������: ���� ��'��� MapX ��� ����������� ������� �����.
//				�� �������� ��������� ��� ���� ����� ���������� � ���� �������
//	������ ���� �������:
//		m_strGeoSet -
//
//
//	���������:	true - ��� �������� ��������, false - �� ������� ���-�, ������ - - �� ����������
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function InitiateMapX() {
	var l_mapxmap; // ��'��� MapX � ����� map
	var l_lrCurrentLayer;
//
	// ��������� ����� �� ��������� ����� �����
	var l_strRefFileLocation = 	parent.frames["contents"].window.location.href;
        var l_strRefFileDirectory=l_strRefFileLocation.substring(l_strRefFileLocation.length-c_strMapPage.length,0);
        var l_strRootPath = parent.window.location.href;
        var c_strIndex = "index.htm";
//        var c_strIndex = "AtlasUA.htm";
        l_strRootPath =  l_strRootPath.substring( l_strRootPath.length-c_strIndex.length, 0 );

	l_mapxmap=parent.frames["contents"].mapxmap;
        l_mapxmap.ToolBarConfig = l_strRootPath+"00_System\\ToolBar\\AtlasTool.cnfg"; 
	// ��� ����� ���� �������� ������ �� ���������� ���� ��������� �����
//        l_mapxmap.IsGeoFormat =1;
//	l_mapxmap.TypeToolbar = 1;
//        l_mapxmap.MetaBasePath = l_strRootPath+"00_System\\MetaMap\\MetaMap.mdb"; 
//        l_mapxmap.RootPath = l_strRootPath+"4Services";
	l_mapxmap.Lang = "UKR";
//	l_mapxmap.Init();
//	l_mapxmap.Legend = l_strRefFileDirectory+m_strLegend; //
//	l_mapxmap.Descr = l_strRefFileDirectory+m_strDescr; //
        l_mapxmap.MetaPath = l_strRootPath+"Maps\\MetaMap\\MetaMap.mdb"; 
	l_mapxmap.MapSpace = l_strRefFileDirectory+m_strGeoSet; //
	return;
}

// end script ";
//</script>
