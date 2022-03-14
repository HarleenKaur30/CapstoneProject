<?php
	$CN=mysqli_connect("localhost","root","");
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$unitID=$DecodedData['unitID'];
	$scheduleID=$DecodedData['scheduleID'];

	$IQ="update blinds set scheduleID = '$scheduleID' where unitID='$unitID'";
	
	$R=mysqli_query($CN,$IQ);
	
	if ($R)
	{
		$Message="The blind has successfully been added to this schedule.";
	}
	else
	{
		$Message="Server Error: Please try again later.";
	}

	$Response[]=array("Message"=>$Message);
	echo json_encode($Response);
?>