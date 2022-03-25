<?php
	$CN = mysqli_connect("localhost", "root", "");
	$DB = mysqli_select_db($CN, "aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$userID=$DecodedData['userID'];
	$scheduleName=$DecodedData['scheduleName'];
	$timeName=$DecodedData['timeName'];

	$IQ="update schedules set $timeName = NULL where userID='$userID' and scheduleName='$scheduleName'";
	$R=mysqli_query($CN,$IQ);
	
	if ($R)
	{
		$Message="The schedule has successfully been updated.";
	}
	else
	{
		$Message="Server Error: Please try again later.";
	}

	$Response[]=array("Message"=>$Message);
	echo json_encode($Response);
?>
