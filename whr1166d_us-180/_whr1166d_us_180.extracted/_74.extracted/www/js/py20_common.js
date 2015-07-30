// common function
///////////////////////////////////////////////////////////////////////
function isUndefined(a_var)
{
	var bret = false;
	var undefined;
	if(a_var == undefined)
	{
		bret = true;
	}
	return bret;
}

function isDisp(id)
{
	return (document.getElementById(id).style.display == "none" ? false : true);
}

function elId(id)
{
	return document.getElementById(id);
}

function insertTitle(str)
{
	var work = document.title;
	document.title = str + " - " + work;
}

function getNowTime()
{
	var date = new Date();
	var ret = "" + date.getTime();
	return ret;
}

function strHead(src, size)
{
	var ret = "";
	if(size > 0)
	{
		if(src.length > size)
		{
			ret = src.slice(0, size-1) + "...";
		}
		else
		{
			ret = src;
		}
	}
	return ret;
}

function getAbsoluteTop(el)
{
	var ret = 0;
	var parent = el;
	while(parent)
	{
		ret += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return ret;
}

function getAbsoluteLeft(el)
{
	var ret = 0;
	var parent = el;
	while(parent)
	{
		ret += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	return ret;
}

