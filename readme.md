measurement-undo
================

Have you ever used this ESRI Measurement widget and wished you could go back a few steps and redraw lines?  Now you can! This extension of the Measurement Widget adds an "Undo" button which will effectively remove the last line created while in "Measure" mode. 


### Quick Start

Below is the gist.  You create a new MeasurementUndo object and pass in a reference to the map, the id of the "measurement div", and the "Undo button". It is very similar to the code for creating the built-in ESRI Measurement tool. See the index.html for a complete working example.
 
```  
    map = new Map("map", {   
        basemap: "streets",  
        center: [-76.884, 40.265],  
        zoom: 13
    });  
    var measurement = new MeasurementUndo({ map: map, measurementId:"measurementDiv", undoButtonId: "btnUndo"});  

```