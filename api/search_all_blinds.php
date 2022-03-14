<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindUserID=$DecodedData["FindUserID"];
	
	$SQ="select * from houses where userID='$FindUserID'";
	
	$Table=mysqli_query($CN,$SQ);
	
	$SQ_Check="select * from blinds where userID='$FindUserID'";
	$Table_Check=mysqli_query($CN,$SQ_Check);

	$i=0;
	$concatenate=' - ';
	
	if((mysqli_num_rows($Table))>0 && (mysqli_num_rows($Table_Check))>0)
	{
		while($Row = mysqli_fetch_assoc($Table)) 
		{
			$houseID=$Row["houseID"];
			$houseName=$Row["houseName"];
			$SQ2="select * from blinds where houseID='$houseID'";
			
			$Table2=mysqli_query($CN,$SQ2);
			
			if((mysqli_num_rows($Table2))>0)
			{
				while($Row2 = mysqli_fetch_assoc($Table2))
				{
					$unitID[]=$Row2["unitID"];
					$blindsName[]=$Row2["blindsName"];
					$Response[$i]=array("label"=>$houseName.$concatenate.$blindsName[$i],"value"=>$unitID[$i]);
					$i=$i+1;
				}
			}
			mysqli_free_result($Table2);
		}
	}
	else
	{
		$unitID=null;
		$label=null;
		$Response[$i]=array("label"=>$label,"value"=>$unitID);
	}
	mysqli_free_result($Table);
	
	echo json_encode($Response);

?>