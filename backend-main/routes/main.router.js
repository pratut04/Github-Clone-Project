const express =
  require("express");

const userRouter =
  require("./user.router");

const repoRouter =
  require("./repo.router");

const issueRouter =
  require("./issue.router");

const notificationRouter =
  require(
    "./notification.router"
  );

const authRouter =
  require("./auth.router");

const mainRouter =
  express.Router();

mainRouter.use(
  "/auth",
  authRouter
);

mainRouter.get(
  "/follow-test",
  (req, res) => {
    res.send("working");
  }
);
mainRouter.use(
  notificationRouter
);
mainRouter.use(userRouter);

mainRouter.use(repoRouter);

mainRouter.use(issueRouter);

mainRouter.get(
  "/",
  (req, res) => {

    res.send(
      "GitHub Clone API"
    );

  }
);

module.exports =
  mainRouter;