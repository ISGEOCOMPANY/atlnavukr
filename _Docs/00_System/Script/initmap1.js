//<script language=javascript>
//	JScript код для роботи з об'єктом MapX у вікні карти
//	Дата створення:	14.11.98
//	Остання редакція:
//	Призначення: управління фреймом map
//	Глобальні константи (доступ до всіх змінних та констант з дочірніх фреймів через parent):
//		c_blnAskUser - чи запитувати користувача при вичерпанні timeout
//		c_intDefaultTimeOut = 500;		// стандартний тайм-аут для синхронізації фреймів (мсек)
//	Змінні рівня модуля:
//		m_lrCurrentLayer
//		m_bTryMap - індікатор спроби загрузки об'єкта MapX (використовується при перевірці консистентності об'єкта)
//
//		m_strGeoSet
//		m_strDataSet
//		m_fZoom
//		m_frmContents - вказівник на фрейм contents
//		m_iAttCount - кількість спроб ініціювати карту
//	Литвиненко О. (10.10.98-20.10.98, 09.11.98-10.11.98)
//	Сотніков С.

        var c_strMapframe = "..\\..\\00_system\\MapX.htm";
	var c_strMapPage = "MapX.htm";

// * * * * * * * * * * * * * * * InitiateMapX * * * * * * * * * * * * * * * * * * * * * * * * * * *
//	Призначення: Готує об'єкт MapX для відображення поточної карти.
//				Всі початкові установки для шару мають задаватись у даній функції
//	Зовнішні змінні функції:
//		m_strGeoSet -
//
//
//	Результат:	true - при успішному виконанні, false - не успішний рез-т, інакше - - не визначений
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function InitiateMapX() {
	var l_mapxmap; // об'єкт MapX у фреймі map
	var l_lrCurrentLayer;
//
	// підрахунок шляху до документа опису карти
	var l_strRefFileLocation = 	parent.frames["contents"].window.location.href;
        var l_strRefFileDirectory=l_strRefFileLocation.substring(l_strRefFileLocation.length-c_strMapPage.length,0);
        var l_strRootPath = parent.window.location.href;
        var c_strIndex = "index.htm";
//        var c_strIndex = "AtlasUA.htm";
        l_strRootPath =  l_strRootPath.substring( l_strRootPath.length-c_strIndex.length, 0 );

	l_mapxmap=parent.frames["contents"].mapxmap;
        l_mapxmap.ToolBarConfig = l_strRootPath+"00_System\\ToolBar\\AtlasTool.cnfg"; 
	// код нижче додає поточний геосет та встановлює інші параметри карти
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
