<?php
ini_set("display_errors", "1");
ini_set("log_errors", "1");
error_reporting(-1);

$data = file_get_contents('php://input');
echo <pre>$data</pre>;
?>
