<?php

	$CN=mysqli_connect("localhost","root","");

	$DB=mysqli_select_db($CN,"aishading");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData,true);

	$scheduleName=$DecodedData['scheduleName'];
	$timeName = $DecodedData['timeName'];
	$timeValue = $DecodedData['timeValue'];
	$userID = $DecodedData['userID'];
	
	$SQ = "select * from schedules where scheduleName='$scheduleName' and userID='$userID'";
	$Table0=mysqli_query($CN,$SQ);
	
	if(mysqli_num_rows($Table0)>0)
	{
		$IQ="update schedules set $timeName = '$timeValue' where scheduleName='$scheduleName' and userID='$userID'";
		$R = mysqli_query($CN,$IQ);
		if($R )
		{
			$Message = "The schedule has successfully been updated.";
		}	

		else 
		{
			$Message = "Server Error: Please try again later.";
		}
	}
	else
	{
		$IQ="insert into schedules (userID, scheduleName,$timeName) values('$userID','$scheduleName','$timeValue')";
		$R = mysqli_query($CN,$IQ);
		if($R )
		{
			$Message = "The schedule has successfully been updated.";
		}	

		else 
		{
			$Message = "Server Error: Please try again later.";
		}
	}

	$Response[] = array("Message"=>$Message);

	echo json_encode($Response);



?>