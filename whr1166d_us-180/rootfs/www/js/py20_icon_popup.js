
// icon
///////////////////////////////////////////////////////////////////////
function infoIconBlink()
{
	var el = document.getElementById("icon_INFO");
	if(el.className == "statusIcon status_info_blink_on")
	{
		el.className = "statusIcon status_info_blink_off";
	}
	else if(el.className == "statusIcon status_info_blink_off")
	{
		el.className = "statusIcon status_info_blink_on";
	}
}
function iconImgPreLoad()
{
	var py20_status_info          = new Image();
	var py20_status_info_m        = new Image();
	var py20_status_internet_ng   = new Image();
	var py20_status_internet_ng_m = new Image();
	var py20_status_help          = new Image();
	var py20_status_help_m        = new Image();
	var py20_button_hover_middle  = new Image();
	var py20_button_hover_left    = new Image();
	var py20_button_hover_right   = new Image();
	
	py20_status_info.src          = "/images/py20_status_info.png";
	py20_status_info.src_m        = "/images/py20_status_info_m.png";
	py20_status_internet_ng.src   = "/images/py20_status_internet_ng.png";
	py20_status_internet_ng_m.src = "/images/py20_status_internet_ng_m.png";
	py20_status_help.src          = "/images/py20_status_help.png";
	py20_status_help_m.src        = "/images/py20_status_help_m.png";
	py20_button_hover_middle.src  = "/images/py20_button_hover_middle.png";
	py20_button_hover_left.src    = "/images/py20_button_hover_left.png";
	py20_button_hover_right.src   = "/images/py20_button_hover_right.png";
	setInterval(infoIconBlink, 500);
	return;
}

var popup = false;

function handleIconParamOnComplete(req)
{
//	window.alert(req.responseText);
	//alert(req.responseText);
	var data = req.responseText.evalJSON();
	if(data.AUTH_FLAG == "0")
	{
		//alert("url content_frame="+top.content_frame.document.location.href);
		if(top.content_frame)
		{
			//alert("url="+top.content_frame.document.location.href);
		  if( top.content_frame.document.location.href.indexOf("fwupdate.html") >= 0 )
	    {
	  	  if(top.content_frame.document.form_update.fwupbutton.disabled != 1)
	  window.location.reload();
	    }
		  else if( top.content_frame.document.location.href.indexOf("online_fwlist_result.html") >= 0 )
		  {
			  if(top.content_frame.document.form_fwlist.update_button.disabled != 1)
			    window.location.reload();
	    }
	    else
	  	  window.location.reload();
	  }
	  else
	  {
	  	//alert("url="+window.location.href);
	  	window.location.reload();
	  }
	  return;
	}
	//if(data.LOGIN)
	//{
		// internet
		if(document.getElementById("icon_WAN").style.display == '' || document.getElementById("icon_WAN").style.display == 'block')
		{
			document.getElementById("icon_WAN").className = (data.WANIP.length != 0 && data.InternetLed == "2") ?
				"statusIcon status_wan_ok" : "statusIcon status_wan_ng";
			//document.getElementById("icon_SUPPORT").className = data.INTERNET ?
			//	"statusIcon status_support_ok" : "statusIcon status_support_ng";
		}
		/*// repeater
		if(document.getElementById("icon_REPEATER").style.display == '')
		{
			document.getElementById("icon_REPEATER").className = data.REPEATER ?
				"statusIcon status_repeater_ok" : "statusIcon status_repeater_ng";
		}*/
		// info
		if(document.getElementById("icon_INFO").style.display == '')
		{
			var i;
			/*for(i = 1; i < 10; i++)
			{
				document.getElementById("infotype" + i).style.display = "none";
			}
			if(data.INFO[0] == "NULL")
			{
				document.getElementById("icon_INFO").className = "statusIcon status_info_none";
			}
			else
			{
				var label = ["NEWFW","IF_NOREG","IF_EXPIRE","IF_NOWAN","WA_NOWAN","WA_PORTFAIL","WA_NASCOMFAIL","WA_NASCOMREGFAIL","IF_CONERR"];
				for(i = 0; i < label.length; i++)
				{
					if(data.INFO.indexOf(label[i]) != -1)
					{
						document.getElementById("infotype" + (i + 1)).style.display = "";
					}
				}
				document.getElementById("icon_INFO").className = "statusIcon status_info_blink_on";
			}
			document.getElementById("popup_new_ver").innerHTML = data.NEWFW_VER;*/
			
			if(data.RouterMode == "1")
			{
				if(data.WANIP == "")
				{
					document.getElementById("behavior_router_connect").style.display = "none";
					document.getElementById("behavior_router_disconnect").style.display = "";
				}
				else
				{
					document.getElementById("wanip").innerHTML = data.WANIP;
					document.getElementById("behavior_router_connect").style.display = "";
					document.getElementById("behavior_router_disconnect").style.display = "none";
				}
				document.getElementById("info_behavior_router").style.display = "";
				document.getElementById("info_behavior_bridge").style.display = "none";
				document.getElementById("info_behavior_repeater").style.display = "none";
			}
			if(data.RouterMode == "0")
			{
				document.getElementById("info_behavior_router").style.display = "none";
				document.getElementById("info_behavior_bridge").style.display = "";
				document.getElementById("info_behavior_repeater").style.display = "none";
			}
			/*if(data.RouterMode == "REPEATER")
			{
				if(data.PARENTSSID == "")
				{
					document.getElementById("behavior_repeater_connect").style.display = "none";
					document.getElementById("behavior_repeater_disconnect").style.display = "";
				}
				else
				{
					document.getElementById("parent_ssid").innerHTML = data.PARENTSSID;
					document.getElementById("behavior_repeater_connect").style.display = "";
					document.getElementById("behavior_repeater_disconnect").style.display = "none";
				}
				document.getElementById("info_behavior_router").style.display = "none";
				document.getElementById("info_behavior_bridge").style.display = "none";
				document.getElementById("info_behavior_repeater").style.display = "";
			}*/
		}
		popup = true;
	//}
	//else
	//{
	//	location.href = "/";
	//}
}

