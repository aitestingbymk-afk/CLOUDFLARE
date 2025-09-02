export async function sendOrderToTelegram(order) {
  const token = "8497281403:AAH2vccXXAD05d7U7lj0GoV9_xjUouDyy58";
  const chatId = 5535676926;

  const itemsMessage = order.items.map(item => `${item.name} × ${item.quantity} – ₹${item.price * item.quantity}`).join("\n");

  const totalMessage = `
Order ID: ${order.orderId}
Time: ${order.timestamp}

Items:
${itemsMessage}

Subtotal: ₹${order.total.subtotal}
Tax: ₹${order.total.tax}
Delivery: ₹${order.total.delivery}
Total: ₹${order.total.total}
`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: totalMessage })
  });
}
