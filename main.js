var map;

require([
"dojo/dom",
"esri/Color",
"dojo/keys",
"dojo/parser",

"esri/config",
"esri/sniff",
"esri/map",
"esri/SnappingManager",
"esri/dijit/Measurement",
"esri/layers/FeatureLayer",
"esri/renderers/SimpleRenderer",
"esri/tasks/GeometryService",
"esri/symbols/SimpleLineSymbol",
"esri/symbols/SimpleFillSymbol",
"home/MeasurementUndo",
"esri/dijit/Scalebar",
"dijit/layout/BorderContainer",
"dijit/layout/ContentPane",
"dijit/TitlePane",
"dijit/form/CheckBox",
"dojo/domReady!"

], function (
dom, Color, keys, parser,
esriConfig, has, Map, SnappingManager, Measurement, FeatureLayer, SimpleRenderer, GeometryService, SimpleLineSymbol, SimpleFillSymbol, MeasurementUndo
) {
    parser.parse();

    map = new Map("map", {
        basemap: "streets",
        center: [-76.884, 40.265],
        zoom: 13
    });
    var measurement = new MeasurementUndo({ map: map, measurementId:"measurementDiv", undoButtonId: "btnUndo", addReferenceToWindow:true });
});