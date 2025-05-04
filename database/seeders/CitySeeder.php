<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cities')->insert([
            [
                'name' => "Sao Paulo",
                'state' => "SP",
            ],
            [
                'name' => "Sao Jose dos Campos",
                'state' => "SP",
            ],
            [
                'name' => "Rio de Janeiro",
                'state' => "RJ",
            ],
            [
                'name' => "Belo Horizonte",
                'state' => "MG",
            ],
            [
                'name' => "Curitiba",
                'state' => "PR",
            ],
            [
                'name' => "Salvador",
                'state' => "BA",
            ],
            [
                'name' => "Fortaleza",
                'state' => "CE",
            ],
            [
                'name' => "Recife",
                'state' => "PE",
            ]
        ]);
    }
}
