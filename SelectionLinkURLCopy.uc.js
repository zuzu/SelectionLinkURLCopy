// ==UserScript==
// @name           SelectionLinkURLCopy
// @namespace      http://zuzu-service.net
// @description    Adds 'Selection Link URL Copy' menu.
// @include        main
// @compatibility  Firefox 3.0, 3.5, 3.6
// @author         zuzu
// @version        1.0
// @homepage       http://zuzu-service.net/
// ==/UserScript==

(function() {
    var contextmenu = document.getElementById('contentAreaContextMenu');
    var locale = Components.classes["@mozilla.org/preferences-service;1"].
        getService(Components.interfaces.nsIPrefBranch);
    locale = locale.getCharPref("general.useragent.locale");

    var menuitem = document.createElement('menuitem');
    menuitem.setAttribute('id', 'context-multilinkselectioncopy');
    if(locale == "ja-JP"){
		menuitem.setAttribute('label', '\u9078\u629E\u7BC4\u56F2\u306E\u30EA\u30F3\u30AF\u306EURL\u3092\u30B3\u30D4\u30FC');
	}else{
    	menuitem.setAttribute('label', 'Selection Link URL Copy');
    }
    menuitem.addEventListener('command', function(e) {
		var sel = document.commandDispatcher.focusedWindow.getSelection().getRangeAt(0).cloneContents();
		if (!sel) return;
		var selectionLinkArray = Array.map(sel.querySelectorAll('a'), function (a) { return a.href; });
		var gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
		    .getService(Components.interfaces.nsIClipboardHelper);
		gClipboardHelper.copyString(selectionLinkArray.join("\n"));
    }, false);
    contextmenu.insertBefore(menuitem, document.getElementById('context-copy').nextSibling);
    contextmenu.addEventListener('popupshowing',function(event) {
        if (event.target != this) return;
        document.getElementById("context-multilinkselectioncopy").hidden = !gContextMenu.isTextSelected;
    }, false);

})();