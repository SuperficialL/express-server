exports.img = async (req, res) => {
  const file = req.file;
  file.url = `/uploads/${file.filename}`;
  res.send(file);
};
