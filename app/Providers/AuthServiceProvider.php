<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use Carbon\Carbon;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        if (! $this->app->routesAreCached()) {
            Passport::routes();
           /*  Passport::tokensExpireIn(now()->addDays(15));
            Passport::refreshTokensExpireIn(now()->addDays(30));
            Passport::personalAccessTokensExpireIn(now()->addMonths(6)); */

           /*  Passport::tokensExpireIn(now()->addMinutes(5));
            Passport::refreshTokensExpireIn(now()->addMinutes(5));
            Passport::personalAccessTokensExpireIn(now()->addMinutes(5)); */

            Passport::tokensExpireIn(now()->addHours(10));
            Passport::refreshTokensExpireIn(now()->addHours(10));
            Passport::personalAccessTokensExpireIn(now()->addHours(10));
        }
    }
}
