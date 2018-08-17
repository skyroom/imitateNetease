<?php
	header("Content-Type:text/plain");
	$uname=$_REQUEST['uname'];
	$pwd=$_REQUEST['pwd'];
	$conn=mysqli_connect("127.0.0.1","root","","netease",3306);
	mysqli_query($conn, "SET NAMES UTF8");
	$sql="SELECT user_id FROM users WHERE user_name='$uname' AND user_pwd='$pwd'";
	$result=mysqli_query($conn,$sql);
	//var_dump($result);

	$row=mysqli_fetch_assoc($result);
	//var_dump($row);
	if($row)
	{
		echo "cz";
	}else {
		echo "bcz";
	}
?>