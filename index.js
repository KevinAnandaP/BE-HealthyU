const express = require('express');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const channelRoutes = require('./routes/channelRoutes');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/channels', channelRoutes);
app.use('/habits', habitRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});