const router = require("express").Router();
const {subgreddiit} = require("../models/subgreddit")
router.post("/", async (req,res) => {
    try {
        // const subgred = await subgreddiit.findOne({subredditName: req.body.name})
        // if(subgred)
        //     return res
        //         .status(409)
        //         .send({ message: "Subgreddiit with given name already Exists!" });
        await new subgreddiit({
            description: req.body.description,
            subredditName: req.body.name,
            posts: [],
            followedBy: [],
            followerCount: 1,
        }).save();
        res.status(201).send({message: "Subgreddiit created successfully!"});
    }
    catch (error) {
		res.status(500).send({ message: `${error}` });
	}
});

module.exports = router