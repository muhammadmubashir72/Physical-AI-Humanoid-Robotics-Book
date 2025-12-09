# Physical AI & Humanoid Robotics - Start Learning

<div align="center">
  <img src="https://img.icons8.com/color/48/000000/artificial-intelligence.png" alt="AI Icon"/>
  <h3>The Future of AI is Physical</h3>

  [Get Started](#getting-started) • [View Course](https://github.com/panaversity/physical-ai-humanoid-robotics) • [Contact Us](#contact-us)
</div>

---

## 🤖 Welcome to the Future of AI Education

**Physical AI & Humanoid Robotics** is a revolutionary course that takes AI beyond screens and into the real world. Experience firsthand how artificial intelligence comes alive when combined with physical form and motion. This repository features a complete Retrieval-Augmented Generation (RAG) system with an AI chatbot that provides intelligent responses based on the textbook content.

> *"The future of work will be a partnership between people, intelligent agents (AI software), and robots."*

### Why Physical AI Matters
Humanoid robots are poised to excel in our human-centered world because they share our physical form and can be trained with abundant data from interacting in human environments. This represents a significant transition from AI models confined to digital environments to embodied intelligence that operates in physical space.

### RAG-Powered Learning
This course features an AI assistant that can answer your questions about the textbook content in real-time. Look for the 💬 chat button at the bottom-right of every page to ask questions and get intelligent responses based on the course material.

---

## 🚀 Key Features

<div align="center">

### 📚 Interactive AI-Powered Textbook
Built with Docusaurus technology, featuring personalized learning paths tailored to your background and skill level.

### 🤝 Smart RAG Chatbot
Ask questions and get intelligent responses from our AI assistant trained on the entire course content. A floating chat button appears on every page for instant access.

### 🌍 Multilingual Support
Content available in multiple languages including Urdu to make learning accessible worldwide.

### 🔧 Hands-On Labs
Practical exercises using ROS 2, Gazebo, NVIDIA Isaac, and real hardware.

</div>

---

## 📋 Course Modules

### 🧠 Module 1: The Robotic Nervous System (ROS 2)
- Master ROS 2 Nodes, Topics, and Services
- Bridge Python AI agents to robot controllers
- Work with URDF (Unified Robot Description Format)

### 🌐 Module 2: The Digital Twin (Gazebo & Unity)
- High-fidelity physics simulation
- Sensor simulation (LiDAR, cameras, IMUs)
- Immersive environment building

### 🛠️ Module 3: The AI-Robot Brain (NVIDIA Isaac™)
- Photorealistic simulation with Isaac Sim
- Hardware-accelerated perception and navigation
- Advanced path planning for bipedal movement

### 🗣️ Module 4: Vision-Language-Action (VLA)
- Voice-to-action control systems
- Natural language to robot action translation
- Capstone: Autonomous Humanoid Project

---

## 🎯 What You'll Learn

<div align="center">
<table>
  <tr>
    <td align="center"><strong>ROS 2 Mastery</strong><br>Deep understanding of robot middleware</td>
    <td align="center"><strong>Simulation Skills</strong><br>Gazebo and Unity expertise</td>
    <td align="center"><strong>AI Integration</strong><br>NVIDIA Isaac platform proficiency</td>
  </tr>
  <tr>
    <td align="center"><strong>Humanoid Kinematics</strong><br>Design for natural interaction</td>
    <td align="center"><strong>Computer Vision</strong><br>Real-world perception</td>
    <td align="center"><strong>Conversational AI</strong><br>Human-robot dialogue</td>
  </tr>
</table>
</div>

---

## 💻 Technical Requirements

<div align="center">

| Component | Requirement | Recommendation |
|-----------|-------------|----------------|
| **GPU** | RTX 4070 Ti (12GB) | RTX 3090 or 4090 (24GB) |
| **CPU** | i7 13th Gen+ / Ryzen 9 | Higher performance for complex simulations |
| **RAM** | 32GB minimum | 64GB DDR5 for optimal performance |
| **OS** | Ubuntu 22.04 LTS | Dual-boot system recommended |

</div>

> **💡 Pro Tip**: Don't have high-end hardware? Access our cloud-based "Ether Lab" option!

---

## 🚀 Getting Started

<div align="center">

### Ready to Begin Your Journey?

#### Complete RAG System Setup

**Step 1:** Clone the repository
```bash
git clone https://github.com/panaversity/physical-ai-humanoid-robotics.git
```

**Step 2:** Set up the backend API
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Step 3:** Configure environment variables
```bash
cp .env .env  # Update with your API keys
```

**Step 4:** Ingest textbook data into the vector database
```bash
python ingest_data.py
```

**Step 5:** Start the backend server
```bash
python main.py
```

**Step 6:** In a new terminal, set up the frontend
```bash
cd frontend
npm install
echo "REACT_APP_BACKEND_URL=http://localhost:8000" > .env
npm run start
```

Now you'll have the complete RAG system running with an AI chatbot available on all pages!

</div>

---

## 🏆 Developed by Panaversity

[Panaversity](https://panaversity.org) is an innovative initiative focused on teaching cutting-edge AI courses. We're at the forefront of creating AI-native technical textbooks that make advanced education accessible to everyone.

### Related Projects
- 📚 [AI Native Book](https://ai-native.panaversity.org) - Our first published work on AI agents
- 🌐 Educational platform for O/A Level, Science, Engineering and Medical AI-native books

---

## 👨‍💻 Join Our Community

This project originated from **Hackathon I: Create a Textbook for Teaching Physical AI & Humanoid Robotics Course**. Our mission is to create the next generation of AI and robotics education.

<div align="center">

### Interested in Contributing or Learning More?

[GitHub Repository](https://github.com/panaversity/physical-ai-humanoid-robotics) • [Discord Community](#) • [YouTube Tutorials](#)

</div>

---

## 📞 Contact Us

Have questions about the course or want to learn more about our programs?

- **Email**: [mubashirkhi72@gmail.com](mailto:mubashirkhi72@gmail.com)
- **Organization**: [Panaversity](https://panaversity.org)

<div align="center">

### Ready to Shape the Future of Physical AI?

[**START LEARNING NOW**](#getting-started)

*"Embodied intelligence is the next frontier of artificial intelligence"* - Join us in pioneering it today!

</div>