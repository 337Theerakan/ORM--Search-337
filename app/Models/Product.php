<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // กำหนด fields ที่สามารถเพิ่มข้อมูลได้
    protected $fillable = ['name', 'price', 'description', 'image'];

    // ความสัมพันธ์: สินค้าสามารถมีหลายรายการใน OrderDetail
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class); // Product has many OrderDetails (1 to many)
    }

    // ความสัมพันธ์: สินค้าสามารถมีหลายใบสั่งซื้อผ่าน OrderDetail
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_details');
        // Product belongs to many Orders via order_details table (many to many)
    }
}
