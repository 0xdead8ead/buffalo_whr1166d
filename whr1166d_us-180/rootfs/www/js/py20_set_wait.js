// indicator
///////////////////////////////////////////////////////////////////////
function dispWaiting(flg)
{
	var disp = (flg ? "" : "none");
	document.getElementById("waiting_base").style.display = disp;
	document.getElementById("waiting_body").style.display = disp;
	if(flg)
	{
		if(window.scroll)
		{
			window.scroll(0,0);
		}
	}
	waiting = flg;
	popupDisable = flg;
	iconDisable = flg;
}

function busyCheck()
{
	getJsonParam("BUSY", handleBusyOnComplete);
}

function handleBusyOnComplete(req)
{
	if((req.status == 200) ||
		(req.status == 0))
	{
		var data = req.responseText.evalJSON();
		if((!data.SYSTEM) &&
		(!data.AOSS) &&
		(!data.AOSS2))
		{
			updateInnerHtml();
			dispWaiting(false);
		}
		else
		{
			window.setTimeout("busyCheck()", 2000);
		}
	}
	else
	{
//		alert(req.status);
		dispWaiting(false);
	}
}

// set
///////////////////////////////////////////////////////////////////////
function ajaxPost(postbody, handle)
{
	var date = new Date();
	new Ajax.Request(
		"/cgi-bin/cgi?req=set&t=" + date.getTime(),
		{
			method : 'post',
			postBody: postbody,
			onComplete : handle
		});
}

function handleButtonOnComplete(req)
{
	if(req.status == 200)
	{
		if(req.responseText == "OK")
		{
			document.getElementById("indicator").style.display = "";
			document.getElementById("waiting_err_text").style.display = "none";
			document.getElementById("waiting_err_btn").style.display = "none";
			dispWaiting(true);
			window.setTimeout("busyCheck()", 6000);
		}
		else
		{
			document.getElementById("indicator").style.display = "none";
			document.getElementById("waiting_err_text").innerHTML = req.responseText;
			document.getElementById("waiting_err_text").style.display = "";
			document.getElementById("waiting_err_btn").style.display = "";
			dispWaiting(true);
		}
	}
}

function handleErrDialogOnOk()
{
	dispWaiting(false);
}

