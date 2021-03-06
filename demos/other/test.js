<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>VivaGraphs test page</title>
        <script src="../../dist/vivagraph.js"></script>

        <script type='text/javascript'>
            /*global Viva*/
            function onLoad() {
              // Let's construct simple graph:
              // 0 -> 1 -> 2 -> 3 -> 4 -> 5
              var graph = Viva.Graph.graph();
              graph.addLink(0, 1, { connectionStrength: 0.1 });
              graph.addLink(1, 2, { connectionStrength: 0.4 });
              graph.addLink(2, 3, { connectionStrength: 0.9 });
              graph.addLink(3, 4, { connectionStrength: 0.9 });
              graph.addLink(4, 5, { connectionStrength: 0.4 });
              graph.addLink(5, 6, { connectionStrength: 0.1 });
              // let's pin middle node:
              var middle = graph.getNode(3);
              middle.isPinned = true;
              var idealLength = 90;
              var layout = Viva.Graph.Layout.forceDirected(graph, {
                  springLength: idealLength,
                  springCoeff : 0.0008,
                  gravity : -10,
                  // This is the main part of this example. We are telling force directed
                  // layout, that we want to change length of each physical spring
                  // by overriding `springTransform` method:
                  springTransform: function (link, spring) {
                    spring.length = idealLength * (1 - link.data.connectionStrength);
                  }
              });
              // let's pin middle node:
              var middle = graph.getNode(3);
              layout.pinNode(middle, true);
              var renderer = Viva.Graph.View.renderer(graph, {
                  layout : layout
              });
              renderer.run();
            }
        </script>
        <style type='text/css'>
            body, svg {
                height: 100%;
                width: 100%;
                position: absolute;
                margin: 0;
            }
        </style>
    </head>
    <body onload="onLoad()" style="background-color: black;">
        <span style="color: #cecece; margin: 10px; position: absolute">Each link has custom length</span>
    </body>
</html>
