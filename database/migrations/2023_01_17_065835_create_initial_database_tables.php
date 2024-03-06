<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInitialDatabaseTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        

        //employees 
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->text('name_ar')->nullable();
            $table->text('name_en')->nullable();
            $table->string('email')->unique();
            $table->string('mobile')->nullable();
            $table->string('national_id')->nullable();
            $table->text('qualification')->nullable();
            $table->string('gender')->nullable();
            $table->string('martial_status')->nullable();
            $table->text('national_address_building_no')->nullable();
            $table->text('national_address_postal')->nullable();
            $table->text('national_address_extra')->nullable();
            $table->text('bank_name')->nullable();
            $table->string('bank_ipan')->nullable();
            $table->string('national_id_file')->nullable();
            $table->string('qualification_file')->nullable();
            $table->string('national_address_file')->nullable();
            $table->string('bank_ipan_file')->nullable();
            $table->tinyInteger('is_working')->default(0);
            $table->tinyInteger('registered_in_remote_work_platform')->default(0);
            $table->tinyInteger('electronic_signature_approval')->default(0);
            $table->string('secret_approvement_file')->nullable();
            $table->string('electronic_signature_file')->nullable();
            $table->integer('status_id')->nullable(); // foreign on emp_status
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });



        //emp_status
        Schema::create('emp_status', function (Blueprint $table) {
            $table->id();
            $table->text('status')->nullable();
            $table->timestamps();
        });



        //companies
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->string('email')->unique();
            $table->string('commercial_record')->nullable();
            $table->string('mobile')->nullable();
            $table->string('national_address_building_no')->nullable();
            $table->string('national_address_postal')->nullable();
            $table->string('national_address_extra')->nullable();
            $table->string('labor_office_company_id')->nullable();
            $table->string('insurance_office_company_id')->nullable();
            $table->string('commercial_record_file')->nullable();
            $table->string('tax_registration_certificate_file')->nullable();
            $table->string('national_address_file')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });



        //jobs
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->text('job_title')->nullable();
            $table->text('job_description')->nullable();
            $table->integer('added_by')->nullable();
            $table->integer('status')->default(1);
            $table->timestamps();
        });



        //job_requests
        Schema::create('job_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id')->nullable();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->integer('request_status')->default(0);
            $table->text('notes')->nullable();
            $table->integer('added_by')->nullable();
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->timestamps();
        });



        //job_request_candidates
        Schema::create('job_request_candidates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_request_id')->nullable();
            $table->unsignedBigInteger('emp_id')->nullable();
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('job_request_id')->references('id')->on('job_requests')->onDelete('cascade');
            $table->timestamps();
        });



        //tasks
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->text('task_title')->nullable();
            $table->text('task_description')->nullable();
            $table->text('task_period')->nullable();
            //$table->integer('job_id')->nullable(); // to be multiple jobs
            //$table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');
            $table->timestamps();
        });

        

        
        //tasks_jobs
        Schema::create('tasks_jobs', function (Blueprint $table) {
            $table->unsignedBigInteger('task_id')->nullable();
            $table->unsignedBigInteger('job_id')->nullable();
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->timestamps();
        });




        //courses
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->text('course_title')->nullable();
            $table->text('course_description')->nullable();
            $table->string('period')->nullable();
            $table->string('price')->nullable();
            $table->string('course_contract')->nullable();
            $table->integer('added_by')->nullable();
            $table->timestamps();
        });


    


        //emp_subscription
        Schema::create('emp_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('subscription_type')->nullable(); //membership or courses
            $table->unsignedBigInteger('emp_id')->nullable();
            $table->string('month')->nullable();
            $table->string('year')->nullable();
            $table->integer('is_approved')->nullable();
            $table->string('payment_file')->nullable();
            $table->text('course_contract_content')->nullable();
            $table->date('start_at')->nullable();
            $table->date('end_at')->nullable();
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
            $table->timestamps();
        });



        

        //emp_courses
        Schema::create('emp_courses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id')->nullable();
            $table->unsignedBigInteger('emp_id')->nullable();
            $table->unsignedBigInteger('subscription_id')->nullable();
            $table->foreign('course_id')->references('id')->on('couses')->onDelete('cascade');
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('subscription_id')->references('id')->on('emp_subscriptions')->onDelete('cascade');
            $table->timestamps();
        });

        

         //company_subscription
         Schema::create('company_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->string('month')->nullable();
            $table->string('year')->nullable();
            $table->integer('is_approved')->default(0);
            $table->string('payment_file')->nullable();
            $table->date('start_at')->nullable();
            $table->date('end_at')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->timestamps();
        });



        
         //company_emp
         Schema::create('company_emp', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->unsignedBigInteger('emp_id')->nullable();
            $table->unsignedBigInteger('job_request_id')->nullable();
            $table->date('work_start_date')->nullable();
            $table->text('note')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('job_request_id')->references('id')->on('job_requests')->onDelete('cascade');
            $table->timestamps();
        });



        //insurance
        Schema::create('insurance', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->unsignedBigInteger('emp_id')->nullable();
            $table->text('company_file')->nullable();
            $table->text('emp_file')->nullable();
            $table->integer('status')->nullable();
            $table->integer('subscription_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
            $table->timestamps();
        });



        //messages
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->text('message_title')->nullable();
            $table->text('message_content')->nullable();
            $table->unsignedBigInteger('message_from')->nullable();
            $table->unsignedBigInteger('message_to')->nullable();
            $table->foreign('message_from')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('message_to')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });



        //settings
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->text('site_title')->nullable();
            $table->text('admin_mail')->nullable();
            $table->text('logo')->nullable();
            $table->timestamps();
        });



        //notifications
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->text('content')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->text('meta')->nullable();            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
        



        //to create new table called work_hours
            /* 
                --id
                --task_id
                --emp_id
                --start_at
                --end_at
                --month
                --company_id
                --created_at

            */

        
        //questions about tasks , insurance

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('initial_database_tables');
    }
}
