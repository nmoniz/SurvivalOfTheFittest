range = function(start, end) {
    var result = [];
    end = end || start;
    var step = (start < end) ? 1 : -1;
    for (var i = start; i != end + step; i += step) {
        result.push(i);
    }
    return result;
};