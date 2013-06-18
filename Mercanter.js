function OnCheckBoxCheckChanged(evt) {
    var src = window.event != window.undefined ? window.event.srcElement : evt.target;
    var isChkBoxClick = (src.tagName.toLowerCase() == "input" && src.type == "checkbox");
    if (isChkBoxClick) {
        var parentTable = GetParentByTagName("table", src);
        var nxtSibling = parentTable.nextSibling;
        if (nxtSibling && nxtSibling.nodeType == 1) {
            if (nxtSibling.tagName.toLowerCase() == "div") {
                CheckUncheckChildren(parentTable.nextSibling, src.checked);
            }
        }

        CheckUncheckParents(src, src.checked);
    }
}
function CheckUncheckChildren(childContainer, check) {
    var childChkBoxes = childContainer.getElementsByTagName("input");
    var childChkBoxCount = childChkBoxes.length;
    for (var i = 0; i < childChkBoxCount; i++) {
        childChkBoxes[i].checked = check;
    }
}
function CheckUncheckParents(srcChild, check) {
    var parentDiv = GetParentByTagName("div", srcChild);
    var parentNodeTable = parentDiv.previousSibling;

    if (parentNodeTable) {
        var checkUncheckSwitch;

        if (check) {
            var isAllSiblingsChecked = AreAllSiblingsChecked(srcChild);
            if (isAllSiblingsChecked)
                checkUncheckSwitch = true;
            else
                return;
        }
        else {
            checkUncheckSwitch = false;
        }

        var inpElemsInParentTable = parentNodeTable.getElementsByTagName("input");
        if (inpElemsInParentTable.length > 0) {
            var parentNodeChkBox = inpElemsInParentTable[0];
            parentNodeChkBox.checked = checkUncheckSwitch;

            CheckUncheckParents(parentNodeChkBox, checkUncheckSwitch);
        }
    }
}
function AreAllSiblingsChecked(chkBox) {
    var parentDiv = GetParentByTagName("div", chkBox);
    var childCount = parentDiv.childNodes.length;
    for (var i = 0; i < childCount; i++) {
        if (parentDiv.childNodes[i].nodeType == 1) {
            if (parentDiv.childNodes[i].tagName.toLowerCase() == "table") {
                var prevChkBox = parentDiv.childNodes[i].getElementsByTagName("input")[0];

                if (!prevChkBox.checked) {
                    return false;
                }
            }
        }
    }
    return true;
}

function GetParentByTagName(parentTagName, childElementObj) {
    var parent = childElementObj.parentNode;
    while (parent.tagName.toLowerCase() != parentTagName.toLowerCase()) {
        parent = parent.parentNode;
    }
    return parent;
}

function UncheckAll(popupID) {
    var tree = $("#" + popupID + " .CheckBoxTree")
    tree.find("input:checkbox").each(function (index) {
        this.checked = false;
        setLabelClass(this);
    });        
    return false;
}


function clearContents(id) {
    var fu = document.getElementById(id);
    var AsyncFileUpload = fu.getElementsByTagName("span");
    for (var i = 0; i < AsyncFileUpload.length; i++) {
        AsyncFileUpload[i].innerHTML = AsyncFileUpload[i].innerHTML;
    }
    //window.location.search.substring("noreload");
}

function reload() {
    if (window.opener) window.opener.location.href = window.opener.location.href;    
}


function onImgErrorSmall(source) {
    source.src = "images/noimage.jpg";
    source.onerror = "";
    return true;
}

function onImgErrorSmall0(source) {
    source.src = "images/noimage.jpg";
    source.onerror = "";
    return true;
}

function onImgErrorSmall1(source) {
    source.src = "images/noimage.jpg";
    source.onerror = "";
    return true;
}


function Opera10Fix() {
    var elem = theForm.elements;
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].type == "file") {
            elem[i].onmousedown = function () {
                return true;
            };
        }
    }
}

function ShowCheckedTreeBox(panelID, popupID) {
    if (!Validate()) return false;
    var tree = $("#" + panelID + " .CheckBoxTree");
    var list = CreateSimpleTree(tree);
    if (list != '')
        $('#' + popupID).html(list).css('display', 'block');
    return false;
}

function CreateSimpleTree(root) {
    var ret = '';
    root.children('li').each(function (index) {
        var li = $(this);
        var label = li.children('label');
        var text = label.html().substring(label.html().lastIndexOf('>') + 1);


        var inner = CreateSimpleTree(li.children('ul'));
        if (label.children()[0].checked || inner != '')
            ret += "<li>" + text + inner + "</li>";        
    });
    if (ret != "")
        ret = "<ul>" + ret + "</ul>";
    return ret;
}

