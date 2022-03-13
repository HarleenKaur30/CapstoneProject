<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindTuyaID=$DecodedData["FindTuyaID"];
	
	$SQ="select * from blinds where tuyaID='$FindTuyaID'";
	
	$Table=mysqli_query($CN,$SQ);
	
	$Response[]=array("blindsExist"=>mysqli_num_rows($Table));
	echo json_encode($Response);
?>