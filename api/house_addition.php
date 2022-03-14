<?php
	$CN = mysqli_connect("localhost", "root", "");
	$DB = mysqli_select_db($CN, "aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$houseName=$DecodedData['houseName'];
	$location=$DecodedData['location'];
	$latitude=$DecodedData['latitude'];
	$longitude=$DecodedData['longitude'];
	$userID=$DecodedData['userID'];
	$desiredInternalTemp=$DecodedData['desiredInternalTemp'];
	$numBlinds=$DecodedData['numBlinds'];
	$UsualTemp=$DecodedData['UsualTemp'];

	$IQ1="update housecount set houseCount=houseCount + 1";
	$IQ="insert into houses(houseName, location, latitude, longitude, userID, desiredInternalTemp, numBlinds, UsualTemp) values('$houseName', '$location', $latitude, @longitude, $userID, $desiredInternalTemp, $numBlinds, $UsualTemp)";
	
	$R1=mysqli_query($CN,$IQ1);
	$R=mysqli_query($CN,$IQ);
	
	if ($R1)
	{
		if ($R)
		{
			$Message="The new house has successfully been added.";
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
