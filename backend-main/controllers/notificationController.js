const Notification =
  require(
    "../models/notificationModel"
  );

async function getNotifications(
  req,
  res
) {

  try {

    const notifications =
      await Notification.find({

        recipient:
          req.params.userId

      })

      .populate(
        "sender"
      )

      .sort({
        createdAt: -1
      });

    res.json(
      notifications
    );

  } catch (err) {

    res.status(500).json({
      error:
        err.message
    });

  }

}

module.exports = {
  getNotifications
};