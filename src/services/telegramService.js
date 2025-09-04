export const sendOrderToTelegram = async (orderData) => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const message = `
🛵 **NEW ORDER - BudgetMein** 🛵

👤 **Customer Details:**
• Name: ${orderData.customerName || 'Not provided'}
• Phone: ${orderData.phone || 'Not provided'}
• Address: ${orderData.address || 'Not provided'}

📦 **Order Summary:**
• Total: ₹${orderData.total}
• Items: ${orderData.items.length}

🍕 **Items Ordered:**
${orderData.items.map(item => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}

⏰ **Time:** ${new Date().toLocaleString()}
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};