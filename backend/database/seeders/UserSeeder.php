<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    protected $faker;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();
        for($i = 0; $i < 30; $i++) {
            $name = $this->faker->firstName;
            $lastname = $this->faker->lastName;
            DB::table('users')->insert([
                'name' => $name . ' ' . $lastname,
                'email' => strtolower($lastname) . rand(1, 9999) . '@gmail.com',
                'password' => Hash::make('password'),
                'username' => strtolower(substr($name, 0, 3)) . strtolower(substr($lastname, 0, 3)) . rand(1, 999),
                'role' => rand(1, 3),
            ]);
        }
    }
}