function getIconState()
{
	if(!iconDisable)
	{
		getJsonParam("ICON", handleIconParamOnComplete);
	}
}

function handleInternetIconOnClick(id, el, url)
{
	//if(popup)
	//{
		if(document.getElementById("icon_WAN").className.indexOf("status_wan_ok") == -1)
		{
			top.location.href=url;
		}
		else
		{
			dispPopup(id, el, 1);
		}
	//}
}

function handleInternetIFWcheck(url)
{
	top.location.href=url;
}

function handleRepeaterIconOnClick(id, el)
{
	if(popup)
	{
		if(document.getElementById("icon_REPEATER").className.indexOf("status_repeater_ok") == -1)
		{
			location.href="/cgi-bin/cgi?req=frm&frm=setting_basic_repeater.html";
		}
		else
		{
			dispPopup(id, el, 1);
		}
	}
}

function handleInfoIcon_OnClick(id, el)
{
	if(popup)
	{
		dispPopup(id, el, 1);
	}
}

function handleSupportIconOnClick(id, el, url)
{
	if(document.getElementById("icon_WAN").className.indexOf("status_wan_ok") == -1)
	{
		dispPopup(id, el, 1);
	}
	else
	{
		location.href=url;
	}
}

// popup
///////////////////////////////////////////////////////////////////////
function dispPopup(id, el, mode)
{
	if(getCookie("mobile") == "false")
	{
		var top = 0;
		var left = 0;
		
		switch(mode){
			default:
				break;
			case 1:
				top = getAbsoluteTop(el) + el.offsetHeight;
				left = getAbsoluteLeft(el) + el.offsetWidth - 260;
				break;
			case 2:
				top = getAbsoluteTop(el);
				left = getAbsoluteLeft(el) + el.offsetWidth;
				break;
		}
		document.getElementById(id).style.top = top + "px";
		document.getElementById(id).style.left = left + "px";
	}
	document.getElementById(id).style.display = "";
	document.getElementById("popup_bg").style.display = "";
}

function undispPopup(id)
{
	document.getElementById(id).style.display = "none";
	document.getElementById("popup_bg").style.display = "none";
}

function undispPopupAll()
{
	if(document.getElementById("popup_internet") != null)
	{
		undispPopup("popup_internet")
	}
	if(document.getElementById("popup_repeater") != null)
	{
		undispPopup("popup_repeater")
	}
	if(document.getElementById("popup_info") != null)
	{
		undispPopup("popup_info")
	}
	if(document.getElementById("popup_support") != null)
	{
		undispPopup("popup_support")
	}
}

function UpdateIfilterSrvStatus() {
	var xmlhttp = null;
	try {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} catch (e) {
		xmlhttp = null;
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}

	if(xmlhttp)
	{
		xmlhttp.onreadystatechange = function() {} // Dummy for Safari 5.0.6
		urlname = '/cgi-bin/cgi?req=fnc&fnc=%24{update_ifilter_server_status}' + parseInt(Math.random()*100000000) ;
		xmlhttp.open('GET', urlname);
		xmlhttp.setRequestHeader('Content-Type','content=${RT_charset}');
		xmlhttp.send(null);
	}
}
