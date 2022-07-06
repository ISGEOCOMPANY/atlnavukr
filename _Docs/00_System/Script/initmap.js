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


// * * * * * * * * * * * * * * * LoadMap * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//	Призначення: Загружає фрейм map, якщо він ще не загружений. Виконується при загрузці документа,
//				що містить посилання на карту.
//	Аргументи:	a_blnFirstTime - ідентифікатор першого виклику (для синхронізації)
//	Результат:	true - при успішному виконанні, false - не успішний рез-т, інакше - - не визначений
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *


function LoadMap(){
	parent.m_strGeoSet = m_strGeoSet;
//	parent.m_strLegend = m_strLegend;
//	parent.m_strDescr = m_strDescr;
	if (!parent.IsRegistered("map_IsLoaded")){ // якщо фрейм map не загружений, то загружаэм його
		parent.frames["contents"].window.location.href = c_strMapframe;
	}
	else {
	 parent.InitiateMapX();
        }
	return true;
}

// обробник помилок
function errortrap(msg,url,line){
alert("Помилка JScript \n"+ url+"\nрядок:\t"+line+".\n"+msg);
	alert("Помилка JScript \n"+ url+"\nрядок:\t"+line+".\n"+msg);
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
