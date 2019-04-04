(function () {
    "use strict";

    angular.module("flairbiApp").factory("GenerateBoxplot", GenerateBoxplot);

    GenerateBoxplot.$inject = [
        "VisualizationUtils",
        "$rootScope",
        "D3Utils",
        "filterParametersService"
    ];

    function GenerateBoxplot(
        VisualizationUtils,
        $rootScope,
        D3Utils,
        filterParametersService
    ) {
        return {
            build: function (record, element, panel) {
                
                function getProperties(VisualizationUtils, record) {
                    var result = {};

                    var features = VisualizationUtils.getDimensionsAndMeasures(
                        record.fields
                    ),
                        dimensions = features.dimensions,
                        measures = features.measures,
                        eachMeasure,
                        allMeasures = [];

                    result["dimension"] = ['country']// D3Utils.getNames(dimensions)[0];
                    result["measure"] = ['low', '1Q', 'median', '3Q', 'high']//D3Utils.getNames(measures);

                    result["maxMes"] = measures.length;

                    result["showXaxis"] = VisualizationUtils.getPropertyValue(record.properties, "Show X Axis");
                    result["showYaxis"] = VisualizationUtils.getPropertyValue(record.properties, "Show Y Axis");
                    result["axisColor"] = VisualizationUtils.getPropertyValue(record.properties, "Axis Colour");

                    result["showLabels"] = VisualizationUtils.getFieldPropertyValue(dimensions[0], "Show Labels");
                    result["labelColor"] = VisualizationUtils.getFieldPropertyValue(dimensions[0], "Colour of labels");
                    result["numberFormat"] = VisualizationUtils.getFieldPropertyValue(dimensions[0], "Number format");

                    result["displayColor"] = [];
                    for (var i = 0; i < result.maxMes; i++) {
                        result["displayColor"].push(VisualizationUtils.getFieldPropertyValue(measures[i], "Display colour"));
                    }
                    return result;
                }

                if (Object.keys($rootScope.updateWidget).indexOf(record.id) != -1) {
                    if ($rootScope.filterSelection.id != record.id) {
                        var boxplot = $rootScope.updateWidget[record.id];
                        boxplot.update(record.data);
                    }
                } else {
                    d3.select(element[0]).html('')
                    var div = d3.select(element[0]).append('div')
                        .attr('id', 'boxplot-' +  element[0].id)
                        .style('width', element[0].clientWidth + 'px')
                        .style('height', element[0].clientHeight + 'px')
                        .style('overflow', 'hidden')
                        .style('text-align', 'center')
                        .style('position', 'relative');

                    var svg = div.append('svg')

                    var tooltip = div.append('div')
                        .attr('id', 'tooltip')

                    var boxplot = flairVisualizations.boxplot()
                        .config(getProperties(VisualizationUtils, record))
                        .tooltip(true);

                    svg.datum(record.data)
                        .call(boxplot);

                    $rootScope.updateWidget[record.id] = boxplot;

                }
            }
        };
    }
})();
