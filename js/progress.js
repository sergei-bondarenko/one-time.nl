"use strict";

function polarToCartesian(centerX, centerY, radius, angleInDegrees)
{
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    var x, y;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function progressBar(percent)
{
    if (percent === 100)
    {
        // It's not possible to draw circle with one arc
        percent = 99.999;
    }

    var x = 55;
    var y = 55;
    var radius = 50;
    var startAngle = 0;
    var endAngle = 360 * percent / 100;
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d =
    [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
