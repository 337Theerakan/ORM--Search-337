<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // กำหนด fields ที่สามารถเพิ่มข้อมูลได้
    protected $fillable = ['customer_id', 'order_date', 'status', 'total_price'];

    // ความสัมพันธ์: ใบสั่งซื้อมีลูกค้า (belongsTo)
    public function customer()
    {
        return $this->belongsTo(Customer::class); // Order belongs to one Customer
    }

    // ความสัมพันธ์: ใบสั่งซื้อมีหลายรายการสินค้า (hasMany)
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class); // Order has many OrderDetails (1 to many)
        // กำหนดความสัมพันธ์กับตาราง order_details โดยมีคีย์เชื่อมระหว่าง orders.id กับ order_details.order_id
    }
}
