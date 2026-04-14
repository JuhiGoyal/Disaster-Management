// Basic keyword-based automated help logic
const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const msg = message.toLowerCase();
    let response = "";

    if (msg.includes("report") || msg.includes("incident")) {
      response = "To report a disaster, click on 'Report Disaster' in the navigation bar. You'll need to provide details, location, and optional media.";
    } else if (msg.includes("contribute") || msg.includes("donate") || msg.includes("help")) {
      response = "You can contribute resources or funds by visiting the 'Contribute' page. Select an active disaster to see current requirements.";
    } else if (msg.includes("rescue") || msg.includes("team") || msg.includes("ngo")) {
      response = "If you are part of a rescue team or NGO, you can register your team via the 'Rescue Team Registration' link on our landing page.";
    } else if (msg.includes("contact") || msg.includes("call") || msg.includes("emergency")) {
      response = "For immediate life-threatening emergencies, call 911. You can also find key contact numbers in the 'Emergency Contacts' section of your dashboard.";
    } else if (msg.includes("hello") || msg.includes("hi")) {
      response = "Hello! I am ResQBot, your automated assistant. How can I help you today?";
    } else {
      response = "I'm not sure I understand that. Try asking about 'reporting a disaster', 'making a contribution', or 'emergency contacts'.";
    }

    res.status(200).json({
      success: true,
      data: {
        reply: response
      }
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  handleChatMessage
};
