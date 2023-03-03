const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const Color = require("../models/Color");
const requiredUserId = require("../helpers/requiredUserId");
const validateBodyColor = require("../helpers/validateBodyColor");
const validateBodyColorId = require("../helpers/validateBodyColorId");
const validateParamUserId = require("../helpers/validateParamUserId");
const validateQueryWhatIsColor = require("../helpers/validateQueryWhatIsColor");
const validateQueryLanguage = require("../helpers/validateQueryLanguage");

router.get("/list", 
  requiredUserId, 
  async (req, res)=> {
  const userId = req.session.userId;
  const colors = await Color.find({user: userId});
  res.json({colors, userId});
});

router.post("/add", 
  requiredUserId,
  validateBodyColor,
  async (req, res)=> {
  const userId = req.session.userId;
  const color = await Color.create({
    ...req.body.color, user: userId});
  res.json({added: true, color});
});

router.post("/delete", 
  requiredUserId,
  validateBodyColorId,
  async (req, res)=> {
  const colorId = req.body.colorId;
  const userId = req.session.userId;
  await Color.deleteOne({_id: colorId, user: userId});
  res.json({deleted: true});
});

router.get("/apiData", 
  requiredUserId,
  async (req, res)=> {
  const userId = req.session.userId;
  const apiData = {url: `http://${req.get("host")}/color/${userId}?whatIsColor=yourHSLcolor`};
  res.json({apiData});
});

router.get("/file", 
  requiredUserId,
  validateQueryLanguage,
  async (req, res)=> {
  const userId = req.session.userId;
  const language = req.query.language;

  const colors = (await Color.find({user: userId}))
    .map((color)=> ({name: color.name, range: color.range}));

  const filepath = ({
    "py": __dirname + "/../../public/PythonColorDetecter.py",
    "js": __dirname + "/../../public/JavascriptColorDetecter.js",
    "cpp": __dirname + "/../../public/CppColorDetecter.cpp",
    "c": __dirname + "/../../public/CColorDetecter.c",
    "java": __dirname + "/../../public/JavaColorDetecter.java",
  })[language];

  if(filepath !== null && fs.existsSync(filepath)) {
    const file = fs.readFileSync(filepath, {encoding: "utf-8"})
      .replace("colorList();", `${JSON.stringify(colors)};`);
    
    return res.setHeader(
      "Content-Disposition", 
      `attachment; filename="${path.basename(filepath)}"`
    ).end(file);
  }

  res.status(404).end("No found");
});

router.get("/:userId", 
  validateParamUserId,
  validateQueryWhatIsColor,
  async (req, res, next)=> {
  const userId = req.params.userId;
  const hslColor = req.query.whatIsColor;

  if(hslColor !== null) {
    const colors = await Color.find({user: userId});
    const results = colors.filter(({ range })=> 
      hslColor[0] >= range[0][0] && hslColor[0] <= range[1][0]);
    return res.json({results});
  }
    
  res.json({results: []});
});

module.exports = router;