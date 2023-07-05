<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasFactory;
    public $timestamps = false;
    protected $guard = 'admin';
    protected $fillable = [
        'username',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

}