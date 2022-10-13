<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            // 'password' => ['required', 'min:8', 'max:24'],
            'username' => ['required', 'string', 'max:20', 'unique:users'],
            'role' => ['required', 'integer', 'min:1', 'max:3'],
        ]);
        if($request->password !== $request->password_confirmation)
        {
            return response()->json(['success' => false, 'message' => 'Passwords must be identical.'])->setStatusCode(422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'api_token' => Str::random(60),
            'role' => $request->role,
        ]);

        return response()->json(['success' => true, 'user' => $user]);
    }

    public function getUser(Request $request)
    {
        try {
            $user = User::findOrFail($request->uid);
            return response()->json(['success' => true, 'user' => $user]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'user' => 'Unable to get user.'], 422);
        }
    }

    public function update(Request $request)
    {
        $rules = [
            'id' => ['required', 'exists:users', 'integer'],
            'name' => ['required', 'string', 'max:55', 'min:3'],
            'email' => ['required', 'string', 'min:3', 'max:255'],
            'username' => ['required', 'string', 'max:20', 'unique:users'],
        ];

        $response = array('success' => false, 'message' => '');
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            $response['message'] = $validator->messages();
            return response()->json(['response' => $response], 422);
        } else {
            try {
                $user = User::findOrFail($request->id);
                if($request->name && $request->name !== $user->name) {
                    $user->name = strip_tags(htmlentities($request->name));
                }
                if($request->email && $request->email !== $user->email) {
                    $user->email = (strip_tags(htmlentities($request->email)));
                }
                if($request->password) {
                    $user->password = Hash::make($request->password);
                }
                if($request->role && $request->role !== $user->rule) {
                    $user->role = $request->role;
                }
                if($request->username && $request->username !== $user->username) {
                    $user->username = $request->username;
                }
                $user->save();

                $response['success'] = true;
                $response['user'] = $user;
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.'])->setStatusCode(422);
            }
        }

        return response()->json(['response' => $response]);

    }

    public function getUserCourses(Request $request)
    {
        try {
            $user = User::findOrFail($request->id);

            $courses = Course::where('uid', $user->id)->get();
            $coursesArray = [];
            foreach ($courses as $course) {
                $coursesArray[] = ['id' => $course->course_id, 'course' => $course];
            }

            return response()->json(['success' => true, 'courses' => $coursesArray]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'No user found.'])->setStatusCode(422);
        }
    }
}
