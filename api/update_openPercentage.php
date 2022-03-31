<?php
	$CN = mysqli_connect("localhost", "root", "");
	$DB = mysqli_select_db($CN, "aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$unitID=$DecodedData['unitID'];
	$openPercentage=$DecodedData['openPercentage'];

	$IQ="update blinds set openPercentage = '$openPercentage' where unitID='$unitID'";
	$R=mysqli_query($CN,$IQ);
	
	if ($R)
	{
		$Message="The blinds have successfully been updated.";
	}
	else
	{
		$Message="Server Error: Please try again later.";
	}

	$Response[]=array("Message"=>$Message);
	echo json_encode($Response);
?>
