// back alert
///////////////////////////////////////////////////////////////////////
var dirty = false;
function dispBackalert(flg)
{
	var display = (flg ? "" : "none");
	document.getElementById("backalert_bg").style.display = display;
	document.getElementById("backalert_body").style.display = display;
	if(flg)
	{
		if(window.scroll)
		{
			window.scroll(0,0);
		}
	}
}
function handleBackOnClick()
{
	if(getCookie("backalert") == "off")
	{
		top.location.href = "/";
	}
	else if(dirty)
	{
		dispBackalert(true);
	}
	else
	{
		top.location.href = "/";
	}
}

function handleHomeOnClick()
{
	if(getCookie("backalert") == "off")
	{
		top.location.href = "/";
	}
	else if(dirty)
	{
		dispBackalert(true);
	}
	else
	{
		top.location.href = "/";
	}
}

function setDirty(flg)
{
	if(!isUndefined(dirty))
	{
		dirty = flg;
	}
}

function handleBackalertOkOnClick()
{
	if(document.getElementById("cb_backalert").checked)
	{
		setCookie("backalert", "off");
	}
	else
	{
		clearCookie("backalert");
	}
	top.location.href = "/";
}


function handleBackalertCancelOnClick()
{
	if(document.getElementById("cb_backalert").checked)
	{
		setCookie("backalert", "off");
	}
	else
	{
		clearCookie("backalert");
	}
	dispBackalert(false);
}


