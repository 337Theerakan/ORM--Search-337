<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    // กำหนด fields ที่สามารถเพิ่มข้อมูลได้
    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];

    // ความสัมพันธ์: รายการสินค้าต้องการข้อมูลจากใบสั่งซื้อ
    public function order()
    {
        return $this->belongsTo(Order::class); // OrderDetail belongs to Order (order_id)
        // กำหนดความสัมพันธ์กับตาราง orders โดยมีคีย์เชื่อมระหว่าง order_details.order_id กับ orders.id
    }

    // ความสัมพันธ์: รายการสินค้าต้องการข้อมูลจากสินค้า
    public function product()
    {
        return $this->belongsTo(Product::class); // OrderDetail belongs to Product (product_id)
        // กำหนดความสัมพันธ์กับตาราง products โดยมีคีย์เชื่อมระหว่าง order_details.product_id กับ products.id
    }
}
