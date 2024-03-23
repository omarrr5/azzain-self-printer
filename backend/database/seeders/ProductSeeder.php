<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Product::create([
            'name' => 'A4 paper',
            'price' => 0.15,
            'color' => 'b&w',
            'quantity' => '300'
        ]);

        Product::create([
            'name' => 'A4 paper',
            'price' => 0.30,
            'color' => 'color',
            'quantity' => '400'
        ]);
    }
}
