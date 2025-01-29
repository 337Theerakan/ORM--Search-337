import React, { useEffect, useMemo } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// สร้างหน้า SalesSystemPage โดยรับข้อมูล customers, products, orders, customerOrderCount มาแสดงผล
export default function SalesSystemPage({ customers, products, orders, customerOrderCount }) {
  useEffect(() => {
   // แสดงข้อมูลที่ได้รับเมื่อ Component ถูก Mount โดยแสดงข้อมูล customers, products, orders, customerOrderCount
    console.log("Component mounted")
    console.log("Customers:", customers)
    console.log("Products:", products)
    console.log("Orders:", orders)
    console.log("Customer Order Count:", customerOrderCount)
  }
  , [customers, products, orders, customerOrderCount])

  //หน้าที่แสดงข้อมูลลูกค้า สินค้า และการสั่งซื้อ โดยแสดงข้อมูลลูกค้าทั้งหมด สินค้าทั้งหมด และการสั่งซื้อทั้งหมด
  if (!customers || !products || !orders || !customerOrderCount) {
    console.log("Data is not available")
    return <div className="text-center text-gray-600 p-4">Loading...</div>
  }

  // คำนวณยอดรวมการสั่งซื้อของลูกค้าแต่ละคน
  const customerPurchaseSummary = useMemo(() => {
    return customers.map((customer) => {
      const customerOrders = orders.filter((order) => order.customer_id === customer.id)
      // ปัดเศษและแปลงเป็นจำนวนเต็ม
      const totalSpent = Math.round(customerOrders.reduce((sum, order) => sum + Number(order.total_price), 0))

      // สร้างข้อมูลสำหรับแสดงในตาราง โดยแสดง ID ชื่อ จำนวนการสั่งซื้อ และยอดรวมเงินที่ลูกค้าสั่งซื้อ
      return {
        id: customer.id,
        name: customer.name,
        orderCount: customerOrders.length,
        totalSpent,
      }
    })
  }, [customers, orders])

  // ข้อมูลสำหรับแสดงในกราฟ โดยแสดงจำนวนการสั่งซื้อและยอดรวมเงินที่ลูกค้าสั่งซื้อ

  const chartData = {
    labels: customerPurchaseSummary.map((customer) => customer.name),
    datasets: [
      {
        //
        label: "จำนวนการสั่งซื้อ",
        // ข้อมูลจำนวนการสั่งซื้อของลูกค้าแต่ละคน โดยใช้ข้อมูลจาก customerPurchaseSummary
        data: customerPurchaseSummary.map((customer) => customer.orderCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        // ความหนาของเส้นกราฟ 1 พิกเซล
        borderWidth: 1,
        yAxisID: 'y',  // ใช้แกน Y ด้านซ้าย
      },
      {
        label: "จำนวนเงิน($)",
        data: customerPurchaseSummary.map((customer) => customer.totalSpent),
        backgroundColor: "rgba(255, 159, 64, 0.2)",  // สีส้ม
        borderColor: "rgba(255, 159, 64, 1)",
        // ความหนาของเส้นกราฟ 1 พิกเซล
        borderWidth: 1,
        yAxisID: 'y1',  // ใช้แกน Y ด้านขวา
      }
    ],
  };

// ตั้งค่าของกราฟ ให้แสดงข้อมูลในแกน Y ด้านซ้ายเป็นจำนวนการสั่งซื้อ และแกน Y ด้านขวาเป็นยอดรวมเงินที่ลูกค้าสั่งซื้อ
  const chartOptions = {
    // ตั้งค่าให้กราฟเป็น responsive ให้สามารถปรับขนาดตามขนาดหน้าจอ
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        ticks: {
          stepSize: 1,
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: {
          drawOnChartArea: false, // ป้องกันเส้นกริดทับกัน
        },
      },
    },
  };


  // ฟังก์ชันสำหรับจัดรูปแบบตัวเลขให้มีคอมม่า
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-600">Sales System</h1>

      {/* กราฟ */}
      <h2 className="text-xl font-semibold mb-2">Orders per Customer</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }}
        />
      </div>

      {/* ตารางสรุปยอดการซื้อของลูกค้า */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Customer Purchase Summary</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Customer ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Total Orders</th>
              <th className="border border-gray-300 px-4 py-2">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customerPurchaseSummary.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{customer.id}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{customer.orderCount}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">${formatNumber(customer.totalSpent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ตารางลูกค้า */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Customers ({customers.length})</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{customer.id}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

