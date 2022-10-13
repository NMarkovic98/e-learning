<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseMediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path('storage/seeder_data/media');
        $fileNameArray = scandir($path);

        $this->faker = Faker::create();

        $courses = DB::table('courses')->get()->toArray();

        for($i = 0; $i < 30; $i++) {
            $media = $fileNameArray[rand(0, count($fileNameArray) - 1)];
            $newName = Str::random(40) . '.mp4';
            if(!is_file(base_path('storage/seeder_data/media/') . $media)) {
                continue;
            }
            Storage::disk('media')->put($newName, file_get_contents(base_path('storage/seeder_data/media/') . $media));

            $fullPath = storage_path() . '/app/public/media/' . $newName;
            $getid3 = new \getID3;
            $fileAnalyze = $getid3->analyze($fullPath);
            $duration = date('H:i:s', $fileAnalyze['playtime_seconds']);

            DB::table('course_media')->insert([
                'course_id' => $courses[rand(0, count($courses) - 1)]->course_id,
                'title' => $this->faker->text(25),
                'description' => $this->faker->text(35),
                'filename' => $newName,
                'duration' => $duration,
                'full_path' => $fileAnalyze['filenamepath'],
                'created_at' => now(),
            ]);
        }
    }
}
