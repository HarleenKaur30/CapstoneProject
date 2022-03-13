<?php
	$CN=mysqli_connect("localhost","root","");
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$tuyaID=$DecodedData['tuyaID'];
	$blindsName=$DecodedData['blindsName'];
	$groupName=$DecodedData['groupName'];
	$storey=$DecodedData['storey'];
	$windowHeight=$DecodedData['windowHeight'];
	$orientation=$DecodedData['orientation'];
	$obstructionLevel=$DecodedData['obstructionLevel'];
	$houseID=$DecodedData['houseID'];
	$userID=$DecodedData['userID'];

	$IQ1="update houses set numBlinds = numBlinds + 1 where houseID='$houseID'";
	$IQ="insert into blinds (userID, tuyaID, blindsName, groupName, storey, windowHeight, orientation, obstructionLevel, houseID) values ('$userID','$tuyaID', '$blindsName', '$groupName', '$storey', '$windowHeight', '$orientation', '$obstructionLevel', '$houseID')";
	
	$R1=mysqli_query($CN,$IQ1);
	$R=mysqli_query($CN,$IQ);
	
	if ($R1)
	{
		if ($R)
		{
			$Message="The new blind has successfully been added.";
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