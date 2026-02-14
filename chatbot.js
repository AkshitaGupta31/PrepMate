app.post('/api/chatbot', async (req, res) => {
  const { userMessage } = req.body;

  try {
    console.log("🤖 User asked:", userMessage);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for peer interview preparation. Answer clearly and helpfully."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    const botReply = completion.choices[0].message.content;
    console.log("🤖 Bot reply:", botReply);

    res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ Error in chatbot route:", error);
    res.status(500).json({
      error: error.message,
      details: error
    });
  }
});
