<?php
ini_set('error_reporting', E_ALL );
ini_set('display_errors', true);
foreach( $_FILES as $name => $value ) {
	var_dump( $name );
	var_dump( $value["tmp_name"] );
	var_dump( $value["name"] );
	move_uploaded_file($value["tmp_name"], 
		"../pics/" . $value["name"]);
}
?>
