<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/upload', [FileUploadController::class, 'upload']);
Route::get('/uploaded-documents', [FileUploadController::class, 'getUploadedDocuments']);
Route::get('/pdf/{fileName}', function ($fileName) {
    $filePath = storage_path('app/uploads/' . $fileName);
    if (file_exists($filePath)) {
        return response()->file($filePath);
    } else {
        return response()->json(['error' => 'File not found'], 404);
    }
});
Route::delete('/uploaded-documents/{document}', [FileUploadController::class, 'deleteDocument']);
Route::delete('/uploaded-documents', [FileUploadController::class, 'deleteAllDocuments']);

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);


Route::post('/order', [OrderController::class, 'store']);