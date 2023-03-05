const router = require("express").Router();
const {subgreddiit} = require("../models/subgreddit")
const {posts} = require("../models/posts");
const { savedpost } = require("../models/savedpost");
router.post("/", async (req,res) => {
    try {
        // const subgred = await subgreddiit.findOne({subredditName: req.body.name})
        // if(subgred)
        //     return res
        //         .status(409)
        //         .send({ message: "Subgreddiit with given name already Exists!" });
        const newsubgreddit = await new subgreddiit({
            admin: req.body.admin,
            description: req.body.description,
            subredditName: req.body.name,
            posts: [],
            followedBy: [],
            followerCount: 1,
            bannedkeywords: req.body.bannedkeywords,
            tags: req.body.tags,
        }).save();
        res.status(201).send(newsubgreddit);
    }
    catch (error) {
        console.log(error)
		res.status(500).send({ message: `${error}` });
	}
});

router.get("/", async(req,res) => {
    try{
        const subred = await subgreddiit.find();
    res.json(subred);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/:id", async(req,res) => {
    try{
        console.log(req.params.id)
        //const subred = await subgreddiit.findById("64033571322c2b43ee0319c1")
        const subred = await subgreddiit.findById(req.params.id)
        if (!subred) {
            return res.status(404).json({ message: 'Subreddit not found' });
          }
          res.json(subred);
    }
    catch(error){
        console.log(error)
    }
});
router.post("/:id/posts", async(req,res) => {
    try{
        const subred = await subgreddiit.findById(req.params.id)
        if (!subred) {
            return res.status(404).json({ message: 'Subreddit not found' });
          }
        const subredd = await subgreddiit.findById(req.body.subreddit)
        const postt = await new posts({
            title: req.body.title,
            author: req.body.author,
            textSubmission: req.body.content,
            subreddit: subredd.subredditName
        }).save()
        console.log(postt.subreddit)
        subred.posts.push(postt)
        await subred.save()
        res.send(postt)
    }
    catch(error){
        console.log(error)
    }
})
router.get("/:id/posts", async(req,res) => {
    try{
        const subred = await subgreddiit.findById(req.params.id)
        let m = []
        for (i=0;i<subred.posts.length;i++)
        {
        const k = await posts.findById(subred.posts[i])
        m.push(k)
        }
        //console.log(m)
        res.json(m)
    }
    catch(error){
        console.log(error)
    }
})
router.delete("/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const subgred = await subgreddiit.findById(id)
        await posts.deleteMany({subreddit: subgred.subredditName})
        await savedpost.deleteMany({subreddit: subgred.subredditName})
        await subgreddiit.findByIdAndDelete(id)
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/upvote", async(req,res) => {
    try{
        const postt = await posts.findById(req.body.post)
        postt.upvotecount = postt.upvotecount + 1
        await postt.save()
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/downvote", async(req,res) => {
    try{
        const postt = await posts.findById(req.body.post)
        console.log(postt)
        postt.downvotecount = postt.downvotecount + 1
        await postt.save()
    }
    catch(error)
    {
        console.log(error)
    }
})
router.post("/comments", async(req,res) => {
    try{
        const postt = await posts.findById(req.body.post)
        console.log(req.body)
        postt.comments.push(req.body.comment)
        await postt.save()
    }
    catch(error)
    {
        console.log(error)
    }
})
// router.get("/", async(req,res) => {
//     try{
//         const subred = await subgreddiit.findOne({admin : localStorage.getItem("token")});
//         res.json(subred);
//     }
//     catch(error){
//         console.log(error)
//     }
// })
module.exports = router