const Photo = require("../models/photoModel");

const asyncHandler = require("express-async-handler");

const getPhotos = asyncHandler(async (req, res) => {
  /* Finding all the photos that belong to the user. */
  const photos = await Photo.find({ user: req.user._id });
  res.status(200).json(photos);
});

const uploadPhoto = asyncHandler(async (req, res) => {
  const { photoName, photoUrl } = req.body;

  /* This is a validation check to make sure that the user has entered all the details. */
  if (!photoName || !photoUrl || !req.user._id) {
    res.status(400).json("Please enter Photo details");
  }

  /* This is a random code generator. */
  const code = Math.random().toString(36).substring(2, 8);

  /* This is creating a new photo and saving it to the database. */
  const photo = await Photo.create({
    user: req.user._id,
    photoName,
    photoUrl,
    uniqueDigit: code,
  });

  /* This is sending the photo back to the front end. */
  res.status(200).json(photo);
});

const deletePhoto = asyncHandler(async (req, res) => {
  /* This is finding the photo by the id. */
  const photo = await Photo.findById(req.params.id);

  /* This is a validation check to make sure that the user is the owner of the photo. */
  if (photo && photo.user.toString() === req.user._id.toString()) {
    /* Removing the photo from the database. */
    await photo.remove();
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(404).json("Not Authorized");
  }
});

module.exports = {
  getPhotos,
  uploadPhoto,
  deletePhoto,
};
