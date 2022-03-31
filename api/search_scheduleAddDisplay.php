<?php
	$CN=mysqli_connect("localhost","root","");
	
	$DB=mysqli_select_db($CN,"aishading");
	
	$EncodedData=file_get_contents('php://input');
	$DecodedData=json_decode($EncodedData,true);
	
	$FindScheduleName=$DecodedData["FindScheduleName"];
	$FindUserID=$DecodedData["FindUserID"];
	
	$SQ="select * from schedules where scheduleName='$FindScheduleName' and userID='$FindUserID'";
	$Table=mysqli_query($CN,$SQ);
	$prefix='time';
	$buffer='0';
	$openPercentage=0;
	$i=0;

	if(mysqli_num_rows($Table)>0)
	{
		$Row=mysqli_fetch_assoc($Table);
		$hour=0;
		while ($hour<24)
		{
			$minute=0;
			while($minute<60)
			{
				if ($hour<10)
				{
					$timeName=$prefix.$buffer.strval($hour);
				}
				else
				{
					$timeName=$prefix.strval($hour);
				}
				$time=strval($hour).':';
				if ($minute<10)
				{
					$timeName=$timeName.$buffer.strval($minute);
					$time=$time.$buffer.strval($minute);
				}
				else
				{
					$timeName=$timeName.strval($minute);
					$time=$time.strval($minute);
				}
				
				if (is_null($Row[$timeName])==false)
				{
					$openPercentageNew=$Row[$timeName];
					$move='Move Blinds to '.strval($openPercentageNew*100).'%';
					if ($openPercentage<$openPercentageNew)
					{
						$icon="blinds-open";
					}
					else
					{
						$icon="blinds";
					}
					$openPercentage=$openPercentageNew;
					
					$Response[$i]=array("timeName"=>$timeName,"time"=>$time,"title"=>$move, "icon"=>$icon);
					$i=$i+1;
				}
				
				$minute=$minute+15;
			}
			$hour=$hour+1;
		}
		
		
		
	}
	else
	{
		$time="";
		$move="";
		$icon="";
		$timeName="";
		$Response[$i]=array("timeName"=>$timeName,"time"=>$time,"title"=>$move, "icon"=>$icon);
	}
	if (isset($Response)==false)
	{
		$time="";
		$move="";
		$icon="";
		$timeName="";
		$Response[$i]=array("timeName"=>$timeName,"time"=>$time,"title"=>$move, "icon"=>$icon);
	}
	
	echo json_encode($Response);
?>