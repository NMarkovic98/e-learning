<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\CourseCategories;
use Exception;
use Illuminate\Http\Request;

class CourseCategoriesController extends Controller
{
    public function getCategories(Request $request)
    {
        try {
            $categories = Category::all();
            return response()->json(['success' => true, 'categories' => $categories]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Unable to get categories'], 422);
        }
    }

    public function getCoursesByCategory(Request $request)
    {
        try {
            $category_id = $request->category_id;

            $courseCategories = CourseCategories::where('category_id', $category_id)->get();

            $courses = [];
            foreach ($courseCategories as $courseCategory) {
                $course = Course::where('course_id', $courseCategory->course_id)->first();
                if($course) {
                    $courses[] = $course;
                }
            }

            return response()->json(['success' => true, 'courses' => $courses]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Unable to get courses for category'], 422);
        }
    }

    public function getCourseCategories(Request $request)
    {
        try {
            $course_id = $request->course_id;

            $courseCategories = CourseCategories::where('course_id', $course_id)->get();

            $courses = [];
            foreach ($courseCategories as $courseCategory) {
                $course = Category::where('category_id', $courseCategory->category_id)->first();
                if($course) {
                    $courses[] = $course;
                }
            }

            return response()->json(['success' => true, 'courses' => $courses]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Unable to get courses for category'], 422);
        }
    }
}
