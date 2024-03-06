<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class ReportExport implements FromView
{

    public $data;
    function __construct($data){
        $response = (object)$data;
        $this->data = $response;
    } 


    public function view(): View
    {
        
        return view('reports.excel', [
            'filters' => $this->data
        ]);
    }
}