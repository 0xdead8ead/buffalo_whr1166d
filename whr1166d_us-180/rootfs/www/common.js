//===  start common.js ===//

var countZero=0;

function CleanSingleKey(val)
{
	document.getElementById(val).value="";
}

function moreInfo(url) 
{
	var enhancePopup = true;
	if(enhancePopup) // usual case
	{
		fw=window.open(url, "fw", "resizable=yes,status=yes,scrollbars,HEIGHT=600,WIDTH=800");
		fw.focus();
	}
	else
	{
		self.location.href=url;
	}
}

function isBlankedge(s)
{
	if (s.charAt(0)==' '||s.charAt(0)=='\n'||s.charAt(0)=='\t'||s.charAt(s.length-1)==' '||s.charAt(s.length-1)=='\n'||s.charAt(s.length-1)=='\t')
		return true;
	else
		return false;
}

function isBlank(s) 
{
	for(i=0;i<s.length;i++) 
	{
		c=s.charAt(i);
		if((c!=' ')&&(c!='\n')&&(c!='\t'))
		{
			return false;
		}
	}
	
	return true;
}

function isInitialZero(num)
{
	if((num.length > 1)&&(num.charAt(0) == '0'))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function check_integer(a)
{
	var i;
	var c;
	
	if(a.length==0)
	{
		if((a>='0')&&(a<='9'))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		for(i=0; i<a.length; i++)
		{
			c=a.charAt(i);
		
			if((c>='0')&&(c<='9'))
			{
				continue;
			}
			else
			{
				return false;
			}
		}
	}
	
	return true;
}

function check_0Tof(a)
{
	var i;
	var c;
	
	if(a.length==0)
	{
		if(((a>='0')&&(a<='9'))||((a>='a')&&(a<='f'))||((a>='A')&&(a<='F')))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		for(i=0; i<a.length; i++)
		{
			c=a.charAt(i);
			
			if(((c>='0')&&(c<='9'))||((c>='a')&&(c<='f'))||((c>='A')&&(c<='F')))
			{
				continue;
			}
			else
			{
				return false;
			}
		}
	}
	
	return true;
}

function convertBinary(a)
{	
	var num1;
	var num2;
	var currnum;
	currnum = 128;
	num1=a;

	if(num1 >= currnum)		/* next bit is "1" */
	{	
		if(countZero==0)		/* don't have a one yet */
		{	num2 = "1";
			num1 = num1 - currnum;
			currnum = currnum / 2;
		}
		else
		{
			countZero=0;		/* Reset mask flag*/
			return false;
		}
	}
	else				/* next bit is "0" */
	{		
		/* doesn't matter what u have before is zero or one */
		countZero=1;
		num2 = "0";
		currnum = currnum / 2;
	}

	for(p = 1; p <= 7; p++)
	{
		if(num1 >= currnum)	/* next bit is "1" */
		{
			if(countZero==0)		/*  have all ones*/
			{	num2 = num2 + "1";
				num1 = num1 - currnum;
				currnum = currnum / 2;
			}
			else				/*have both a zero and one before hand*/
			{
				countZero=0;	/* Reset mask flag*/
				return false;
			}
		}
		else			/* next bit is "0" */
		{	
			/* doesn't matter what u have before is zero or one */
			num2 = "0";
			countZero=1;
			currnum = currnum / 2;
		}
	}

	return true;
}

function check_ip(ip)
{
	var i;
	var n;
	var m;
	var c;
	if(ip.length > 0)
	{
		n = ip.split('.');
		if(n.length == 4)
		{	
			if(n[0]==127)
				return 1;
			if(!check_integer(n[0]))
				return 2;
			//if((isNaN(n[0]))||(n[0]<=0)||(n[0]>=224)||(isBlank(n[0]))||(isInitialZero(n[0])))
			if((isNaN(n[0]))||(n[0]<=0)||(n[0]>=224)||(isBlank(n[0]))) //hebe modify 2011.10.21
				return 1;
			if(!check_integer(n[1])) 
				return 2;
			//if((isNaN(n[1]))||(n[1]<0)||(n[1]>255)||isBlank(n[1])||(isInitialZero(n[1])))
			if((isNaN(n[1]))||(n[1]<0)||(n[1]>255)||isBlank(n[1])) //hebe modify 2011.10.21
				return 1;
			if(!check_integer(n[2])) 
				return 2;
			//if((isNaN(n[2]))||(n[2]<0)||(n[2]>255)||isBlank(n[2])||(isInitialZero(n[2])))
			if((isNaN(n[2]))||(n[2]<0)||(n[2]>255)||isBlank(n[2])) //hebe modify 2011.10.21
				return 1;
			if(!check_integer(n[3])) 
				return 2;
			//if((isNaN(n[3]))||(n[3]<=0)||(n[3]>255)||isBlank(n[3])||(isInitialZero(n[3])))
			if((isNaN(n[3]))||(n[3]<=0)||(n[3]>255)||isBlank(n[3])) //hebe modify 2011.10.21
				return 1;
		}
		else
		{	
			for(i=0; i<ip.length; i++)
			{
				c=ip.charAt(i);
			
				if((c>='0')&&(c<='9')||(c=='.'))
				{
					continue;
				}
				else
				{
					return 2;
				}
			}
			return 1;
		}
	}
	
	return 0;
}

function check_route_ip(ip,netmask)
{
	var i;
	var n;
	var m;
	
	if(ip.length > 0)
	{
		n = ip.split('.');
		m = netmask.split('.');
		if(n.length == 4)
		{	
			if(n[0]==127)
				return 1;
				
			//if((isNaN(n[0]))||(n[0]<1)||(n[0]>=224)||(isBlank(n[0]))||(isInitialZero(n[0]))||(!check_integer(n[0]))) 
			if((isNaN(n[0]))||(n[0]<1)||(n[0]>=224)||(isBlank(n[0]))||(!check_integer(n[0])))  //honest modify 2011.10.24
				return 1;
			
			//if((isNaN(n[1]))||(n[1]<0)||(n[1]>255)||isBlank(n[1])||(isInitialZero(n[1]))||(!check_integer(n[1]))) 
			if((isNaN(n[1]))||(n[1]<0)||(n[1]>255)||isBlank(n[1])||(!check_integer(n[1])))  //honest modify 2011.10.24
				return 1;
			
			//if((isNaN(n[2]))||(n[2]<0)||(n[2]>255)||isBlank(n[2])||(isInitialZero(n[2]))||(!check_integer(n[2]))) 
			if((isNaN(n[2]))||(n[2]<0)||(n[2]>255)||isBlank(n[2])||(!check_integer(n[2])))  //honest modify 2011.10.24
				return 1; 
			
			//if((isNaN(n[3]))||(n[3]<0)||(n[3]>=255)||isBlank(n[3])||(isInitialZero(n[3]))||(!check_integer(n[3]))) 
			if((isNaN(n[3]))||(n[3]<0)||(n[3]>255)||isBlank(n[3])||(!check_integer(n[3]))) //honest modify 2011.10.24
				return 1;
				
			for (i=3;i>=0;i--)
			{
				if (m[i]!=255)
				{
					if ((m[i] & n[i])!=n[i])
						return 2;
				}
				else
					return 0;
			}
		}
		else
		{
			return 1;
		}
	}
	return 0;
}

function check_gateway(gateway)
{
	if(gateway == '0.0.0.0')
		return true;
	
	if ( check_ip(gateway)!=0 ) 
		return false;
	else
		return true;
}

function check_netmask(mask)
{
	var i;
	var n;
	var temp;

	countZero=0;
	if(mask.length > 0)
	{
		n=mask.split('.');

		if(n.length==4)
		{
			if(n[0] == '0')
				return 2;
			for(i=0; i<4; i++)
			{
				if((isBlank(n[i]))||(isNaN(n[i])))
					return 3;
					
				if(!check_integer(n[i]))
					return 1;
					
				if((n[0]<128)||(n[i]>255))
					return 2;
			}
			if((convertBinary(n[0]))&&(convertBinary(n[1]))&&(convertBinary(n[2]))&&(convertBinary(n[3])))
			{
				return 0;
			}
			else
			{
				return 2;
			}
		}
		else
		{
			return 3;
		}
	}
	else 
		return 3;
		
	return 0;
}

function check_the_same_subnet(ip1, ip2, netmask)
{
	var i;
	var ip1_partition = ip1.split('.');
	var ip2_partition = ip2.split('.');
	var netmask_partition = netmask.split('.');
	var check_partition;
	
	if( (ip1_partition.length == 4) && (ip2_partition.length == 4) && (netmask_partition.length == 4) )
	{
		for (i=3;i>=0;i--)
		{
			if( (ip1_partition[i] & netmask_partition[i]) != (ip2_partition[i] & netmask_partition[i]) )
			{
				return false;
			}
		}
		
		return true;
	}
	else
	{
		return false;
	}
}

function check_the_same_subnet_reg_route(ip1, ip2, netmask, real_lanmask)
{
	var i;
	var ip1_partition = ip1.split('.');//input ip
	var ip2_partition = ip2.split('.');//lan ip
	var netmask_partition = netmask.split('.');//input netmask
	var netmask_partition2 = real_lanmask.split('.');//DUT netmask
	var check_partition;
	
	if( (ip1_partition.length == 4) && (ip2_partition.length == 4) && (netmask_partition.length == 4) )
	{
		for (i=3;i>=0;i--)
		{
			if( (ip1_partition[i] & netmask_partition[i]) != (ip2_partition[i] & netmask_partition2[i]) )
			{
				return false;
			}			
		}
		return true;
	}
	else
	{
		return true;
	}
}

function check_subnet(ip1, ip2, netmask)
{
	var i;
	var ip1_partition = ip1.split('.');
	var ip2_partition = ip2.split('.');
	var netmask_partition = netmask.split('.');
	var check_partition;
	if( ((ip1_partition[0] & netmask_partition[0]) == ip2_partition[0]) && ((ip1_partition[1] & netmask_partition[1]) == ip2_partition[1]) && ((ip1_partition[2] & netmask_partition[2]) == ip2_partition[2]) && ((ip1_partition[3] & netmask_partition[3]) == ip2_partition[3]) )
		return true;
	else
		return false;
}

function check_broadcast(ip1, ip2, netmask)
{
	var i;
	var ip1_partition = ip1.split('.');
	var ip2_partition = ip2.split('.');
	var netmask_partition = netmask.split('.');
	var check_partition;
	if( ((ip1_partition[0] | (netmask_partition[0]^255)) == ip2_partition[0]) && ((ip1_partition[1] | (netmask_partition[1]^255)) == ip2_partition[1]) && ((ip1_partition[2] | (netmask_partition[2]^255)) == ip2_partition[2]) && ((ip1_partition[3] | (netmask_partition[3]^255)) == ip2_partition[3]) )
		return true;
	else
		return false;
}

//Add by hebe 2011.10.24
function check_broadcast_ip_mask(ip1, netmask ,ip2)
{
	var i;
	var ip1_partition = ip1.split('.');//Gateway IP
	var ip2_partition = ip2.split('.');//Wan IP
	var netmask_partition = netmask.split('.');
	var check_partition;
	var subnet = new Array(4);
	var broadcast = new Array(4);
	
	if( (ip1_partition.length == 4) && (netmask_partition.length == 4) )
	{
		for (i=3;i>=0;i--)
		{		
			var tmp1 = 256-netmask_partition[i];
			var tmp2 = Math.floor(ip2_partition[i]/tmp1);
      subnet[i] = tmp2*tmp1;
      broadcast[i] = (tmp2+1)*tmp1-1;
		}

		var ip1_total = parseInt(ip1_partition[0])+parseInt(ip1_partition[1])+parseInt(ip1_partition[2])+parseInt(ip1_partition[3]);
		var subnet_total = parseInt(subnet[0])+parseInt(subnet[1])+parseInt(subnet[2])+parseInt(subnet[3]);
		var broadcast_total = parseInt(broadcast[0])+parseInt(broadcast[1])+parseInt(broadcast[2])+parseInt(broadcast[3]);
		if( (parseInt(ip1_total) <= parseInt(subnet_total)) || (parseInt(ip1_total) >= parseInt(broadcast_total)) )
		  return 1;
		return 0;
	}
}
//Add end

function check_ip_mask(ip1, netmask)
{
	var i;
	var tmp1;
	var tmp2;
	var ip1_partition = ip1.split('.');//Wan IP
	var netmask_partition = netmask.split('.');
	var subnet = new Array(4);
	var broadcast = new Array(4);
	
	if( (ip1_partition.length == 4) && (netmask_partition.length == 4) )
	{
		for (i=3;i>=0;i--)
		{		
			tmp1 = 256-netmask_partition[i];
			tmp2 = Math.floor(ip1_partition[i]/tmp1);
      subnet[i] = tmp2*tmp1;
      broadcast[i] = (tmp2+1)*tmp1-1;
		}
		var ip1_total = parseInt(ip1_partition[0])+parseInt(ip1_partition[1])+parseInt(ip1_partition[2])+parseInt(ip1_partition[3]);
		var subnet_total = parseInt(subnet[0])+parseInt(subnet[1])+parseInt(subnet[2])+parseInt(subnet[3]);
		var broadcast_total = parseInt(broadcast[0])+parseInt(broadcast[1])+parseInt(broadcast[2])+parseInt(broadcast[3]);
		if( (parseInt(ip1_total) <= parseInt(subnet_total)) || (parseInt(ip1_total) >= parseInt(broadcast_total)) )
		  return 1;
		return 0;
	}
}

function check_mac_plus(mac)
{
        var i;
        var n;
        var count=0;
        var ff_valid=0;
        var zero_valid=0;
        var odd_valid=0;
        var valid=0;
        var odd_array="02468AaCcEe";

        if(mac.length > 0)
        {
                n = mac.split(':');

                if(n.length==6)
                {
                        if (n[0]!="*")
                        {
                                for (i=0;i<odd_array.length;i++)
                                {
                                        if (n[0].charAt(1) == odd_array.charAt(i))
                                                odd_valid=1;
                                        else
                                                continue;
                                }
                        }
                        else
                                odd_valid=1;

                        for(i=0; i<6; i++)
                        {
                                if (n[i]=="*")
                                {
                                        count++;
                                        if (count>5)
                                                return false;

                                        continue;
                                }
                                else
                                {
                                        if((isBlank(n[i]))||(!check_0Tof(n[i]))||(n[i].length != 2))
                                        {
                                                return false;
                                        }
                                }
                        }

                        for(i=0; i<6; i++)
                        {
                                if(((n[i].charAt(0)=='f')||(n[i].charAt(0)=='F'))&&((n[i].charAt(1)=='f')||(n[i].charAt(1)=='F')))
				{
                                        continue;
				}
                                else
                                {
                                        ff_valid=1;
                                        break;
                                }
                        }

			for(i=0; i<6; i++)
                        {
                                if((n[i].charAt(0)=='0')&&(n[i].charAt(1)=='0'))
				{
                                        continue;
				}
                                else
                                {
                                        zero_valid=1;
                                        break;
                                }
                        }
                        if((ff_valid==1)&&(zero_valid==1)&&(odd_valid==1))
                        {
                                return true;
                        }
                        else
                        {
                                return false;
                        }
                }
                return false;
        }
        return true;
}

function check_mac(mac) //Caspar modified for buffalo check error feature 20100324
{	//0:no error 1:mac length error 2:mac address error 
	var i;
	var n;
	var ff_valid=0;
	var zero_valid=0;
	var odd_valid=0;
	var valid=0;
	var odd_array="02468AaCcEe";
	
	if(mac.length > 0)
	{
		n = mac.split(':');

		if(n.length==6)
		{
			for (i=0;i<odd_array.length;i++)
			{
				if (n[0].charAt(1) == odd_array.charAt(i))
					odd_valid=1;
				else
					continue;	
			}

				
			for(i=0; i<6; i++)
			{
				if((isBlank(n[i]))||(!check_0Tof(n[i]))||(n[i].length != 2))
				{
					return 2;
				}
			}

			for(i=0; i<6; i++)
			{	
				if(((n[i].charAt(0)=='f')||(n[i].charAt(0)=='F'))&&((n[i].charAt(1)=='f')||(n[i].charAt(1)=='F')))
				{
					continue;
				}
				else
				{	
					ff_valid=1;	
					break;
				}
			}

			for(i=0; i<6; i++)
			{
				if((n[i].charAt(0)=='0')&&(n[i].charAt(1)=='0'))
				{
					continue;
				}
				else
				{	
					zero_valid=1;		
					break;
				}
			}

			if((ff_valid==1)&&(zero_valid==1)&&(odd_valid==1))
			{	
				return 0;
			}
			else
			{
				return 2;
			}
		}
		else
		{
			return 1;
		}
	}
	
	return 0;
}

function check_port(a)
{
	if(a.length > 0)
	{
		if((isNaN(a))||(a<1)||(a>65535)||(!check_integer(a))||(isInitialZero(a)))
		{
			return false;
		}		
	}
	
	return true;
}

function check_net_mask(ip,mask)
{
	var bin_mask="";
	var i,j;
	var n,m;
	//build binary mask
	for (i=0;i<parseInt(mask,10);i++)
	{	
		if (i!=0 && i%8==0)
			bin_mask = bin_mask.concat(".");
		bin_mask = bin_mask.concat("1");		
	}	
	for (j=i;j<32;j++)
	{
		if (j!=0 && j%8==0)
			bin_mask = bin_mask.concat(".");
		bin_mask = bin_mask.concat("0");
	}
	n = ip.split('.');
	m = bin_mask.split('.');
	//do ip & mask
	for (i=0;i<4;i++)
	{
		if(parseInt(n[i],10) != ( parseInt(m[i],2) & parseInt(n[i],10 )))
			return true;
	}
	
	return false;
}

function check_integer_range(inputValue, minValue, maxValue)
{
	if(inputValue.length > 0)
	{
		if((!check_integer(inputValue))||(inputValue<minValue)||(inputValue>maxValue)||(isInitialZero(inputValue)))
		{
			return false;
		}		
	}

	return true;
}

function check_overlap(s, e, s_ed, e_ed)
{
	if(((parseInt(s)>=parseInt(s_ed))&&(parseInt(s)<=parseInt(e_ed)))||((parseInt(e)>=parseInt(s_ed))&&(parseInt(e)<=parseInt(e_ed))))
	{
		return false;
	}
	
	if(((parseInt(s_ed)>=parseInt(s))&&(parseInt(s_ed)<=parseInt(e)))||((parseInt(e_ed)>=parseInt(s))&&(parseInt(e_ed)<=parseInt(e))))
	{
		return false;
	}
	
	return true;
}

function merge_ip(target, item1, item2, item3, item4)
{
	var target_item=document.getElementById(target);
	var value1=document.getElementById(item1).value;
	var value2=document.getElementById(item2).value;
	var value3=document.getElementById(item3).value;
	var value4=document.getElementById(item4).value;
	target_item.value=value1+"."+value2+"."+value3+"."+value4;
	
	return true;
}

function merge_mac(target, item1, item2, item3, item4, item5, item6)
{
	var target_item=document.getElementById(target);
	var value1=document.getElementById(item1).value;
	var value2=document.getElementById(item2).value;
	var value3=document.getElementById(item3).value;
	var value4=document.getElementById(item4).value;
	var value5=document.getElementById(item5).value;
	var value6=document.getElementById(item6).value;
	target_item.value=value1+":"+value2+":"+value3+":"+value4+":"+value5+":"+value6;
	
	return true;
}

function SetCwinHeight()
{
	var iframeid = top.document.getElementById("content_main"); //iframe id
	var iframehelpid = top.document.getElementById("content_help"); //iframe id
	
	if (iframeid)
		iframeid.height = 540;
	if (iframehelpid)	
		iframehelpid.height = 540;
	
	if (document.getElementById)
	{   
		if (iframeid && !window.opera)
		{
			if (iframeid.contentDocument && iframeid.contentDocument.body && iframeid.contentDocument.body.offsetHeight && window.navigator.appName != "Microsoft Internet Explorer")
			{   
				if (iframeid.contentDocument.body.offsetHeight < 540)
				{
					iframeid.height = 540;
					iframehelpid.height = 540;
				}
				else
				{
					iframeid.height = iframeid.contentDocument.body.offsetHeight;
					iframehelpid.height = iframeid.contentDocument.body.offsetHeight;
				}
			}		
			else if(iframeid.contentDocument && iframeid.contentDocument.body && iframeid.contentDocument.body.scrollHeight) //ie10
			{
				if (iframeid.contentDocument.body.scrollHeight < 540)
				{
					iframeid.height = 540;
					iframehelpid.height = 540;
				}
				else
				{
					iframeid.height = iframeid.contentDocument.body.scrollHeight;
					iframehelpid.height = iframeid.contentDocument.body.offsetHeight;
				}
			}
			else if(iframeid.Document && iframeid.Document.body && iframeid.Document.body.scrollHeight)
			{
				if (iframeid.Document.body.scrollHeight < 540)
				{
					iframeid.height = 540;
					iframehelpid.height = 540;
				}
				else
				{
					iframeid.height = iframeid.Document.body.scrollHeight;
					iframehelpid.height = iframeid.Document.body.offsetHeight;
				}
			}
		}
	}
}
function Show_error(item_name, err_msg)
{
	var errObj = document.getElementById("id_errtbl");
	var itemstring=top.err_item;
	var descriptionstring=top.err_description;
	//alert(itemstring+" : "+descriptionstring);
	errObj.innerHTML = '<hr>';
	errObj.innerHTML += "<p>"+itemstring+" "+item_name+"<br>"+descriptionstring+" "+err_msg+"</p>";
	errObj.innerHTML += '<hr>';
	errObj.style.display="";
	SetCwinHeight();
	top.window.scroll(0,0);
}

function Show_error_new(item_name)
{
	var errObj = document.getElementById("id_errtbl");
	var itemstring=top.new_err_item;
	//var descriptionstring=top.err_description;
	//alert(itemstring+" : "+descriptionstring);
	errObj.innerHTML = '<hr>';
	errObj.innerHTML += "<p>"+itemstring+" "+item_name+"</p>";
	errObj.innerHTML += '<hr>';
	errObj.style.display="";
	SetCwinHeight();
	top.window.scroll(0,0);
}


function Show_error_3(item_name, err_msg, err_content)
{
	var errObj = document.getElementById("id_errtbl");
	var itemstring=top.err_item;
	var descriptionstring=top.err_description;
	var CONTENTSstring=top.err_CONTENTS
	//alert(itemstring+" : "+descriptionstring);
	errObj.innerHTML = '<hr>';
	if(err_content.length!=0)
		errObj.innerHTML += "<p>"+itemstring+" "+item_name+"<br>"+descriptionstring+" "+err_msg+"<br>"+CONTENTSstring+" "+err_content+"</p>";
	else	
		errObj.innerHTML += "<p>"+itemstring+" "+item_name+"<br>"+descriptionstring+" "+err_msg+"</p>";
	errObj.innerHTML += '<hr>';
	errObj.style.display="";
	SetCwinHeight();
	top.window.scroll(0,0);
}

//add
function Show_WizardError(item_name, err_msg)
{
	var errObj = document.getElementById("id_errtbl");
	var itemstring="<%GetString("Confirm","13");%>";
	var descriptionstring="<%GetString("Confirm","14");%>";
	errObj.innerHTML = '<hr>';
	errObj.innerHTML += "<p>"+itemstring+" "+item_name+"<br>"+descriptionstring+" "+err_msg+"</p>";
	errObj.innerHTML += '<hr>';
	//errObj.innerHTML += "<p>ERROR: "+item_name+"<br>"+"description: "+err_msg+"</p>";
	errObj.style.display="";
}

function Show_WizardError_Smart(item_name, err_msg)
{
	var errObj = document.getElementById("id_errtbl");
	var tittle=this.err_tittle_smart;
	var itemstring=this.err_item_smart;
	var descriptionstring=this.err_description_smart;
	errObj.innerHTML = '<hr>';
	errObj.innerHTML += "<p>"+tittle+"<br>"+itemstring+" "+item_name+"<br>"+descriptionstring+" "+err_msg+"</p>";
	//errObj.innerHTML += "<p>ERROR: "+item_name+"<br>"+"description: "+err_msg+"</p>";
	errObj.style.display="";
}

function Show_WizardError2(item_name)
{
	var errObj = document.getElementById("id_errtbl");
	var itemstring=top.err_item;
	var descriptionstring=top.err_description;
	errObj.innerHTML = '<hr>';
	errObj.innerHTML += "<p>"+itemstring+" "+item_name;
	//errObj.innerHTML += "<p>ERROR: "+item_name+"<br>"+"description: "+err_msg+"</p>";
	errObj.style.display="";
}

function Hide_error()
{
	var errObj = document.getElementById("id_errtbl");
	errObj.style.display="none";
}

function Escape_String(item_string)
{
	var stringtmp=escape(item_string);
	var i=0;
	for (i=0;i<stringtmp.length;i++)
	{	
		if (stringtmp.charAt(i)=='%'&& stringtmp.charAt(i+1)=='u')
			return false;	
	}
	return true;	
}

function convert(num)
{
	var num1;
	var num2;
	var currnum;
	currnum = 128;
	num1 = eval(num);
	if(num1 >= currnum)
	{
		num2 = "1";
		num1 = num1 - currnum;
		currnum = currnum / 2;
	}
	else
	{
		num2 = "0";
		currnum = currnum / 2;
	}		
	for (p = 1; p <= 7; p++)
	{
		if(num1 >= currnum)
		{
			num2 = num2 + "1";
			num1 = num1 - currnum;
			currnum = currnum / 2;
		}
		else
		{
			num2 = num2 + "0";
			currnum = currnum / 2;
		}
	}
	return num2;
}

function Changelink(url,helpurl)
{
	top.content_frame.document.location.href = url;
	top.content_helpframe.document.location.href = "./help/"+helpurl;
}

function check_ascii(a)
{
	var i;
	var c;
	
	if(a.length==0)
		return true;
	else
	{
		for(i=0; i<a.length; i++)
		{
			c=a.charCodeAt(i);
		
			if((c>='32')&&(c<='126'))
			{
				continue;
			}
			else
			{
				return false;
			}
		}
	}
	return true;
}

function rm_start(item)
{
	var itemObj = document.getElementById(item);
	if (itemObj.value.length!=0)
		itemObj.value="";
}

//Add by Honest 2011.10.24
function ip_normalize_0(ip)
{
	var ip_tmp = ip.split('.');
	
	if (ip_tmp.length!=4)
		return ip;
		
	var ip_s = ip.split('.', 4);

	if(ip_s.length!=4)
		return ip;

    return parseInt(ip_s[0],10) + "." +
           parseInt(ip_s[1],10) + "." + 
           parseInt(ip_s[2],10) + "." + 
           parseInt(ip_s[3],10);
}
//Add end

function wifipskcheck(psk)
{
	//Do not limit psk character.
	/*
	for (i=0; i<psk.length; i++)
	{
		var c;
			
		c=psk.charAt(i);
		
		//if ((c=='<') || (c=='>') || (c=='\"') || (c=='\'') || (c=='\\') || (c=='&') || (c==';') || (c==' ') || (c=='|'))
		//if ((c=='\"') || (c=='\'') || (c=='&') || (c==' ') || (c=='|'))
		if ((c=='\"') || (c=='\'') || (c=='&') || (c=='|'))
		{
			return false;
		}
	}
	*/
	return true;
}

function checkBrowserCss()
{
	var isIE = navigator.userAgent.search("MSIE") > -1;
	if(isIE){
		document.getElementById('iecss_common').rel = 'stylesheet';
		document.getElementById('anothercss_common').disabled = true;
	}
	else{
		document.getElementById('anothercss_common').rel = 'stylesheet';
		document.getElementById('iecss_common').disabled = true;
	}
	setTimeout("document.getElementById('id_main').style.display = '';SetCwinHeight();", 300);
}
//===  end common.js ===//
