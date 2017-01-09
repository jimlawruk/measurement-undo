define([
    "dojo/_base/declare",
    "esri/config",
    "esri/map",
    "esri/SnappingManager",
    "esri/dijit/Measurement",
    "esri/tasks/GeometryService",
    "esri/dijit/Scalebar",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/TitlePane",
    "dijit/form/CheckBox",
    "dojo/domReady!"
], function (
    declare, esriConfig, Map, SnappingManager, Measurement, GeometryService
  ) {
    var _this;
    var measurement;
    var undoButton;
    var results = [];
    var resultValues = [];
    return declare([], {
        
        constructor: function (options) {
            _this = this;
            if (options.addReferenceToWindow) {
                window.measureUndo = _this;
            }
            measurement = new Measurement(options, document.getElementById(options.measurementId));
            undoButton = document.getElementById(options.undoButtonId);
            if (undoButton) {
                undoButton.onclick = function () {
                    _this.undo();
                }
            }
            measurement.startup();
            measurement.on("measure-start", function (evt) {
                if (measurement.getTool().toolName === "distance") {
                    setUndoButtonDisplay(true);
                }
            });
            measurement.on("measure-end", function (evt) {
                setUndoButtonDisplay(false);
            });
            measurement.on("tool-change", function (evt) {
                setUndoButtonDisplay(false);
            });
            measurement.on("measure", function (evt) {
                if ((results.length > 0 && measurement.result != results[results.length - 1]) ||
                    (results.length === 0 && measurement.result > 0)) {
                    results.push(measurement.result);
                    resultValues.push(measurement.resultValue.domNode.innerHTML);
                }
            });
        },
        undo: function () {
            //var measurement = measurement;            
            var graphics = measurement._measureGraphics;
            if (graphics.length > 2) {
                var graphicsLayer = measurement._measureGraphic._graphicsLayer;
                for (var i = 0; i < 2; i++) {
                    var graphic = graphics.pop();
                    graphicsLayer.remove(graphic)
                }
                measurement._measureGraphic = graphics.slice(-1)[0];
                measurement._inputPoints.pop();
                if (results.length > 0) {
                    results.pop();
                    resultValues.pop();
                }
                if (results.length > 0) {
                    measurement.result = results.slice(-1)[0];
                    measurement.resultValue.domNode.innerHTML = resultValues.slice(-1)[0];
                } else {
                    measurement.result = 0;
                    measurement.resultValue.domNode.innerHTML = "";
                }
            }

            if (graphics.length > 0) {
                var startIndex = 0;
                if (graphics.length > 2) {
                    startIndex = graphics.length - 2;
                }
                var newStartPoint = graphics[startIndex];
                measurement._currentStartPt.x = newStartPoint.geometry.x;
                measurement._currentStartPt.y = newStartPoint.geometry.y;
            }

        },
        getMeasurementTool: function () {
            return measurement;
        },
        clearResult: function () {
            measurement.clearResult();
            setUndoButtonDisplay(false);
        }

    });

    function setUndoButtonDisplay(trueOrFalse) {
        if (undoButton) {
            undoButton.style.setProperty("display", trueOrFalse ? "inline-block" : "none");
        }
    }

});