import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let details = [];
let newid = 1;
//CREATING AND STORING
app.post('/details', (req, res) => {
  const { name, age } = req.body;
  const curr_details = {
    id: newid++,
    name,
    age,
  };
  details.push(curr_details);
  res.status(201).send(curr_details);
});
//FOR RETRIEVING
app.get('/details', (req, res) => {
  res.status(200).send(details);
});
//FOR RETRIEVING USING ID
app.get('/details/:id',(req,res)=>{
    
    const id=details.find(t=>  t.id === parseInt(req.params.id))
    if(!id)
        return res.status(404).send("Not found");
    else
    return res.status(200).send(id);
})
//FOR UPDATING
app.put('/details/:id',(req,res)=>{
    const curr_details=details.find(t=>  t.id === parseInt(req.params.id))
    if(!curr_details)
        res.status(404).send("Not found");
    const { name, age } = req.body;
     curr_details.name=name;
     curr_details.age=age;
     res.status(200).send(curr_details);
})

//DELETE
app.delete('/details:/id',(req,res)=>{
    const curr_details=details.findIndex(t=>  t.id === parseInt(req.params.id))
    if(!curr_details)
       return res.status(404).send("Not found");
    else{
       details.splice(curr_details,1);
       return res.status(201).send("Deleted");
    }
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
