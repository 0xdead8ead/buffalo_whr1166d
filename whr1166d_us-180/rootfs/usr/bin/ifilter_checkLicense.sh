#!/bin/sh

/usr/bin/ccf_checkLicenseStatus &
sleep 15

regStatus=`nvram get ifilterRegStatus`
if [ "$regStatus" == "2" ] ; then
	nvram set ifilterRegStatus="4"
	killall ccf_checkLicenseStatus
fi
