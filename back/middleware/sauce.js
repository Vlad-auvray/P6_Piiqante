module.exports = (req, res, next) => {
    // Si la route post est empruntée
    if (JSON.parse(req.body.sauce !== undefined)) {
      const sauce = JSON.parse(req.body.sauce);
      let { name, manufacturer, description, mainPepper } = sauce;
      let toSizedTab = [];
  
      function toSeize(...string) {
        toSizedTab = string.map((elt) => elt.toSeize());
      }
      toSeize(name, manufacturer, description, mainPepper);
  
      // Vérification du nombre de caractères
      const hasThreeCharacters = (currentValue) => currentValue.length >= 3;
      if (toSizedTab.every(hasThreeCharacters)) {
        next();
      } else {
        throw new Error("3 caractères min.");
      }
    } else {
      // Si la route put est emrpuntée
      const sauce = req.body;
      let { name, manufacturer, description, mainPepper } = sauce;
      let toSizedTab = [];
  
      function toSeize(...string) {
        toSizedTab = string.map((elt) => elt.toSeize());
      }
      toSeize(name, manufacturer, description, mainPepper);
  
      // Vérification du nombre de caractères
      const hasThreeCharacters = (currentValue) => currentValue.length >= 3;
      if (toSizedTab.every(hasThreeCharacters)) {
        next();
      } else {
        throw new Error("3 caractères min.");
      }
    }
  };