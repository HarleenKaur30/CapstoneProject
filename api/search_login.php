<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindEmail=$DecodedData["FindEmail"];
	$FindPassword=$DecodedData["FindPassword"];
	
	$SQ="select * from users where email='$FindEmail' and password='$FindPassword'";
	
	$Table=mysqli_query($CN,$SQ);
	
	if(mysqli_num_rows($Table)>0)
	{
		$Row=mysqli_fetch_assoc($Table);
		$userID=$Row["userID"];
	}
	else
	{
		$userID=null;
	}
	
	$Response[]=array("userID"=>$userID);
	echo json_encode($Response);
?>