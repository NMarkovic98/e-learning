<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path('storage/seeder_data/picture');
        $fileNameArray = scandir($path);

        $this->faker = Faker::create();

        $users = DB::table('users')->get()->toArray();

        for($i = 0; $i < 30; $i++) {
            $picture = $fileNameArray[rand(0, count($fileNameArray) - 1)];
            $newName = Str::random(40) . '.jpg';
            if(!is_file(base_path('storage/seeder_data/picture/') . $picture)) {
                continue;
            }
            Storage::disk('picture')->put($newName, file_get_contents(base_path('storage/seeder_data/picture/') . $picture));

            DB::table('courses')->insert([
                'uid' => $users[rand(0, count($users) - 1)]->id,
                'name' => $this->faker->text(25),
                'description' => $this->faker->text(35),
                'picture' => $newName,
                'created_at' => now(),
            ]);
        }
    }
}
