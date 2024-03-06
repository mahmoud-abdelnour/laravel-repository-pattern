<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('settings')){
            if (!Schema::hasColumn('settings','send_telework_report')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->text('send_telework_report')->after('task_period')->nullable();
                });
            }

            if (!Schema::hasColumn('settings','conditions_page')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->text('conditions_page')->after('send_telework_report')->nullable();
                });
            }


            if (!Schema::hasColumn('settings','privacy_page')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->text('privacy_page')->after('send_telework_report')->nullable();
                });
            }


            if (!Schema::hasColumn('settings','terms_page')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->text('terms_page')->after('send_telework_report')->nullable();
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

        if (Schema::hasTable('settings')){
            if (Schema::hasColumn('settings','send_telework_report')) {
                Schema::table('settings', function (Blueprint $table) {
                    $table->dropColumn('send_telework_report');
                });
            }
        }
    }
}
