import React, { useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SalesSystemPage({ customers, products, orders, customerOrderCount }) {
  useEffect(() => {
    console.log("Component mounted")
    console.log("Customers:", customers)
    console.log("Products:", products)
    console.log("Orders:", orders)
    console.log("Customer Order Count:", customerOrderCount)
  }, [customerOrderCount]) // Added customerOrderCount to dependencies

  if (!customers || !products || !orders || !customerOrderCount) {
    console.log("Data is not available")
    return <div>Loading...</div>
  }

  const chartData = {
    labels: customerOrderCount.map((customer) => customer.name),
    datasets: [
      {
        label: "Number of Orders",
        data: customerOrderCount.map((customer) => customer.order_count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  console.log("Chart Data:", chartData)

  return (
    <div>
      <h1>Sales System</h1>

      <h2>Orders per Customer</h2>
      <Bar data={chartData} options={{ responsive: true }} />

      <h2>Customers ({customers.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Total Price</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>{order.total_price}</td>
                            <td>
                                {order.orderDetails && order.orderDetails.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orderDetails.map(detail => (
                                                <tr key={detail.id}>
                                                    <td>{detail.product.name}</td>
                                                    <td>{detail.quantity}</td>
                                                    <td>{detail.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No details available</p>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
