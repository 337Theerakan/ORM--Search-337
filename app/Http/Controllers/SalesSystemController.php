<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Log;

class SalesSystemController extends Controller
{
    public function index()
    {
        Log::debug('Sales System index is called.');

        $customers = Customer::all();
        $products = Product::all();
        $orders = Order::with('orderDetails.product')->get();

        $customerOrderCount = $customers->map(function ($customer) {
            return [
                'customer_id' => $customer->id,
                'name' => $customer->name,
                'order_count' => $customer->orders()->count(),
            ];
        });

        Log::debug('Data being sent to Inertia:', [
            'customers_count' => $customers->count(),
            'products_count' => $products->count(),
            'orders_count' => $orders->count(),
            'customerOrderCount' => $customerOrderCount->toArray(),
        ]);

        return Inertia::render('SalesSystem/Index', [
            'customers' => $customers,
            'products' => $products,
            'orders' => $orders,
            'customerOrderCount' => $customerOrderCount,
        ]);
    }
}