function HideBox(id) {
    $("#" + id).css('display', 'none');
    return false;
}

function HideCategoryBox() {
    document.getElementById('categoryBox').style.display = 'none';
}

function ShowRegionBox() {
    if (!Validate()) return false;
    var popUpPanel = document.getElementById('popupRegions');
    var CheckBoxes = popUpPanel.getElementsByTagName("input");
    var ok = false;
    var wasparent = false;
    document.getElementById('regionBox').innerHTML = '';
    var str = "<ul>";
    for (var i = 0; i < CheckBoxes.length; i++) {
        if ((CheckBoxes[i].type == "checkbox") && (CheckBoxes[i].checked)) {
            if (CheckBoxes[i].title == "") {
                str += "<li style='margin-left:10px'>" + CheckBoxes[i].nextSibling.innerHTML + "</li>";
                wasparent = false;
            }
            ok = true;
        }
        if (CheckBoxes[i].title != "") {
            if (wasparent == true) str = str.substr(0, str.lastIndexOf("<li>"));
            str += "<li>" + CheckBoxes[i].nextSibling.innerHTML + "</li>";
            wasparent = true;
        }
    }
    if (wasparent == true) str = str.substring(0, str.lastIndexOf("<li>"));
    str += "</ul>";
    document.getElementById('regionBox').innerHTML = str;
    if (ok == true)
        document.getElementById('regionBox').style.display = 'block';
}
function HideRegionBox() {
    document.getElementById('regionBox').style.display = 'none';
}

function ShowOfferTypeBox() {
    if (!Validate()) return false;
    var popUpPanel = document.getElementById('popupOfferTypes');
    var CheckBoxes = popUpPanel.getElementsByTagName("input");
    document.getElementById('offerTypeBox').innerHTML = '';
    var ok = false;
    var str = "<ul>";
    for (var i = 0; i < CheckBoxes.length; i++) {
        if ((CheckBoxes[i].type == "checkbox") && (CheckBoxes[i].checked)) {
            str += "<li>" + CheckBoxes[i].nextSibling.innerHTML + "</li>";
            ok = true;
        }
    }
    str += "</ul>";
    document.getElementById('offerTypeBox').innerHTML = str;
    if (ok == true)
        document.getElementById('offerTypeBox').style.display = 'block';
}
function HideOfferTypeBox() {
    document.getElementById('offerTypeBox').style.display = 'none';
}

function ShowPopup(obj) {
    if (Validate() && document.getElementById(obj.id).style.display == 'none') {
        document.getElementById(obj.id).style.display = 'block';
    }
    else {
        document.getElementById(obj.id).style.display = 'none';
    }
    return false;
}

function ShowExPopup(obj) {
    var pop = $(obj);
    if (Validate() && pop.css('display') == 'none') {
        pop.css('display', 'block');
        var wnd= $(window);        
        var top = (wnd.height() - pop.height()) / 2;
        if (top < 0) top = 10;
        top += wnd.scrollTop();
        pop.css('top', top - $(".mainContent").offset().top);
        pop.css('left', ($('#container').width() - pop.width()) / 2);
    }
    else
        pop.css('display', 'none');
    return false;
}

function ShowChat(obj) {
    if (Validate() && document.getElementById(obj.id).style.display == 'none') {
        document.getElementById(obj.id).style.display = 'block';
    }
    else {
        document.getElementById(obj.id).style.display = 'none';
    }
    return false;
}

function Validate() {
    if (document.getElementById('pnlRegion') != null) {
        if (document.getElementById('pnlRegion').style.display == 'block') return false;
    }
    if (document.getElementById('pnlRegion') != null) {
        if (document.getElementById('pnlRegion').style.display == 'block') return false;
    }
    if (document.getElementById('pnlOfferType') != null) {
        if (document.getElementById('pnlOfferType').style.display == 'block') return false;
    }
    return true;
}

function ClickButtonByEnter(e, buttonid) {
    var bt = document.getElementById(buttonid);
    if (bt) {
        if (e.keyCode == 13) {
            eval(bt.href);
            return false;
        }
    }
}

function clearHTMLTags(e) {
    e.target.value = e.target.value.replace(/<[^>]*>/gi, '');
}

