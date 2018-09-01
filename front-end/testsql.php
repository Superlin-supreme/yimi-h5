<?php

$mysqli = mysqli_connect('127.0.0.1', 'root', '');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

// if(!$mysqli){
// 	die('Could not connect: '.mysql_error());
// }

echo 'Connection OK'.'<br>';

if (mysqli_query($mysqli, "CREATE DATABASE my_db")){
  echo "Database created";
}
else{
  echo "Error creating database: ". mysqli_error($mysqli). "<br>";
}

mysqli_select_db($mysqli, "my_db");
$creatTable = "CREATE TABLE Persons
(
	FirstName varchar(15),
	LastName varchar(15),
	Age int
)";

if(mysqli_query($mysqli, $creatTable)){
	echo "table created";
}else{
	echo "Error: ". mysqli_error($mysqli). "<br>";
}

$insertData = "insert into Persons values('Glenn', 'Quagmire', '33')";

if(mysqli_query($mysqli, $insertData)){
	echo "Data created";
}else{
	echo "Error: ". mysqli_error($mysqli). "<br>";
}

mysqli_close($mysqli);
?>