<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
            'cm_id' => ['required', 'exists:course_media,cm_id', 'integer'],
            'uid' => ['required', 'exists:users,id', 'integer'],
            'comment' => ['required', 'string', 'max:255'],
        ];

        $response = array('success' => false, 'message' => '');
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            $response['message'] = $validator->messages();
            return response()->json(['response' => $response], 422);
        } else {
            try {
                $comment = Comments::create([
                    'uid' => $request->uid,
                    'cm_id' => $request->cm_id,
                    'comment' => $request->comment,
                ]);

                $response['success'] = true;
                $response['comment'] = $comment;
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.'], 422);
            }
        }

        return response()->json(['response' => $response]);
    }

    public function listComments(Request $request)
    {
        $allCourseComments = Comments::where('cm_id' , '=', $request->cm_id)->get();
        return response()->json(['response' => $allCourseComments]);
    }
}
