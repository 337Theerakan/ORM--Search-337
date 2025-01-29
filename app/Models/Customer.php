<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    // กำหนด fields ที่สามารถเพิ่มข้อมูลได้
    protected $fillable = ['name', 'email', 'phone', 'address'];

    // ความสัมพันธ์: ลูกค้าสามารถมีหลายใบสั่งซื้อ
    public function orders()
    {
        return $this->hasMany(Order::class);
         // กำหนดความสัมพันธ์กับตาราง orders โดยมีคีย์เชื่อมระหว่าง customers.id กับ orders.customer_id
    }
}
