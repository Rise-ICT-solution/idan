
const userSchama = require("../Model/forgetIdSchama")
const WorkerSchema = require("../Model/WorkerSchema")


//meesha laga soo bandhigi doono all users id kuwaasoo ilaabay password kooda
const userGettForgetPasswords = async (req,res)=>{
  const getAllData = await userSchama.find()
  if(getAllData){
    res.send(getAllData)
  }
}



const userForgetPassword = async (req, res) => {

  try {
    const { id } = req.body;

    // 1. Haddii id aan la keenin
    if (!id) {
      // Dib ugu soo celi error JSON
      return res.json({ error: "ID ma aha mid jiro" });
    }


    // 2. Raadi worker ugu diiwaangashan ID-gan
    const worker = await WorkerSchema.findOne({ id });
    if (!worker) {
      // Haddii worker la waayo, dib ugu soo celi error
      return res.json({ error: "ID ma aha mid jiro" });
    }


    // 3. Haddii ID-gan laga helo worker db-ga
    // Waxaad sameyn kartaa wax alla wixii u jeedadaa ah, sida "waa lagu badalay ID"
    // Tusaale ahaan, samee doc cusub ama wax kale

    // Tusaale: samee codsi cusub
    const newRequest = new userSchama({
      workerId: worker.id,
    });
    await newRequest.save();

    // U dir success message
    return res.json({ message: "waa lagu badalay ID" });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Wax qalad ah ayaa dhacay. Codsiga lama gudbin." });
  }
};

module.exports = {userForgetPassword, userGettForgetPasswords}