<?php

namespace App\Http\Controllers;

use App\Models\CourseMedia;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseMediaController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
            'course_id' => ['required', 'exists:courses', 'integer'],
            'title' => ['required', 'unique:course_media', 'string', 'max:55', 'min:3'],
            'description' => ['required', 'string', 'min:3', 'max:255'],
        ];

        $response = array('success' => false, 'message' => '');
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            $response['message'] = $validator->messages();
            return response()->json(['response' => $response], 422);
        } else {
            try {
                if($file = $request->file('filename')) {
                    $path = $file->store('public/media');
                    $fullPath = storage_path() . '/app/' . $path;

                    $getid3 = new \getID3;
                    $fileAnalyze = $getid3->analyze($fullPath);
                    $duration = date('H:i:s', $fileAnalyze['playtime_seconds']);
                    $courseMedia = CourseMedia::create([
                        'course_id' => $request->course_id,
                        'title' => $request->title,
                        'duration' => $duration,
                        'description' => $request->description,
                        'filename' => basename($path),
                        'full_path' => $fileAnalyze['filenamepath'],
                    ]);

                    $response['success'] = true;
                    $response['course'] = $courseMedia;
                }
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.'], 422);
            }
        }

        return response()->json(['response' => $response]);
    }

    public function update(Request $request)
    {
        $rules = [
            'cm_id' => ['required', 'exists:course_media', 'integer'],
            'title' => ['required', 'string', 'max:55', 'min:3'],
            'description' => ['required', 'string', 'min:3', 'max:255'],
        ];

        $response = array('success' => false, 'message' => '');
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            $response['message'] = $validator->messages();
            return response()->json(['response' => $response], 422);
        } else {
            try {
                $courseMedia = CourseMedia::findOrFail($request->cm_id);
                if($file = $request->file('filename')) {
                    $path = $file->store('public/media');
                    $fullPath = storage_path() . '/app/' . $path;
                    $getid3 = new \getID3;
                    $fileAnalyze = $getid3->analyze($fullPath);
                    $duration = date('H:i:s', $fileAnalyze['playtime_seconds']);

                    $courseMedia->filename = basename($path);
                    $courseMedia->full_path = $fileAnalyze['filenamepath'];
                    $courseMedia->duration = $duration;
                }
                if($request->title) {
                    $courseMedia->title = strip_tags(htmlentities($request->title));
                }
                if($request->description) {
                    $courseMedia->description = (strip_tags(htmlentities($request->description)));
                }
                $courseMedia->save();

                $response['success'] = true;
                $response['course'] = $courseMedia;
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.'], 422);
            }
        }

        return response()->json(['response' => $response]);

    }

    public function delete(Request $request)
    {
        try {
            $courseMedia = CourseMedia::findOrFail($request->cm_id);
            $courseMedia->delete();

            return response()->json(['success' => true, 'message' => 'Course medium successfully deleted.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting medium.'], 422);
        }
    }

    public function getMedium(Request $request)
    {
        try {
            $media = CourseMedia::findOrFail($request->mid);
            return response()->json(['success' => true, 'media' => $media]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'user' => 'Unable to get medium.'], 422);
        }
    }

    public function deleteMedia(Request $request)
    {
        $ids = explode(',', $request->ids);

        if(CourseMedia::whereIn('cm_id', $ids) === null) {
            return response()->json(['success' => false, 'message' => 'No media found.'], 422);
        }

        try {
            foreach(CourseMedia::whereIn('cm_id', $ids)->get() as $medium) {
                $medium->forceDelete();
            }

            return response()->json(['success' => true, 'message' => 'Media successfully deleted.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting media.'], 422);
        }
    }
}
