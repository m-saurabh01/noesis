import axios from 'axios';
import express from 'express';
import bodyParser from "body-parser";

const port = 8080;
const app = express();
app.use(express.static("views"));

const url = 'https://philosophyapi.pythonanywhere.com/api/philosophers/';

// axios.get(url).then(data => data.data).then(res => console.log(res));

app.get('/',async (req, res) => {
    const results = await axios.get(url).then(data => data.data);

    
    const result = results.results;
        const rand = getIdx(result.length);
        const dat = result[rand];
        const philosopher = dat.name;
        const photourl = dat.photo;
    let random = getIdx(dat.ideas?.length);
    
    while (dat?.ideas[random].length > 200) {
        random = getIdx(dat.ideas?.length);
    }

        const quote = dat?.ideas[random];
        const json= { philosopher: philosopher, photo: photourl, quote: quote }
        res.render('index.ejs', {data:json});
})


app.get('/', (req, res) => {
    res.render('index.ejs');
});

const getIdx=function(num){
    let idx = Math.floor(Math.random() * num);
    return idx;
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});