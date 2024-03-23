<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json(['products' => $products]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'color' => 'required|string',
            'quantity' => 'required|string'
        ]);

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'color' => $request->color,
            'quantity' => $request->quantity
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

}
