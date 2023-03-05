const router = require("express").Router();
const {subgreddiit} = require("../models/subgreddit")
const {posts} = require("../models/posts")
const {savedpost} = require("../models/savedpost")

router.post("/", async(req,res) => {
    try{
    const savedpostt = await new savedpost({
        post: req.body.post,
        user: req.body.name,
    }).save()
    console.log(savedpostt.post)
    const postt = await posts.findById(savedpostt.post)
    console.log(postt.title)
    console.log(postt.isSaved)
    postt.isSaved = true
    console.log(postt)
    await postt.save()
    res.status(201).send(savedpostt)
}
catch(error)
{
    //console.log(error)
}

})
router.get("/", async(req,res) => {
    try{
        const savedposts = await posts.find({isSaved: true})
        // for(i=0;i<savedposts.length;i++)
        // {
        //     console.log(savedposts[i])
        // }
        res.json(savedposts)
    }
    catch(error)
    {
        console.log(error)
    }
})
router.delete("/:id", async(req,res) => {
    try{
        const postid = req.params.id
        console.log(req.params.id)
        // const postt = await savedpost.findById(postid)
        const posttt = await posts.findById(postid)
        console.log(posttt)
        // await posts.findOne({title: postt.title, textSubmission: postt.textSubmission }).save()
        posttt.isSaved = false
        await posttt.save()
    }
    catch(error)
    {
        console.log(error)
    }
})
module.exports = router