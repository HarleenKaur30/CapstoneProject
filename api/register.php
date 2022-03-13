<?php
	$CN=mysqli_connect("localhost","root","");
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$email=$DecodedData['email'];
	$password=$DecodedData['password'];

	$IQ="insert into users(email, password) values ('$email', '$password')";
	
	$R=mysqli_query($CN,$IQ);
	
	if ($R)
	{
		$Message="New user has been registered sucessfully.";
	}
	else
	{
		$Message="Server Error: Please try again later.";
	}
	
	$Response[]=array("Message"=>$Message);
	echo json_encode($Response);
?>