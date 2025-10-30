const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();

const pusher = new Pusher({
  appId: '2070983',
  key: '6e3435d4a0677bd5dda3',
  secret: 'de4baf66b0b31138d335',
  cluster: 'us2',
  useTLS: true
});

app.use(bodyParser.json());
app.use(express.static(__dirname)); // serves index.html

app.post('/message', (req, res) => {
  const { username, message } = req.body;
  pusher.trigger('chat-channel', 'new-message', {
    username,
    message,
    timestamp: new Date().toISOString()
  });
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
