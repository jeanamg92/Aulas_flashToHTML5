var lastNumber = 0;
var prevOper = null;
var newValue = null;
var currentNumber = 0;
var memoryRegister = [];

var test = function() {};
/*
 * is_int and is_float functions gratuitously
 * stolen from the phpjs lib        
 * (http://phpjs.org/)                          
 */
var is_int = function(mixed_var) {
    return mixed_var === +mixed_var && isFinite(mixed_var) && !(mixed_var % 1);
}

var is_float = function(mixed_var) {
        return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
    }
    /*****/

var numpad = function() {
    var buttonID = '#' + $(this).attr('id');

    if (buttonID === '#inverse') {
        var num = Number($('.readout').text());
        num *= -1;
        $('.readout').text(num.toString());
        return;
    }

    if (newValue !== null) {
        newValue = null;
        $('.readout').text('');
    }

    var readout = $('.readout').text().replace('-', '').length;
    if (readout < 9) {
        $('.readout').append($(buttonID).text());
    }

};

var clear = function() {
    $('.readout').text('');
};

var allClear = function() {
    lastNumber = 0;
    prevOper = null;
    newValue = null;
    $('.readout').text('');
};

var back = function() {
    if ($('.readout').text() === '') {
        return;
    }

    var num = $('.readout').text();
    var outnum = (num.substring(0, num.length - 1) === '-') ? '' : num.substring(0, num.length - 1);
    $('.readout').text(outnum);
};

var operation = function() {
    if ($(this).attr('id') === 'square-root') return;

    if (lastNumber === 0 && !newValue) {
        lastNumber = Number($('.readout').text());
        prevOper = $(this).attr('id');
        newValue = true;
        return;
    }

    currentNumber = Number($('.readout').text());

    switch (prevOper) {
        case "divide":
            lastNumber /= currentNumber;
            break;
        case "multiply":
            lastNumber *= currentNumber;
            break;
        case "minus":
            lastNumber -= currentNumber;
            break;
        case "plus":
            lastNumber += currentNumber;
            break;
        case "exponent":
            lastNumber = Math.pow(lastNumber, currentNumber);
            break;
        case "percent":
            lastNumber = (lastNumber / currentNumber) * 100;
            break;
        case "equals":
            lastNumber = currentNumber;
    }

    newValue = true;
    prevOper = $(this).attr('id');
    displayNum(lastNumber);
};

var squareRoot = function() {
    var num = Number($('.readout').text());
    if (num < 0) return;
    var root = Math.sqrt(num);
    displayNum(root);
    newValue = true;
    prevOper = null;
    lastNumber = root;
};

var displayNum = function(number) {
    if (is_float(number) && number.toString().length > 9) {
        $('.readout').text(number.toPrecision(9).toString());
        return;
    }

    $('.readout').text(number.toString());
}

var memorySave = function() {
    var num = Number($('.readout').text());
    if (Number.isNaN(num)) return;
    memoryRegister.push(num);

    $('.memory-list').html('');
    memoryRegister.forEach(function(element) {
        $('.memory-list').append('<li>' + element + '</li>')
    });
}

var memoryRecall = function() {
    $('.memory-list').toggle("fast", function() {});
}

var memoryClear = function() {
    memoryRegister = [];
    $('.memory-list').hide("fast", function() {});
    $('.memory-list').html('');
}

var memoryList = function() {
    $('.readout').text($(this).text());
}

$('#clear').click(clear);
$('#all-clear').click(allClear);
$('#back').click(back);
$('#square-root').click(squareRoot);
$('.numpad').on('click', 'button', numpad);
$('#memory-save').click(memorySave)
$('#memory-recall').click(memoryRecall)
$('#memory-clear').click(memoryClear)
$('.memory-list').on('click', 'li', memoryList);
$('.operations').on('click', 'button', operation);