const db = require("../config/db");
const QRCode = require("qrcode");

const generateQr = async (req, res) => {
  try {
    const bioData = req.body;
    const qrCode = await QRCode.toDataURL(JSON.stringify(bioData));

    const {
      name, age, email, phone, role, address, qualification,
      skills, tools, description, others,
      projects, experience, education
    } = bioData;

const userId = 1;

  const sql = `
  INSERT INTO bios
  (name, age, email, phone, role, address, qualification, skills, tools, description, others, projects, experience, education)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(sql, [
      name, age, email, phone, role, address, qualification,
      skills, tools, description, others,
      JSON.stringify(projects),
      JSON.stringify(experience),
      JSON.stringify(education)
    ], (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ error: "Failed to save bio to DB" });
      }

      res.status(200).json({ qrCode, bio: bioData });
    });

  } catch (error) {
    console.error("QR generation failed:", error);
    res.status(500).json({ error: "QR generation failed" });
  }
};

module.exports = { generateQr };
