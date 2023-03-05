const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		//console.log(error)
		res.status(500).send({ message: `${error}` });
	}
});
router.get("/", async(req, res) => {
	try {
		const userr = await User.findOne({ email: req.body.email});
		res.json(userr);

	}
	catch(error) {
		console.log(error)
	}
})
// router.post("/savedposts", async(req,res) => {
// 	try{
// 		const userr = await User.findOne({email: req.body.email})
// 		let flag=0
// 		for(i=0;i<userr.savedPosts.length;i++)
// 		{
// 			if(userr.savedPosts[i] === req.body.post)
// 			{
// 				flag=1
// 				break
// 			}
// 		}
// 		if(flag==0)
// 		{
// 		userr.savedPosts.push(req.body.post)
// 		}
// 		await userr.save()
// 		res.json(req.body.post)

// 	}
// 	catch(error)
// 	{
// 		console.log(error)
// 	}
// })
// router.get("/savedposts", async(req,res) => {
// 	try{
// 		const userr = await User.findById(id)
// 		res.json(userr.savedPosts)
// 	}
// })
module.exports = router;
