<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ResponsibleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('responsibles')->insert([
            [
                'name' => "Jefferson Santos",
                'phone' => "+55 11 91278-5678",
                'email' => Str::random(10) . "@example.com",
                'city_id' => 1
            ],
            [
                'name' => "Joana Lima",
                'phone' => "+55 11 91269-5678",
                'email' => Str::random(10) . "@example.com",
                'city_id' => 2
            ],
            [
                'name' => "Daniel Almeida",
                'phone' => "+55 11 91234-5678",
                'email' => Str::random(10) . "@example.com",
                'city_id' => 3
            ],
            [
                'name' => "Jessica Martins",
                'phone' => "+55 11 94534-5678",
                'email' => Str::random(10) . "@example.com",
                'city_id' => 4
            ]
        ]);
        
    }
}
