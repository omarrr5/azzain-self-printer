<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;


class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'uploaded_documents' => 'required|string',
            'selected_color' => 'required|string',
            'selected_orientation' => 'required|string',
            'selected_printing_mode' => 'required|string',
            'quantity' => 'required|integer',
            'price_per_page' => 'required|numeric',
            'total_price' => 'required|numeric',
            'payment_method' => 'required|string',
            'payment_status' => 'required|string',
        ]);
    
        $order = new Order();
        $order->uploaded_documents = $request->input('uploaded_documents');
        $order->selected_color = $request->input('selected_color');
        $order->selected_orientation = $request->input('selected_orientation');
        $order->selected_printing_mode = $request->input('selected_printing_mode');
        $order->quantity = $request->input('quantity');
        $order->price_per_page = $request->input('price_per_page');
        $order->total_price = $request->input('total_price');
        $order->payment_method = $request->input('payment_method');
        $order->payment_status = $request->input('payment_status');
    
        $order->save();
    
        return response()->json(['message' => 'Order created successfully'], 201);
    }
    
}
