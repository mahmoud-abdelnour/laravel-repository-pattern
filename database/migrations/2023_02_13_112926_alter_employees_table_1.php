<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterEmployeesTable1 extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('tasks_jobs')){
            if (!Schema::hasColumn('tasks_jobs','id')) {
                Schema::table('tasks_jobs', function (Blueprint $table) {
                    $table->id()->before('task_id');
                });
            }
        }


        if (Schema::hasTable('resigns')){
            if (!Schema::hasColumn('resigns','status')) {
                Schema::table('resigns', function (Blueprint $table) {
                    $table->text('status')->after('company_id')->nullable();
                });
            }


            if (!Schema::hasColumn('resigns','job_request_id')) {
                Schema::table('resigns', function (Blueprint $table) {
                    $table->unsignedBigInteger('job_request_id')->after('company_id')->nullable();
                    $table->foreign('job_request_id')->references('id')->on('job_requests')->onDelete('cascade');
                });
            }
        }


        if (Schema::hasTable('company_emp')){
            if (!Schema::hasColumn('company_emp','is_working')) {
                Schema::table('company_emp', function (Blueprint $table) {
                    $table->tinyInteger('is_working')->after('job_request_id')->nullable()->default(0);
                });
            }
        }


        if (Schema::hasTable('messages')){
            if (!Schema::hasColumn('messages','to_type')) {
                Schema::table('messages', function (Blueprint $table) {
                    $table->text('to_type')->after('message_to')->nullable();
                });
            }

            if (!Schema::hasColumn('messages','from_type')) {
                Schema::table('messages', function (Blueprint $table) {
                    $table->text('from_type')->after('message_to')->nullable();
                });
            }
        }



        if (Schema::hasTable('employees')){
            if (!Schema::hasColumn('employees','status')) {
                Schema::table('employees', function (Blueprint $table) {
                    $table->text('status')->after('electronic_signature_file')->nullable();
                });
            }

            if (!Schema::hasColumn('employees','approved_at')) {
                Schema::table('employees', function (Blueprint $table) {
                    $table->timestamp('approved_at')->after('status')->nullable();
                });
            }
            if (!Schema::hasColumn('employees','approved_by')) {
                Schema::table('employees', function (Blueprint $table) {
                    $table->integer('approved_by')->after('approved_at')->nullable();
                });
            }


            if (!Schema::hasColumn('employees','company_id')) {
                Schema::table('employees', function (Blueprint $table) {
                    $table->unsignedBigInteger('company_id')->after('job_id')->nullable();
                    $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
                });
            }

           
        }

        if (Schema::hasTable('job_request_candidates')){
            if (!Schema::hasColumn('job_request_candidates','emp_response_status')) {
                Schema::table('job_request_candidates', function (Blueprint $table) {
                    $table->text('emp_response_status')->after('emp_id')->nullable();
                });
            }

            if (!Schema::hasColumn('job_request_candidates','company_response_status')) {
                Schema::table('job_request_candidates', function (Blueprint $table) {
                    $table->text('company_response_status')->after('emp_id')->nullable();
                });
            }


            if (!Schema::hasColumn('job_request_candidates','rejection_reason')) {
                Schema::table('job_request_candidates', function (Blueprint $table) {
                    $table->text('rejection_reason')->after('company_response_status')->nullable();
                });
            }

            if (!Schema::hasColumn('job_request_candidates','status')) {
                Schema::table('job_request_candidates', function (Blueprint $table) {
                    $table->text('status')->after('emp_response_status')->nullable();
                });
            }
        }

        if (Schema::hasTable('emp_subscriptions')){
            if (Schema::hasColumn('emp_subscriptions','payment_amount')) {
                Schema::table('emp_subscriptions', function (Blueprint $table) {
                    $table->dropColumn('payment_amount');
                });
            }

            if (!Schema::hasColumn('emp_subscriptions','payment_amount')) {
                Schema::table('emp_subscriptions', function (Blueprint $table) {
                    $table->integer('payment_amount')->after('is_approved')->nullable();
                });
            }

            if (!Schema::hasColumn('emp_subscriptions','notes')) {
                Schema::table('emp_subscriptions', function (Blueprint $table) {
                    $table->text('notes')->after('course_contract_content')->nullable();
                });
            }

          
        }

        if (Schema::hasTable('company_subscriptions')){
            if (!Schema::hasColumn('company_subscriptions','payment_amount')) {
                Schema::table('company_subscriptions', function (Blueprint $table) {
                    $table->integer('payment_amount')->after('is_approved')->nullable();
                });
            }

            if (!Schema::hasColumn('company_subscriptions','notes')) {
                Schema::table('company_subscriptions', function (Blueprint $table) {
                    $table->text('notes')->after('is_approved')->nullable();
                });
            }
        }

        if (Schema::hasTable('employees')){
            if (!Schema::hasColumn('employees','job_id')) {
                Schema::table('employees', function (Blueprint $table) {
                    $table->unsignedBigInteger('job_id')->after('user_id')->nullable();
                    $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');
                });
            }

            if (!Schema::hasColumn('employees','added_by')) {
                Schema::table('employees', function (Blueprint $table) {
                    $table->unsignedBigInteger('added_by')->after('status_id')->nullable();
                    $table->foreign('added_by')->references('id')->on('users')->onDelete('cascade');
                });
            }

            
            
        }


        //emp_tasks
        if (!Schema::hasTable('emp_tasks')){
            Schema::create('emp_tasks', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('task_id')->nullable();
                $table->unsignedBigInteger('emp_id')->nullable();
                $table->unsignedBigInteger('company_id')->nullable();
                $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
                $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
                $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
                $table->timestamps();
            });
        }

        if (Schema::hasTable('emp_tasks')){
            if (!Schema::hasColumn('emp_tasks','due_date')) {
                Schema::table('emp_tasks', function (Blueprint $table) {
                    $table->text('due_date')->after('company_id')->nullable();
                });
            }
        }

        if (Schema::hasTable('insurance')){
            if (!Schema::hasColumn('insurance','job_request_id')) {
                Schema::table('insurance', function (Blueprint $table) {
                    $table->text('job_request_id')->after('status')->nullable();
                });
            }


            if (!Schema::hasColumn('insurance','job_request_candidate_id')) {
                Schema::table('insurance', function (Blueprint $table) {
                    $table->text('job_request_candidate_id')->after('job_request_id')->nullable();
                });
            }
        }


        if (Schema::hasTable('emp_courses')){
            if (!Schema::hasColumn('emp_courses','contract_content')) {
                Schema::table('emp_courses', function (Blueprint $table) {
                    $table->text('contract_content')->after('emp_id')->nullable();
                });
            }

            if (!Schema::hasColumn('emp_courses','approved')) {
                Schema::table('emp_courses', function (Blueprint $table) {
                    $table->integer('approved')->after('contract_content')->default(0)->nullable();
                });
            }


            if (Schema::hasColumn('emp_courses','course_id')) {
                Schema::table('emp_courses', function (Blueprint $table) {
                    $table->dropForeign('emp_courses_course_id_foreign');
                    $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
                });
            }
        
        }

        if (Schema::hasTable('users')){
            if (!Schema::hasColumn('users','user_name')) {
                Schema::table('users', function (Blueprint $table) {
                    $table->text('user_name')->after('name')->nullable();
                });
            }

            if (Schema::hasColumn('users','national_id')) {
                Schema::table('users', function (Blueprint $table) {
                    $table->dropColumn('national_id');
                });
            }


            if (!Schema::hasColumn('users','national_id')) {
                Schema::table('users', function (Blueprint $table) {
                    $table->text('national_id')->after('user_type')->nullable();
                });
            }
            
        }


        if (Schema::hasTable('job_requests')){
            if (!Schema::hasColumn('job_requests','count')) {
                Schema::table('job_requests', function (Blueprint $table) {
                    $table->text('count')->after('company_id')->nullable();
                });
            }
        }

        if (Schema::hasTable('permissions')){
            if (!Schema::hasColumn('permissions','category')) {
                Schema::table('permissions', function (Blueprint $table) {
                    $table->text('category')->after('guard_name')->nullable();
                });
            }

            if (!Schema::hasColumn('permissions','title_ar')) {
                Schema::table('permissions', function (Blueprint $table) {
                    $table->text('title_ar')->after('name')->nullable();
                });
            }

            if (!Schema::hasColumn('permissions','title_en')) {
                Schema::table('permissions', function (Blueprint $table) {
                    $table->text('title_en')->after('name')->nullable();
                });
            }

            if (!Schema::hasColumn('permissions','parent_id')) {
                Schema::table('permissions', function (Blueprint $table) {
                    $table->text('parent_id')->after('name')->nullable();
                });
            }
        }

        if (Schema::hasTable('courses')){
            /* if (Schema::hasColumn('courses','course_contract')) {
                Schema::table('courses', function (Blueprint $table) {
                    $table->dropColumn('course_contract');
                });
            } */

            if (!Schema::hasColumn('courses','course_contract')) {
                Schema::table('courses', function (Blueprint $table) {
                    $table->text('course_contract')->after('price')->nullable();
                });
            }
        }

        if (Schema::hasTable('companies')){
            if (!Schema::hasColumn('companies','status')) {
                Schema::table('companies', function (Blueprint $table) {
                    $table->text('status')->after('national_address_file')->nullable();
                });
            }

            
            if (!Schema::hasColumn('companies','approved_at')) {
                Schema::table('companies', function (Blueprint $table) {
                    $table->timestamp('approved_at')->after('status')->nullable();
                });
            }

            if (!Schema::hasColumn('companies','approved_by')) {
                Schema::table('companies', function (Blueprint $table) {
                    $table->integer('approved_by')->after('approved_at')->nullable();
                });
            }
        }

        if (Schema::hasTable('emp_tasks')){
            if (!Schema::hasColumn('emp_tasks','started_at')) {
                Schema::table('emp_tasks', function (Blueprint $table) {
                    $table->text('started_at')->after('due_date')->nullable();
                });
            }

            if (!Schema::hasColumn('emp_tasks','finished_at')) {
                Schema::table('emp_tasks', function (Blueprint $table) {
                    $table->text('finished_at')->after('started_at')->nullable();
                });
            }
        }
        

        if (Schema::hasTable('resigns')){
            if (!Schema::hasColumn('resigns','source')) {
                Schema::table('resigns', function (Blueprint $table) {
                    $table->text('source')->after('status')->nullable();
                });
            }

            if (!Schema::hasColumn('resigns','added_by')) {
                Schema::table('resigns', function (Blueprint $table) {
                    $table->text('added_by')->after('source')->nullable();
                });
            }

            if (!Schema::hasColumn('resigns','notes')) {
                Schema::table('resigns', function (Blueprint $table) {
                    $table->text('notes')->after('source')->nullable();
                });
            }
        }

        
        if (Schema::hasTable('settings')){
            if (!Schema::hasColumn('settings','task_assign_method')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->text('task_assign_method')->after('logo')->nullable();
                });
            }

            if (!Schema::hasColumn('settings','task_period_method')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->text('task_period_method')->after('task_assign_method')->nullable();
                });
            }

            if (!Schema::hasColumn('settings','task_period')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->text('task_period')->after('task_period_method')->nullable();
                });
            }
        }

        
        if (Schema::hasTable('attendances')){
            if (!Schema::hasColumn('attendances','attendance_type')) {
                Schema::table('attendances', function (Blueprint $table) {
                    $table->text('attendance_type')->after('check_out')->nullable();
                });
            }
        }

     
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('job_request_candidates', function (Blueprint $table) {
            $table->dropColumn('emp_response_status');
        });
    }
}
