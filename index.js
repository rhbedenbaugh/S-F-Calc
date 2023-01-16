function calculate() {
  //document input conversion
  let units = document.querySelector('#units').value;
  let toolMaterial = document.querySelector('#toolMaterial').value;
  let toolDiameter = document.querySelector('#toolDiameter').value;
  let cuttingEdges = parseInt(
    document.querySelector('#cuttingEdges').value
  );
  let workpieceMaterial =
    document.querySelector('#workpieceMaterial').value;
  let idealSFM = parseInt(document.querySelector('#idealSFM').value);
  let idealChipLoad = document.querySelector('#idealChipLoad').value;

  if (!toolDiameter || !cuttingEdges) {
    message.innerHTML = 'Enter tool diameter & cutting edges.';
    return;
  }

  let multiplier;
  if (units === 'inches') multiplier = 1;
  if (units === 'millimeters') multiplier = 25.4;
  
  let toolMaterialReducer;
  if (toolMaterial === 'highSpeedSteel') toolMaterialReducer = .5;
  if (toolMaterial === 'coatedHighSpeedSteel') toolMaterialReducer = .7;
  if (toolMaterial === 'carbide') toolMaterialReducer = 1;
  if (toolMaterial === 'coatedCarbide') toolMaterialReducer = 1.2;

  let SFM;
  if (idealSFM) {
    SFM = idealSFM;
  } else {
    if (workpieceMaterial == 'aluminumAlloys') SFM = 600;
    if (workpieceMaterial == 'brassSoftBronze') SFM = 400;
    if (workpieceMaterial == 'bronzeHighTensile') SFM = 250;
    if (workpieceMaterial == 'cooperAlloys') SFM = 350;
    if (workpieceMaterial == 'ironCastSoft') SFM = 200;
    if (workpieceMaterial == 'ironCastHard') SFM = 100;
    if (workpieceMaterial == 'ironDuctile') SFM = 80;
    if (workpieceMaterial == 'ironMalleable') SFM = 250;
    if (workpieceMaterial == 'magnesiumAlloys') SFM = 800;
    if (workpieceMaterial == 'molybdenum') SFM = 800;
    if (workpieceMaterial == 'monelHighNickelSteel') SFM = 150;
    if (workpieceMaterial == 'nickelBaseHighTempAlloys') SFM = 20;
    if (workpieceMaterial == 'plastics') SFM = 600;
    if (workpieceMaterial == 'plasticsGlassFilled') SFM = 300;
    if (workpieceMaterial == 'refractoryAlloys') SFM = 80;
    if (workpieceMaterial == 'steelLowCarbon') SFM = 250;
    if (workpieceMaterial == 'steelMediumCarbon') SFM = 100;
    if (workpieceMaterial == 'steelUpToRc35') SFM = 150;
    if (workpieceMaterial == 'steelRc35ToRc50') SFM = 80;
    if (workpieceMaterial == 'steelRc50-Rc60') SFM = 25;
    if (workpieceMaterial == 'steelMold') SFM = 200;
    if (workpieceMaterial == 'steelTool') SFM = 100;
    if (workpieceMaterial == 'stainlessSteelSoft') SFM = 250;
    if (workpieceMaterial == 'stainlessSteelHard') SFM = 50;
    if (workpieceMaterial == 'titaniumSoft') SFM = 120;
    if (workpieceMaterial == 'titaniumHard') SFM = 30;
  }
  let FPT;
  if (idealChipLoad) {
    FPT = idealChipLoad * cuttingEdges;
  } else {
    if (toolDiameter < 0.125) FPT = 0.0005;
    if (toolDiameter < 0.25) FPT = 0.001;
    if (toolDiameter < 0.4) FPT = 0.002;
    if (toolDiameter < 0.6) FPT = 0.003;
    if (toolDiameter > 0.6) FPT = 0.005;
  }

  //calculate
  let speed = parseInt(
    (SFM * 12 * multiplier * toolMaterialReducer) / (toolDiameter * Math.PI)
  );
  let feed = parseInt(speed * FPT * cuttingEdges * multiplier * toolMaterialReducer);

  if (multiplier === 1) {
    message.innerHTML = feed + '"/min at ' + speed + ' RPM.';
    return;
  } else {
    message.innerHTML = feed + 'mm/min at ' + speed + ' RPM.';
    return;
  }
}