<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginRegisterController extends Controller
{
    public function register()
    {
        return Inertia::render("Register");
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:250',
            'password' => 'required|min:3'
        ]);

        $admin = Admin::query()->create([
            "username" => $request->username,
            "password" => bcrypt($request->password)
        ]);

        $id = $admin->id;

        Auth::loginUsingId($id);
        $request->session()->regenerate();
        return redirect("/")->withSuccess("You have successfully registrated");
    }

    public function login()
    {
        return Inertia::render("AdminAuth");
    }

    public function authenticate(Request $request)
    {
        $request->validate([
            "username" => 'required|alpha_num',
            "password" => 'required'
        ]);

        $username = $request->username;
        $password = $request->password;

        if ( Auth::guard('admin')->attempt(['username' => $username, 'password' => $password ])) {
            $request->session()->regenerate();
            return redirect("/admin/products");
        }

        return redirect()->back();
    }
}