const express = require("express");

const db = require("./db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  // res.send('hello from /api/posts/')
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving post" });
  }
});

router.post("/", async (req, res) => {
  console.log("POST CL", req.body);
  const newPost = req.body;
  if (newPost.title !== "" && newPost.contents !== "") {
    try {
      console.log(newPost);
      const posted = await db.insert(newPost);
      res.status(201).json(posted);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error adding the post"
      });
    }
  }
  res.status(400).json({
    message: "please fill out title and contents inputs"
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "it is finished" });
    } else {
      res.status(404).json({ message: "target could not be found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mssage: "error ocurred when trying to delete post" });
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.title !== "" && req.body.contents !== "") {
    try {
      const updated = await db.update(req.params.id, req.body);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "this post was not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error updating post" });
    }
  } else {
    res.status(400).json({
      message: "please fill out title and contents inputs"
    });
  }
});

module.exports = router;
