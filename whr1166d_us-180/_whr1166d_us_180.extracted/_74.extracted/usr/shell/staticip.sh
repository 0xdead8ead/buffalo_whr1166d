#!/bin/sh
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin
SCRIPT=$0
RESOLV_CONF=/etc/resolv.conf

INTERFACE=vlan0002

# get the enviro's
wan_ip=`nvram get WANStaticIP`
wan_netmask=`nvram get WANStaticMASK`
hostname=`nvram get WANStaticHostName`
domain=`nvram get WANStaticDomainName`
wan_staticip_mtu=`nvram get InternetMtu`
dns1=`nvram get InternetDNS1`
dns2=`nvram get InternetDNS2`
wan_gateway=`nvram get InternetDefaultGateway`
model_name=`nvram get ModelName`
#. $RC_CONF

# routines ##########################################################

start () {
	ifconfig $INTERFACE $wan_ip mtu $wan_staticip_mtu netmask $wan_netmask && \
	route add default gw $wan_gateway
	
	#Getmek add for ConnectSafe function
	ConnectSafe_Level=`nvram get ConnectSafe_Filtering_Level`
	if [ "$ConnectSafe_Level" == "1" ]; then
		echo adding Block Malicious Sites dns 198.153.192.22
		echo adding Block Malicious Sites dns 198.153.194.22
		echo nameserver 198.153.192.22 > $RESOLV_CONF
		echo nameserver 198.153.194.22 >> $RESOLV_CONF
	elif [ "$ConnectSafe_Level" == "2" ]; then
		echo adding Block Malicious and Adult Sitese dns 198.153.192.32
		echo adding Block Malicious and Adult Sites dns 198.153.194.32
		echo nameserver 198.153.192.32 > $RESOLV_CONF
		echo nameserver 198.153.194.32 >> $RESOLV_CONF
	elif [ "$ConnectSafe_Level" == "3" ]; then
		echo adding Block Malicious, Adult, and Other Non-Family Friendly Sites dns 198.153.192.42
		echo adding Block Malicious, Adult, and Other Non-Family Friendly Sites dns 198.153.194.42
		echo nameserver 198.153.192.42 > $RESOLV_CONF
		echo nameserver 198.153.194.42 >> $RESOLV_CONF
	fi
	#Gemtek end
	
	[ ! -z "$dns1" ] && ( echo "$dns1"; echo "nameserver $dns1" >> $RESOLV_CONF; nvram set WanCurrentDNS1=$dns1 )
	[ ! -z "$dns2" ] && ( echo "$dns2"; echo "nameserver $dns2" >> $RESOLV_CONF; nvram set WanCurrentDNS2=$dns2 )
	[ ! -z "$dns3" ] && ( echo "$dns3"; echo "nameserver $dns3" >> $RESOLV_CONF; nvram set WanCurrentDNS3=$dns3 )
	# Set hostname & domain name
		if [ "$hostname" = "" ] ; then
                        if [ "$domain" = "" ] ; then
                                echo "$wan_ip $model_name.localdomain $model_name" > /etc/hosts
                                /bin/hostname $hostname.localhost
                                nvram set WanCurrentDomainName=localdomain
                        else
                                echo "$wan_ip $model_name.$domain $model_name" > /etc/hosts
                                /bin/hostname WHR-1166D.$domain
                                nvram set WanCurrentDomainName=$domain
                        fi
			nvram set WanCurrentHostname=""
                else
                        if [ "$domain" = "" ] ; then
                                echo "$wan_ip $hostname.localhost $hostname" > /etc/hosts
                                /bin/hostname $hostname.localhost
                                nvram set WanCurrentDomainName=localdomain
                        else
                                echo "$wan_ip $hostname.$domain $hostname" > /etc/hosts
                                /bin/hostname $hostname.$domain
                                nvram set WanCurrentDomainName=$domain
                        fi
			nvram set WanCurrentHostname=$hostname
                fi
	# set Current info to nvram 
	nvram set WanCurrentIP=$wan_ip
	nvram set WanCurrentNetmask=$wan_netmask
	nvram set WanCurrentGateway=$wan_gateway
	nvram set WanCurrentDNS1=$dns1
	nvram set WanCurrentDNS2=$dns2
	nvram set WanCurrentDNS3=$dns3
	nvram set WanCurrentMTU=$wan_staticip_mtu
	/usr/sbin/gt_utils wan_service start
	#Check PPTP Service
	router_mode=`nvram get RouterMode`
	if [ "$router_mode" != 0 ] ; then
		/usr/sbin/gt_utils checkpptp WAN &
	fi
}

stop () {
	# Clear nvram current info
	nvram set WanCurrentIP=""
	nvram set WanCurrentNetmask=""
	nvram set WanCurrentGateway=""
	nvram set WanCurrentDNS1=""
	nvram set WanCurrentDNS2=""
	nvram set WanCurrentDNS3=""
	nvram set WanCurrentMTU=""
	nvram set WanCurrentHostname=""
	nvram set WanCurrentDomainName=""

	#echo "" > $RESOLV_CONF
	route del default 
	ifconfig $INTERFACE 0.0.0.0 
	#/usr/sbin/gt_utils wan_service stop
}

usage () {
        echo "$0 [start|stop]"
        exit 1
}

# main ##########################################################

[ -z "$1" ] && usage;

for action in $*; do
	case $action in 
		config)		;;
		start)		start;;
		stop)		stop;;
		reload)		;;
		restart)	stop && start;;
		*)		usage;;
	esac
	if [ $? != "0" ] ; then
		echo $SCRIPT $action error
		exit 1
	fi

	echo $SCRIPT $action ok
done

exit 0
