#!/bin/sh
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin
RC_CONF=/tmp/rc.conf
SCRIPT=$0
USER=root
LANIF=br0
RESOLV_FILE=/etc/resolv.conf

DNSMASQ_BIN=/bin/dnsmasq
DNSMASQ_FILE=/var/run/dnsmasq.pid

# Get the environments
lan_dnsmasq_enable=`nvram get DHCPSDNSRelayEnable`
lan_ipadd=`nvram get LanIPAddr`

# Set the Host file for bufDDNS
echo "$lan_ipadd buffalo.setup" > /tmp/iphost
 
# include the enviro's
#. $RC_CONF

# routines ##########################################################

start () {
	[ -f $DNSMASQ_FILE ] && (kill -TERM `cat $DNSMASQ_FILE`) 
	if [ "$lan_dnsmasq_enable" = "1" ]; then
#		$DNSMASQ_BIN -u $USER -A "/mynetwork.$dhcp_domain_name/$lan_ip" -A "/mynetwork/$lan_ip" -c 0 -h -q -N -i $LANIF
#		$DNSMASQ_BIN -u $USER -c 0 -h -N -d --resolv-file=$RESOLV_FILE &
# Gemtek +++ remove -d option for enabling fork for TCP DNS request blocking issue ---
		$DNSMASQ_BIN -u $USER -c 0 -h -H /tmp/iphost -n -N --resolv-file=$RESOLV_FILE &
	fi
}

stop () {
	local err; err=0
	local pid
	if [ -f $DNSMASQ_FILE ]; then
		kill -TERM `cat $DNSMASQ_FILE` || err=1
		[ -f $DNSMASQ_FILE ] && (rm $DNSMASQ_FILE || err=1)
	else
		pid=`pidof dnsmasq`
		[ ! -z "$pid" ] && ( kill -TERM $pid || err=1)
	fi
	return $err
}

usage () {
        echo "$0 [start|stop|]"
        exit 1
}

# main ##########################################################

[ -z "$1" ] && usage;

for action in $*; do
	case $action in 
		start)		start;;
		stop)		stop;;
		*)		usage;;
	esac
	if [ $? != "0" ] ; then
		echo $SCRIPT $action error
		exit 1
	fi

	echo $SCRIPT $action ok
done

exit 0
