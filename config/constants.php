<?php 
$file =  file_get_contents(storage_path('app/public/enum'));
return $data = json_decode($file, true);

//return response()->json($data);