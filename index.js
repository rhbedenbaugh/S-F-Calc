function calculate() {
  //document input conversion
  let units = document.querySelector('#units').value;
  let toolMaterial = document.querySelector('#toolMaterial').value;
  let toolDiameter = document.querySelector('#toolDiameter').value;
  let cuttingEdges = parseInt(document.querySelector('#cuttingEdges').value);
  let workpieceMaterial = document.querySelector('#workpieceMaterial').value;
  let idealSurfaceSpeed = parseInt(
    document.querySelector('#idealSurfaceSpeed').value
  );
  let idealChipLoad = document.querySelector('#idealChipLoad').value;

  if (!toolDiameter || !cuttingEdges) {
    message1.innerHTML = 'Enter tool diameter & cutting edges.';
    return;
  }

  let multiplier;
  if (units === 'inches') multiplier = 1;
  if (units === 'millimeters') multiplier = 25.4;

  let toolMaterialReducer;
  if (toolMaterial === 'highSpeedSteel') toolMaterialReducer = 0.5;
  if (toolMaterial === 'coatedHighSpeedSteel') toolMaterialReducer = 0.7;
  if (toolMaterial === 'carbide') toolMaterialReducer = 1;
  if (toolMaterial === 'coatedCarbide') toolMaterialReducer = 1.2;

  let surfaceSpeed;
  if (idealSurfaceSpeed) {
    surfaceSpeed = idealSurfaceSpeed;
  } else {
    if (workpieceMaterial == 'aluminumAlloys') surfaceSpeed = 600;
    if (workpieceMaterial == 'brassSoftBronze') surfaceSpeed = 400;
    if (workpieceMaterial == 'bronzeHighTensile') surfaceSpeed = 250;
    if (workpieceMaterial == 'cooperAlloys') surfaceSpeed = 350;
    if (workpieceMaterial == 'ironCastSoft') surfaceSpeed = 200;
    if (workpieceMaterial == 'ironCastHard') surfaceSpeed = 100;
    if (workpieceMaterial == 'ironDuctile') surfaceSpeed = 80;
    if (workpieceMaterial == 'ironMalleable') surfaceSpeed = 250;
    if (workpieceMaterial == 'magnesiumAlloys') surfaceSpeed = 800;
    if (workpieceMaterial == 'molybdenum') surfaceSpeed = 800;
    if (workpieceMaterial == 'monelHighNickelSteel') surfaceSpeed = 150;
    if (workpieceMaterial == 'nickelBaseHighTempAlloys') surfaceSpeed = 20;
    if (workpieceMaterial == 'plastics') surfaceSpeed = 600;
    if (workpieceMaterial == 'plasticsGlassFilled') surfaceSpeed = 300;
    if (workpieceMaterial == 'refractoryAlloys') surfaceSpeed = 80;
    if (workpieceMaterial == 'steelLowCarbon') surfaceSpeed = 250;
    if (workpieceMaterial == 'steelMediumCarbon') surfaceSpeed = 100;
    if (workpieceMaterial == 'steelUpToRc35') surfaceSpeed = 150;
    if (workpieceMaterial == 'steelRc35ToRc50') surfaceSpeed = 80;
    if (workpieceMaterial == 'steelRc50-Rc60') surfaceSpeed = 25;
    if (workpieceMaterial == 'steelMold') surfaceSpeed = 200;
    if (workpieceMaterial == 'steelTool') surfaceSpeed = 100;
    if (workpieceMaterial == 'stainlessSteelSoft') surfaceSpeed = 250;
    if (workpieceMaterial == 'stainlessSteelHard') surfaceSpeed = 50;
    if (workpieceMaterial == 'titaniumSoft') surfaceSpeed = 120;
    if (workpieceMaterial == 'titaniumHard') surfaceSpeed = 30;
  }

  surfaceSpeed = surfaceSpeed * 12 * multiplier;

  let FPT;
  if (idealChipLoad) {
    FPT = idealChipLoad * cuttingEdges;
  } else {
    if (toolDiameter / multiplier < 0.125) FPT = 0.0005;
    if (toolDiameter / multiplier < 0.25) FPT = 0.001;
    if (toolDiameter / multiplier < 0.4) FPT = 0.002;
    if (toolDiameter / multiplier < 0.6) FPT = 0.003;
    if (toolDiameter / multiplier > 0.6) FPT = 0.005;
  }

  FPT = FPT * multiplier;

  //calculations
  let speed = Math.round(surfaceSpeed / (toolDiameter * Math.PI));
  let feed = Math.round(speed * FPT * cuttingEdges * toolMaterialReducer);

  if (multiplier === 1) {
    message1.innerHTML = feed + '"/min at ' + speed + ' RPM.';
    message2.innerHTML = FPT + '" chip load at ' + surfaceSpeed / 12 + ' SFM';
    return;
  } else {
    message1.innerHTML = feed + 'mm/min at ' + speed + ' RPM.';
    message2.innerHTML =
      FPT + 'mm chip load at ' + Math.round(surfaceSpeed / 1000) + ' SMM';
    return;
  }
}
