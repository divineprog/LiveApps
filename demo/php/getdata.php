<?php
// CORS header for JSON data
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Generate random value and a timestamp.
$value = rand (0, 100);
$timestamp = gmdate('Y-m-d\TH:i:s\Z');

// Create object.
$obj = array('timestamp' => $timestamp, 'value' => $value);

// Convert to JSON string.
$json = json_encode($obj);

// Write JSON to client.
echo $json;
?>
