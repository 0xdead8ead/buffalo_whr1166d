// chkfmt
///////////////////////////////////////////////////////////////////////
function dispWarning(el, id)
{
	if(!popupDisable)
	{
		var top = getAbsoluteTop(el);
		var left = getAbsoluteLeft(el) + el.offsetWidth - 120;
		document.getElementById(id).style.top = top + "px";
		document.getElementById(id).style.left = left + "px";
		document.getElementById(id).style.display = "";
	}
}

function dispId(id)
{
	document.getElementById(id).style.display = "";
}

function undispId(id)
{
	document.getElementById(id).style.display = "none";
}

function setWarn(id, idx, size)
{
	var i;
	for(i = 0; i < size; i++)
	{
		if(i == idx)
		{
			dispId(id + i);
		}
		else
		{
			undispId(id + i);
		}
	}
}

function chkfmtDevctrlName(el, id)
{
	var err = false;
	if(el.value.length > 0)
	{
		if(el.value.length > 64)
		{
			setWarn(id, 0, 3);
			err = true;
		}
		else
		{
			var i;
			var char_code;
			for(i = 0; i < el.value.length; i++)
			{
				char_code = el.value.charCodeAt(i);
				if((char_code <= 31) || (char_code >=  127))
				{
					setWarn(id, 1, 3);
					err = true;
					break;
				}
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		err = true;
	}
	return err;
}

function chkfmtNascomUser(el, id, webaxs)
{
	var err = false;
	if(el.value.length > 0)
	{
		if(el.value.length < 3)
		{
			setWarn(id, 0, 2);
			err = true;
		}
		else if(el.value.length > 20)
		{
			setWarn(id, 0, 2);
			err = true;
		}
		else
		{
			var re = new RegExp("[^A-Za-z0-9\-_]");
			if(re.test(el.value))
			{
				setWarn(id, 1, 2);
				err = true;
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		if(webaxs)
		{
			err = true;
		}
	}
	return err;
}

function chkfmtNasUser(el, id)
{
	var err = false;
	if(el.value.length > 20)
	{
		setWarn(id, 0, 4);
		err = true;
	}
	else
	{
		if(el.value === "guest")
		{
			setWarn(id, 3, 4);
			err = true;
		}
		else
		{
			var re = new RegExp("[^A-Za-z0-9]");
			var first = el.value.charAt(0);
			if(re.test(first))
			{
				setWarn(id, 1, 4);
				err = true;
			}
			else
			{
				re = RegExp("[^A-Za-z0-9\-_\.]");
				if(re.test(el.value))
				{
					setWarn(id, 2, 4);
					err = true;
				}
			}
		}
	}
	if(err)
	{
		dispWarning(el, id);
	}
	else
	{
		undispId(id);
	}
	return err;
}

function chkfmtNasPass(el, id)
{
	var err = false;
	if(el.value.length > 20)
	{
		setWarn(id, 0, 3);
		err = true;
	}
	else if(el.value.charAt(0) == "-")
	{
		setWarn(id, 1, 3);
		err = true;
	}
	else
	{
		var re = new RegExp("[^A-Za-z0-9\-_]");
		if(re.test(el.value))
		{
			setWarn(id, 2, 3);
			err = true;
		}
	}
	if(err)
	{
		dispWarning(el, id);
	}
	else
	{
		undispId(id);
	}
	return err;
}

function chkfmtNasUserAndPass(el_name, el_pass, warnid_name, warnid_pass, webaxs)
{
	var err = false;
	if(webaxs)
	{// WebAxs ON
		var err_name = chkfmtNasUser(el_name, warnid_name); // UNAME format chheck
		var err_pass = chkfmtNasPass(el_pass, warnid_pass); // PASS  format chheck
		err = (err_name || err_pass);
		
		if(!err)
		{
			undispId(warnid_name);
			undispId(warnid_pass);
			if(((el_name.value.length == 0) && (el_pass.value.length != 0)) ||
				((el_name.value.length != 0) && (el_pass.value.length == 0)))
			{
				err = true;
			}
		}
	}
	else
	{// WebAxs OFF
		undispId(warnid_name);
		undispId(warnid_pass);
		if((el_name.value.length > 0) || (el_pass.value.length > 0))
		{// error
			err = true;
		}
	}
	return err;
}

function chkfmtAossSsid(el, id){
	return chkfmtSsidEx(el, id, true);
}

function chkfmtSsid(el, id){
	return chkfmtSsidEx(el, id, false);
}

function chkfmtSsidEx(el, id, aoss)
{
	var err = false;
	if(el.value.length > 0)
	{
		if(el.value.length > 32)
		{
			setWarn(id, 0, 3);
			err = true;
		}
		else
		{
			var i;
			var char_code;
			for(i = 0; i < el.value.length; i++)
			{
				char_code = el.value.charCodeAt(i);
				if((char_code <= 31) || (char_code >=  127))
				{
					setWarn(id, 1, 3);
					err = true;
					break;
				}
				else if(aoss && (char_code == 32)){
					setWarn(id, 1, 3);
					err = true;
					break;
				}
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		err = true;
	}
	return err;
}

function chkfmtWpaKey(el, id)
{
	var err = false;
	
	if(el.value.length > 0)
	{
		if((el.value.length < 8) || (el.value.length > 64))
		{
			setWarn(id, 7, 9);
			err = true;
		}
		else if(el.value.length == 64)
		{
			var re = new RegExp("[^A-Fa-f0-9]");
			if(re.test(el.value))
			{
				setWarn(id, 8, 9);
				err = true;
			}
		}
		else
		{
			var i;
			var char_code;
			for(i = 0; i < el.value.length; i++)
			{
				char_code = el.value.charCodeAt(i);
				if((char_code <= 31) || (char_code >=  127))
				{
					setWarn(id, 0, 9);
					err = true;
					break;
				}
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		err = true;
	}
	return err;
}

function chkfmtWepAsciiKey(el, id, size)
{
	var err = false;
	if(el.value.length > 0)
	{
		if(el.value.length > size)
		{
			document.getElementById(id + "3_value").innerHTML = size;
			setWarn(id, 3, 9);
			err = true;
		}
		else
		{
			var i;
			var char_code;
			for(i = 0; i < el.value.length; i++)
			{
				char_code = el.value.charCodeAt(i);
				if((char_code <= 31) || (char_code >=  127))
				{
					setWarn(id, 4, 9);
					err = true;
					break;
				}
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		err = true;
	}
	return err;
}

function chkfmtWepHexKey(el, id, size)
{
	var err = false;
	if(el.value.length > 0)
	{
		if(el.value.length > size)
		{
			document.getElementById(id + "5_value").innerHTML = size;
			setWarn(id, 5, 9);
			err = true;
		}
		else
		{
			var re = new RegExp("[^A-Fa-f0-9]");
			if(re.test(el.value))
			{
				setWarn(id, 6, 9);
				err = true;
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		err = true;
	}
	return err;
}

function chkfmtWpaRepeaterKey(el, id)
{
	var err = false;
	if(el.value.length > 0)
	{
		if((el.value.length < 8) || (el.value.length > 64))
		{
			setWarn(id, 0, 3);
			err = true;
		}
		else if(el.value.length == 64)
		{
			var re = new RegExp("[^A-Fa-f0-9]");
			if(re.test(el.value))
			{
				setWarn(id, 2, 3);
				err = true;
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		err = true;
	}
	return err;
}

function chkfmtWepRepeaterKey(el, id)
{
	var err = false;
	if(el.value.length > 0)
	{
		if((el.value.length != 5) && (el.value.length != 10) && (el.value.length != 13) && (el.value.length != 26))
		{
			setWarn(id, 1, 3);
			err = true;
		}
		else if((el.value.length == 10) || (el.value.length == 26))
		{
			var re = new RegExp("[^A-Fa-f0-9]");
			if(re.test(el.value))
			{
				setWarn(id, 1, 3);
				err = true;
			}
		}
		if(err)
		{
			dispWarning(el, id);
		}
		else
		{
			undispId(id);
		}
	}
	else
	{
		undispId(id);
		err = true;
	}
	return err;
}

function chkfmtWirelessCommon(el, encid, warnid)
{
	var err = false;
	if(document.getElementById(encid).value.match(/WPA/)) 
	{
		err = chkfmtWpaKey(el, warnid);
	}
	else if(document.getElementById(encid).value.match(/WEP/))
	{
		if(document.getElementById(encid).value.match(/64/))
		{
			if(document.getElementById(encid).value.match(/ASCII/))
			{
				err = chkfmtWepAsciiKey(el, warnid, 5);
			}
			else if(document.getElementById(encid).value.match(/HEX/))
			{
				err = chkfmtWepHexKey(el, warnid, 10);
			}
		}
		else if(document.getElementById(encid).value.match(/128/))
		{
			if(document.getElementById(encid).value.match(/ASCII/))
			{
				err = chkfmtWepAsciiKey(el, warnid, 13);
			}
			else if(document.getElementById(encid).value.match(/HEX/))
			{
				err = chkfmtWepHexKey(el, warnid, 26);
			}
		}
		else if(document.getElementById(encid).value.match(/152/))
		{
			if(document.getElementById(encid).value.match(/ASCII/))
			{
				err = chkfmtWepAsciiKey(el, warnid, 16);
			}
			else if(document.getElementById(encid).value.match(/HEX/))
			{
				err = chkfmtWepHexKey(el, warnid, 32);
			}
		}
	}
	else if(document.getElementById(encid).value.match(/OPEN/))
	{
		undispId(warnid);
	}
	return err;
}
///////////////////////////////////////////////////////////////////////
// chkfmt
