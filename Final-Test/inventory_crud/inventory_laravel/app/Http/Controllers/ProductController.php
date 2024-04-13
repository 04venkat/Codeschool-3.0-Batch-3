<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    public function index()
    {
        $user_id = Auth::id();
        $products = Product::where('user_id', $user_id)->orderBy('id')->get();

        return response()->json([
            'status' => true,
            'message' => 'Product recieved successfully',
            'product' => $products
        ], 200);
    }

    public function show(string $id)
    {
        //
    }

    public function store(Request $request)
    {
        $user_id = Auth::id();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'quantity' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $insertIntoProducts = new Product([
            'name' => $request->name,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'user_id' => $user_id
        ]);

        $insertIntoProducts->save();

        return response()->json([
            'status' => true,
            'message' => 'Product added successfully',
            'product' => $insertIntoProducts
        ], 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'quantity' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $product = Product::findOrFail($request->id);
        $product->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully',
            'product' => $product
        ], 200);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found',
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully',
        ], 204);
    }
}
