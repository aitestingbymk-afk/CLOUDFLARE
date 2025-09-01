export async function sendOrderToTelegram(order) {
  const token = "8497281403:AAH2vccXXAD05d7U7lj0GoV9_xjUouDyy58";
  const chatId = "5535676926";
  const message = `New Order Received:\n\n${order.map(item => `${item.name} – ₹${item.price}`).join("\n")}\n\nTotal: ₹${order.reduce((sum, i) => sum + i.price, 0)}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });
}
