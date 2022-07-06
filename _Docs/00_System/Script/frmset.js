//<BODY>
//<script language=javascript>
//	JScript код для документа "index.htm"
//	Дата створення:		20.10.98
//	Остання редакція:	
//	Призначення: управління фреймом contents
//	Глобальні константи (доступ до всіх змінних та констант з дочірніх фреймів через parent): 
//		c_strParentFile - назва файла даного документа - має загружатись першим
//		c_intDefaultTimeOut - інтервал очікування для синхронізації 
//		c_blnAskUser - чи запитувати користувача при вичерпанні timeout
//		c_strMapPageLocation - відносний щлях до сторінки з об'єктом mapxmap
//		c_intDefaultTimeOut = 500;		// стандартний тайм-аут для синхронізації фреймів	
//	Глобальні змінні : 
//		m_strMapPageLocation - повний шлях до сторінки з об'єктом mapxmap 
//		m_PgDsc		- опис поточної сторінки фрейму contents
//		m_frmContents - вказівник на фрейм contents
//	Литвиненко О. (10.10.98-20.10.98)

var c_strParentFile = "index.htm"; 
var c_intDefaultTimeOut = 500;			
var c_blnAskUser = true; 
var c_maxMaps = 1000;	// діапазон для ID в таблиці опису карт

var m_strParentFileLocation = self.location.href; 
	m_strParentFileLocation = m_strParentFileLocation.substring(m_strParentFileLocation.length-c_strParentFile.length,0)
var m_strMapPageLocation = m_strParentFileLocation+c_strMapPageLocation; 
var m_PgDsc = null;		
var m_frmContents;
var g_strPhotoFile = "";
	
// * * * * * * * * * * * * * * * Atlas_ReloadContents * * * * * * * * * * * * * * * * * * *
//	Призначення: Перезагружає фрейм contents. Загружає потрібну сторінку та 
//				вибирає інформацію (карту, таблицю,...) для відображення 
//	Аргументи:	a_ID - ідентифікатор карти, таблиці, тощо
//	Результат:	функція не визначає результат. Функції Atlas_ReloadContentsFrame 
//				та Atlas_RedrawContentsFrame виконуються асинхронно, тому результат визначається 
//				після завершення даної функції
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function Atlas_ReloadContents(a_ID, a_blnFirstTime) { 
	if (a_blnFirstTime) {
		if (!a_ID) 
			return false;
		m_PgDsc = null; // поточна сторінка стає неактуальною
		if (! Exec("script_RefreshPageDsc", a_ID)) // підготовка опису сторінки
			return false;
	}

	if (!IsRegistered("script_IsLoaded")) // script повинен бути загруженим
		if (a_blnFirstTime) {
			setTimeout("Atlas_ReloadContents(0,false)", c_intDefaultTimeOut);
			return;
		}
		else 
			if (c_blnAskUser && confirm ("Не вдається зареєструвати карту. Спробувати ще раз?")){
				setTimeout("Atlas_ReloadContents(0,false)", c_intDefaultTimeOut);
				return;
			}
			else return false;

	if (!Atlas_ReloadContentsFrame())
		return false;
	else return;
}


// * * * * * * * * * * * * * * * Atlas_ReloadContentsFrame * * * * * * * * * * * * * * * * * * * *
//	Призначення: Перезагружає сторінку фрейму contents. Для тексту загружає інформацію, 
//				Для карти загружає лише mapxmap, саму карту загружає Atlas_RedrawContentsFrame
//	Аргументи:	a_blnFirstTime - ідентифікатор першого виклику (для синхронізації)
//	Результат:	true - при успішному виконанні, false - не визначений чи не успішний рез-т. 
//				
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function Atlas_ReloadContentsFrame() { 
	m_PgDsc = Exec("script_GetPageDsc"); // отримути опис поточної сторінки (повинен уже бути)
	if (m_PgDsc.type!="map"){
		m_frmContents.window.location.href = m_PgDsc.src;
		return true;
	}
	if (m_PgDsc.type== "map") {
		if ( !IsRegistered("Contents_IsLoaded")) 
			m_frmContents.window.location.href = m_strMapPageLocation;
		Atlas_RedrawContentsFrame(true);// не перевіряєм коди повернення - ця функція сама визначає результат
		return ;
	}
	return;
}


// * * * * * * * * * * * * * * * Atlas_RedrawContentsFrame * * * * * * * * * * * * * * * * * * * *
//	Призначення: Загружає та відмальовує карту у фреймі contents. Для інших видів інформації дій 
//				не виконує
//	Аргументи:	a_blnFirstTime - ідентифікатор першого виклику (для синхронізації)
//	Результат:	true - при успішному виконанні, false - не визначений чи не успішний рез-т. 
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function Atlas_RedrawContentsFrame( a_blnFirstTime){
	if (m_PgDsc==null)
		return false;
	if (!IsRegistered("Contents_IsLoaded")) // contents повинен бути загруженим, чекаєм
		if ( a_blnFirstTime) {
			setTimeout("Atlas_RedrawContentsFrame(false)", c_intDefaultTimeOut);
			return false;
		}
		else 
			if (c_blnAskUser && confirm ("Не вдається загрузити карту. Спробувати ще раз?")){
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
//	Призначення: Встановлює параметри об'єкта  у фреймі contents.
//	Аргументи:	a_mpxMap - посилання на об'єкт MapX,
//				a_PgDsc - значення параметрів для встановлення
//	Результат:	true - при успішному виконанні, false - не визначений чи не успішний рез-т. 
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
    alert("Помилка JScript: \n\t "+msg);
    return true;
}

window.onerror=errortrap;
window.onload=Load;
window.onunload=UnLoad;
// end script 
//</script>
//</BODY></HTML>
