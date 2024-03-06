<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Paginatable;

class LogCount extends Model
{
    use HasFactory,Paginatable;
    protected $guarded = [];
    protected $table = 'log_counts';

    
   
}
  
