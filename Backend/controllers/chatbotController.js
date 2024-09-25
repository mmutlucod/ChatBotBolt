const Response = require('../models/Response');
const Session = require('../models/Session');

const questions = [
  "What is your favorite breed of cat, and why?",
  "How do you think cats communicate with their owners?",
  "Have you ever owned a cat? If so, what was their name and personality like?",
  "Why do you think cats love to sleep in small, cozy places?",
  "What’s the funniest or strangest behavior you’ve ever seen a cat do?",
  "Do you prefer cats or kittens, and what’s the reason for your preference?",
  "Why do you think cats are known for being independent animals?",
  "How do you think cats manage to land on their feet when they fall?",
  "What’s your favorite fact or myth about cats?",
  "How would you describe the relationship between humans and cats in three words?"
];


exports.getOrCreateSession = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID gerekli' });

    let session = await Session.findOne({ userId });
    if (!session) {
      session = new Session({ userId, currentQuestionIndex: 0 });
      await session.save();
    }

    const currentQuestion = questions[session.currentQuestionIndex];
    res.status(200).json({ question: currentQuestion, sessionId: session._id });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

exports.saveAnswerAndNextQuestion = async (req, res) => {
  try {
    const { userId, answer } = req.body;  

  
    let session = await Session.findOne({ userId });

   
    if (!session) {
      return res.status(400).json({ message: 'Geçerli bir oturum bulunamadı' });
    }

   
    const currentQuestion = questions[session.currentQuestionIndex];

   
    const newResponse = new Response({
      userId,
      question: currentQuestion,
      answer
    });

    await newResponse.save();

   
    session.currentQuestionIndex += 1;

   
    if (session.currentQuestionIndex >= questions.length) {
      session.endedAt = Date.now(); // Oturumun bittiği zamanı kaydet
      await session.save(); // Oturumu güncelle
      await Session.deleteOne({ _id: session._id });
      return res.status(200).json({ message: 'All questions answered. Thank you!' });
    }
    


    await session.save();

  
    const nextQuestion = questions[session.currentQuestionIndex];
res.status(200).json({ question: nextQuestion, endedAt: session.endedAt });


  } catch (error) {
    console.log('Hata oluştu:', error);  
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

