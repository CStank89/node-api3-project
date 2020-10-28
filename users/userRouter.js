const express = require("express");
const { reset } = require("nodemon");
const dbConfig = require("../data/dbConfig");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  userDb.insert(req.body).then((post) => {
    if (!req.body.title || !req.body.contents) {
      res
        .status(400)
        .json({ message: "Please give a title and content for your post" });
    } else {
      res.body.title && req.body.contents;
      dbConfig.insert(req.body);
      res.status(201).json(post); //201 is a create
    }
  });
});

router.post("/:id/posts", (req, res) => {
  const message = req.body;

  function isValidPost(post) {
    return Boolean(post.text && post.post_id);
  }

  if (isValidPost(post)) {
    db.intertPost(post)
      .then((post) => {
        res.status(201).json({ post });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "There was an issue with saving the post" });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please enter text and an id for each post" });
  }
});

router.get("/", (req, res) => {
  router.get("/", (req, res) => {
    userDb.get(req.query).then((post) => {
      res
        .status(200)
        .json(post)
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
    });
  });
});

router.get("/:id", (req, res) => {
  userDb.getById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
