<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // $credentials['password'] = Hash::make($credentials['password']);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json(['success' => true, 'user' => Auth::user()]);
        }

        return response()->json(['success' => false, 'message' => 'The provided credentials do not match our records.']);
    }

    public function logout(Request $request)
    {
        $token = $request->api_token;

        $authenticatedUser = User::where('api_token', $token)->first();
        if($authenticatedUser && $authenticatedUser->id === Auth::user()->id) 
        {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
