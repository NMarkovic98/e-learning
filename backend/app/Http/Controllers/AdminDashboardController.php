<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseMedia;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function listUsers(Request $request)
    {
        if($request->has('search')) {
            $likeQuery = strip_tags(htmlentities($request->search));
            $allUsers = User::where('name', 'like', '%' . $likeQuery . '%')
                ->orWhere('username', 'like', '%' . $likeQuery . '%')
                ->orWhere('email', 'like', '%' . $likeQuery . '%')
                ->get();
            return response()->json(['response' => $allUsers]);
        } else {
            $allUsers = User::all();
            return response()->json(['response' => $allUsers]);
        }
    }

    public function listCourses(Request $request)
    {
        if($request->has('search')) {
            $likeQuery = strip_tags(htmlentities($request->search));
            $allCourses = Course::where('name', 'like', '%' . $likeQuery . '%')
                ->orWhere('description', 'like', '%' . $likeQuery . '%')
                ->get();
            return response()->json(['response' => $allCourses]);
        } else {
            $allCourses = Course::all();
            return response()->json(['response' => $allCourses]);
        }
    }

    public function listMedia(Request $request)
    {
        if($request->has('search')) {
            $likeQuery = strip_tags(htmlentities($request->search));
            $allCourseMedia = CourseMedia::where('title', 'like', '%' . $likeQuery . '%')
                ->orWhere('description', 'like', '%' . $likeQuery . '%')
                ->get();
            return response()->json(['response' => $allCourseMedia]);
        } else {
            $allCourseMedia = CourseMedia::all();
            return response()->json(['response' => $allCourseMedia]);
        }
    }

    public function deleteUser(Request $request)
    {
        try {
            $user = User::findOrFail($request->uid);
            $user->delete();

            return response()->json(['success' => true, 'message' => 'User successfully deleted.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting user.'], 422);
        }
    }

    public function deleteUsers(Request $request)
    {
        $ids = explode(',', $request->ids);

        if(User::whereIn('id', $ids) === null) {
            return response()->json(['success' => false, 'message' => 'No users found.'], 422);
        }

        try {
            foreach(User::whereIn('id', $ids)->get() as $usr) {
                $usr->forceDelete();
            }

            return response()->json(['success' => true, 'message' => 'Users successfully deleted.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting user.'], 422);
        }
    }
}
