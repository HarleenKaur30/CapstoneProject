<?php
	$CN = mysqli_connect("localhost", "root", "");
	$DB = mysqli_select_db($CN, "aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);

	$scheduleID=$DecodedData['scheduleID'];

	$IQ="delete from schedules where scheduleID='$scheduleID'";
	$R=mysqli_query($CN,$IQ);
	
	$IQ1="update blinds set scheduleID = NULL where scheduleID='$scheduleID'";
	$R1=mysqli_query($CN,$IQ1);
	
	if($R1)
	{
		if ($R)
		{
			$Message="The schedule has been deleted.";
		}
		else
		{
			$Message="Server Error: Please try again later.";
		}
	}
	else
	{
	$Message="Server Error: Please try again later.";

	}

	$Response[]=array("Message"=>$Message);
	echo json_encode($Response);
?>
