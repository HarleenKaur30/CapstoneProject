<?php
	$CN = mysqli_connect("localhost", "root", "");
	$DB = mysqli_select_db($CN, "aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);

	$newPassword=$DecodedData['newPassword'];
	$userID=$DecodedData['userID'];

	$IQ="update users set password = '$newPassword' where userID = '$userID'";
	
	$R=mysqli_query($CN,$IQ);
	
	
	
	if ($R)
		{
			$Message="Password updated.";
		}
	else
		{
			$Message="Server Error: Please try again later.";
		}
		

	$Response[]=array("Message"=>$Message);
	echo json_encode($Response);
?>
