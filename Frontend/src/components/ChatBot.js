import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Stack, Box, Typography, IconButton, FormControl, OutlinedInput, CircularProgress, Paper, Avatar } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import RobotIcon from '@mui/icons-material/Android';
import UserIcon from '@mui/icons-material/Person';
import confetti from 'canvas-confetti';
import TypeWriter from 'typewriter-effect';

const messageType = {
  answer: 'answer',
  question: 'question'
};

const ChatBot = () => {
 // Rastgele kullanıcı IDsi olusturdum dokümanda giriş paneli şartı olmadğı için. Burda random id olusturup istek atarken onu yolluyorum.
  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  };

  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstMessageTyping, setIsFirstMessageTyping] = useState(false);
  const [userId, setUserId] = useState(generateUserId()); // Rastgele kullanıcı ID'si oluşturma

  const startSession = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/start', { userId });
      setMessages([{ type: messageType.answer, content: response.data.question }]);
      setIsFirstMessageTyping(true);
    } catch (error) {
      console.error('Session could not be started:', error);
    }
  };

  useEffect(() => {
    startSession();
  }, [userId]); // userId değiştiğinde oturumu başlat

  const getAnswer = async () => {
    if (onRequest || isTyping) return;

    const newMessages = [...messages, {
      type: messageType.question,
      content: question
    }];

    setMessages(newMessages);
    setQuestion('');
    setOnRequest(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/answer', { userId, answer: question });

      const updatedMessages = [...newMessages, {
        type: messageType.answer,
        content: data.message || data.question,
      }];

      setMessages(updatedMessages);
      setOnRequest(false);
      setIsTyping(true);

      if (data.message === 'All questions answered. Thank you!') {
        setIsSessionEnded(true);
        triggerConfetti();
      }
    } catch (err) {
      console.error('Answer could not be sent:', err);
      setOnRequest(false);
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && !isSessionEnded && !isTyping) getAnswer();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setIsSessionEnded(true);
    }, 500);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatWrapperRef.current) {
        chatWrapperRef.current.scroll({
          top: chatWrapperRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };
    scrollToBottom();
  }, [messages]);

  return (
    <Stack alignItems="center" justifyContent="space-between" sx={{ height: '100%' }}>
      <Box sx={{ width: '100%', height: '60px', bgcolor: '#000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, zIndex: 1000 }}>
        <Typography variant="h6">BOLT ChatBot</Typography>
      </Box>

      <Box ref={chatWrapperRef} sx={{ height: 'calc(100% - 150px)', width: '100%', position: 'fixed', zIndex: 1, overflowY: 'auto', paddingTop: '60px', paddingBottom: '110px', bgcolor: '#f0f0f0' }}>
        <Stack sx={{ width: '100%', maxWidth: 'md', margin: '0 auto', padding: 2 }}>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.type === messageType.question ? 'flex-end' : 'flex-start',
                marginY: 1
              }}
            >
              <Paper
                sx={{
                  padding: 2,
                  bgcolor: message.type === messageType.answer ? '#2f2f2f' : '#888888',
                  color: '#fff',
                  borderRadius: '20px',
                  maxWidth: '75%',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                  alignSelf: message.type === messageType.answer ? 'flex-start' : 'flex-end',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: message.type === messageType.answer ? '#1976d2' : '#ff9800' }}>
                    {message.type === messageType.answer ? <RobotIcon /> : <UserIcon />}
                  </Avatar>
                  {index === 0 && isFirstMessageTyping ? (
                    <TypeWriter
                      onInit={(writer) => {
                        writer.typeString(message.content)
                          .callFunction(() => {
                            setIsFirstMessageTyping(false);
                          })
                          .start();
                      }}
                      options={{
                        delay: 40
                      }}
                    />
                  ) : index === messages.length - 1 && message.type === messageType.answer && onRequest ? (
                    <CircularProgress size="1.5rem" sx={{ color: 'white' }} />
                  ) : index === messages.length - 1 && message.type === messageType.answer ? (
                    <TypeWriter
                      onInit={(writer) => {
                        writer.typeString(message.content)
                          .callFunction(() => {
                            setIsTyping(false);
                          })
                          .start();
                      }}
                      options={{
                        delay: 40
                      }}
                    />
                  ) : (
                    <Typography>{message.content}</Typography>
                  )}
                </Stack>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Box>

      {!isSessionEnded && (
        <Stack sx={{ width: '100%', position: 'fixed', bottom: 0, bgcolor: '#000', zIndex: 1000, borderTop: '1px solid #333', padding: 2, justifyContent: 'center', alignItems: 'center' }}>
          <FormControl fullWidth variant="outlined" sx={{ maxWidth: '600px' }}>
            <OutlinedInput
              inputRef={inputRef}
              sx={{
                bgcolor: '#424242',
                borderRadius: '25px',
                padding: '10px 15px',
                paddingRight: '50px',
                borderColor: 'transparent',
                color: 'white',
                height: 'auto',
                minHeight: '56px',
                maxHeight: '150px',
                overflowY: 'auto',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black'
                }
              }}
              multiline
              endAdornment={
                onRequest || isTyping || isFirstMessageTyping ? (
                  <CircularProgress size="1.5rem" sx={{ color: 'white', position: 'absolute', right: '10px' }} />
                ) : (
                  <IconButton onClick={getAnswer} disabled={onRequest || isTyping || isFirstMessageTyping || !question.trim()}>
                    <SendOutlinedIcon sx={{ color: question.trim() ? 'white' : 'grey' }} />
                  </IconButton>
                )
              }
              disabled={onRequest || isTyping || isFirstMessageTyping}
              onKeyUp={onEnterPress}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>
        </Stack>
      )}
    </Stack>
  );
};

export default ChatBot;
