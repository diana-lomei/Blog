const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

function pluralize(value, words) {
  value = Math.abs(value);
  if (value % 10 === 1 && value % 100 !== 11) return words[0];
  if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) return words[1];
  return words[2];
}

function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval;

  interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} ${pluralize(interval, ['рік', 'роки', 'років'])} тому`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} ${pluralize(interval, ['місяць', 'місяці', 'місяців'])} тому`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} ${pluralize(interval, ['день', 'дні', 'днів'])} тому`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} ${pluralize(interval, ['годину', 'години', 'годин'])} тому`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} ${pluralize(interval, ['хвилину', 'хвилини', 'хвилин'])} тому`;

  return "щойно";
}


app.get('/', (req, res) => {
  res.render("home", { posts, timeAgo });
});

app.get('/new', (req, res) => {
  res.render("new");
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content, timestamp: new Date() });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = posts[id];
  res.render("edit", { post, id });
});

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  posts[id] = {
    title: req.body.title,
    content: req.body.content,
    timestamp: posts[id].timestamp 
  };
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
