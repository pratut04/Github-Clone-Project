const bcrypt =
  require("bcryptjs");

const User =
  require("../models/userModel");

const generateToken =
  require("../utils/generateToken");

const Notification =
  require(
    "../models/notificationModel"
  );



async function toggleFollow(
  req,
  res
) {

  try {

    const targetUserId =
      req.params.id;

    const { userId } =
      req.body;

    if (
      targetUserId === userId
    ) {

      return res.status(400).json({
        message:
          "You cannot follow yourself"
      });

    }

    const currentUser =
      await User.findById(userId);

    const targetUser =
      await User.findById(
        targetUserId
      );

    if (
      !currentUser ||
      !targetUser
    ) {

      return res.status(404).json({
        message:
          "User not found"
      });

    }

    const alreadyFollowing =
      currentUser.following.includes(
        targetUserId
      );

    if (alreadyFollowing) {

      currentUser.following.pull(
        targetUserId
      );

      targetUser.followers.pull(
        userId
      );

    } else {

      currentUser.following.push(
        targetUserId
      );

      targetUser.followers.push(
        userId
      );

      if (
        String(targetUserId) !==
        String(userId)
      ) {
        console.log(
          "FOLLOW NOTIFICATION",
          {
            recipient: targetUserId,
            sender: userId
          }
        );
        await Notification.create({

          recipient:
            targetUserId,

          sender:
            userId,

          message:
            "started following you"

        });
        console.log(
          "NOTIFICATION SAVED"
        );

      }

    }

    await currentUser.save();

    await targetUser.save();

    res.json({

      following:
        !alreadyFollowing,

      followers:
        targetUser.followers.length

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

}


const signup =
  async (req, res) => {

    try {

      const {
        username,
        email,
        password
      } = req.body;

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res
          .status(400)
          .json({
            message:
              "User exists"
          });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({

          username,

          email,

          password:
            hashedPassword

        });

      res.status(201)
        .json({

          token:
            generateToken(
              user._id
            ),

          userId:
            user._id

        });

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message
        });

    }

  };

const login =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res
          .status(400)
          .json({
            message:
              "Invalid credentials"
          });

      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res
          .status(400)
          .json({
            message:
              "Invalid credentials"
          });

      }

      res.json({

        token:
          generateToken(
            user._id
          ),

        userId:
          user._id

      });

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message
        });

    }

  };
module.exports = {

  signup,

  login,

  toggleFollow

};