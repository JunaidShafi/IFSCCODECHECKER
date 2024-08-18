import express, {response} from "express";
import ifsc from "ifsc";
import bodyParser from "body-parser";
// import ejs from "ejs";



const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})
app.post("/check", async (req, res) => {
    console.log(req.body)
    const result =  await ifsc.validate(req.body.ifsc);
    console.log(result);
    if (result) {
        const data =await  ifsc.fetchDetails(req.body.ifsc)
            .then((response)=>{
                console.log(response)
                res.render("index.ejs",{ details:response})
            })


        }
    else{
        res.send("Not a valid Bank");
    }

})
app.get("/return", (req, res) => {
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})

