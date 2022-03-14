<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindUnitID=$DecodedData["FindUnitID"];
	
	$SQ="select scheduleID from blinds where unitID='$FindUnitID'";
	$Table=mysqli_query($CN,$SQ);
	$Row=mysqli_fetch_assoc($Table);
	$scheduleID=$Row["scheduleID"];
	
	$SQ2="select scheduleName from schedules where scheduleID='$scheduleID'";
	$Table=mysqli_query($CN,$SQ2);
	$Row=mysqli_fetch_assoc($Table);
	$scheduleName=$Row["scheduleName"];
	
	$Response[]=array("scheduleName"=>$scheduleName);
	echo json_encode($Response);
?>