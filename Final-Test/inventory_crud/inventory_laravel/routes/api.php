<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

Route::post('sign-in', [UserController::class, 'signIn']);
Route::post('sign-up', [UserController::class, 'signUp']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('store', [ProductController::class, 'store']);
    Route::get('fetch', [ProductController::class, 'index']);
    Route::put('update', [ProductController::class, 'update']);
    Route::delete('delete/{id}', [ProductController::class, 'destroy']);
});


