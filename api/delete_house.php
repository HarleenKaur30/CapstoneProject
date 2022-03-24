<?php
	$CN = mysqli_connect("localhost", "root", "");
	$DB = mysqli_select_db($CN, "aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);

	$houseID=$DecodedData['houseID'];

	$IQ="delete from houses where houseID='$houseID'";
	$R=mysqli_query($CN,$IQ);
	
	$IQ1="delete from blinds where houseID='$houseID'";
	$R1=mysqli_query($CN,$IQ1);
	
	if ($R1)
	{
		if ($R)
		{
			$Message="The house and its associated blinds have successfully been deleted.";
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
