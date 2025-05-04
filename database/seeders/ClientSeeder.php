<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('clients')->insert(
            [
                [
                    'name' => "Joao Silva",
                    'genre' => "M",
                    'birth' => "1990-01-01",
                    'cpf' => "123.456.789-00",
                    'city_id' => 1
                ],
                [
                    'name' => "Maria Oliveira",
                    'genre' => "F",
                    'birth' => "1995-05-05",
                    'cpf' => "987.654.321-00",
                    'city_id' => 2
                ],
                [
                    'name' => "Carlos Pereira",
                    'genre' => "M",
                    'birth' => "1988-08-08",
                    'cpf' => "456.789.123-00",
                    'city_id' => 3
                ],
                [
                    'name' => "Ana Costa",
                    'genre' => "F",
                    'birth' => "1992-02-02",
                    'cpf' => "321.654.987-00",
                    'city_id' => 4
                ]
            ]
        );
    }
}
