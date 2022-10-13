<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();

        $courseMedia = DB::table('course_media')->get()->toArray();
        $users = DB::table('users')->get()->toArray();


        for($i = 0; $i < 50; $i++) {
            DB::table('comments')->insert([
                'cm_id' => $courseMedia[rand(0, count($courseMedia) - 1)]->cm_id,
                'uid' => $users[rand(0, count($users) - 1)]->id,
                'comment' => $this->faker->text(rand(15, 55)),
                'created_at' => now(),
            ]);
        }
    }
}
