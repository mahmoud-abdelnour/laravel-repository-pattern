<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeleworkReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){


        /* 'EstLaborOfficeId'=>"1",
        'EstSequenceNumber'=>"2300219",
        'IdNumber'=>"1032586073",
        'ActivityLevel'=>"22",
        'LoginCount'=>"0",
        'LogoutCount'=>"0",
        'AssignedTasks'=>"7",
        'CompletedTasks'=>"2",
        'TotalWorkTime'=>"0", */


        Schema::create('telework_reports', function (Blueprint $table) {
            $table->id();
            $table->text('emp_id')->nullable();
            $table->text('hash')->nullable();
            $table->text('added_by')->nullable();
            $table->text('EstLaborOfficeId')->nullable();
            $table->text('EstSequenceNumber')->nullable();
            $table->text('IdNumber')->nullable();
            $table->text('ActivityLevel')->nullable();
            $table->text('LoginCount')->nullable();
            $table->text('LogoutCount')->nullable();
            $table->text('AssignedTasks')->nullable();
            $table->text('CompletedTasks')->nullable();
            $table->text('TotalWorkTime')->nullable();
            $table->text('response')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('telework_reports');
    }
}
