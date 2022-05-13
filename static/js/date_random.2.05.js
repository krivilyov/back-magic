(function($, document) {
    var pluses = /\+/g;
    function raw(s) {
        return s;
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
            options = $.extend({}, $.cookie.defaults, options);

            if (value == null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || $.cookie.defaults || {};
        var decode = options.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                return decode(parts.join('='));
            }
        }
        return null;
    };

    $.cookie.defaults = {};

})(jQuery, document);

(function( $ ) {

    var getByDays = function(days){
        var name = 'randDate' + days;
        if(typeof localStorage !== 'undefined') {
            var time = localStorage.getItem(name);
            if(time) return time;
            time = new Date().getTime() - (days * 24 * 60 * 60 * 1000);
            localStorage.setItem(name, time);
            return time;
        } else {
            var time = $.cookie(name);
            if(time) return time;
            var time = new Date().getTime() - (days * 24 * 60 * 60 * 1000);
            $.cookie(name, time, {expires: 1});
            return time;
        }
    }

    var daysago_default = 29;

    var getRusMonth = function(month){
        switch (month) {
            case 1: return window.l_loc.l_pl57; break;
            case 2: return window.l_loc.l_pl58; break;
            case 3: return window.l_loc.l_pl59; break;
            case 4: return window.l_loc.l_pl60; break;
            case 5: return window.l_loc.l_pl61; break;
            case 6: return window.l_loc.l_pl62; break;
            case 7: return window.l_loc.l_pl63; break;
            case 8: return window.l_loc.l_pl64; break;
            case 9: return window.l_loc.l_pl65; break;
            case 10: return window.l_loc.l_pl66; break;
            case 11: return window.l_loc.l_pl67; break;
            case 12: return window.l_loc.l_pl68; break;
        }
    }

    var getRusDay = function(day){
        switch (day) {
            case 0: return window.l_loc.l_pl69; break;
            case 1: return window.l_loc.l_pl70; break;
            case 2: return window.l_loc.l_pl71; break;
            case 3: return window.l_loc.l_pl72; break;
            case 4: return window.l_loc.l_pl73; break;
            case 5: return window.l_loc.l_pl74; break;
            case 6: return window.l_loc.l_pl75; break;
        }
    }

    var dateByFormat = function(date, format){
        var data = {
            year : date.getFullYear(),
            monthF : date.getMonth() + 1,
            monthI : date.getMonth() + 1,
            monthS : getRusMonth(date.getMonth() + 1),
            dayF : date.getDate(),
            dayI : date.getDate(),
            dayS: getRusDay(date.getDay()),
            hourF : date.getHours(),
            minF : date.getMinutes(),
            secF : date.getSeconds(),
            weekDayF : date.getDay()
        }
        $.each(data, function(key,val){
            if(key != 'dayI' && key != 'monthI'){
                if(val < 10) val = '0' + val;
            }
            format = format.replace(key, val);
        });
        return format;
    }

    var methods = {
        init : function(options) {
            return this;
        },
        rstart : function() {
            return this.each(function(i) {
                var format = $(this).attr('format');
                var daysago = $(this).attr('daysago');
                if(!daysago) daysago = daysago_default;
                var rStart = new Date(parseInt(getByDays(daysago)));
                if(format){
                    $(this).html(dateByFormat(rStart, format));
                }else{
                    $(this).html(dateByFormat(rStart, 'dayI monthS year'));
                }
            });
        },
        rdate : function() {

            let elements = $(this);
            elements.sort(function(a, b){
                let aI = parseInt($(a).attr('sort'));
                let bI = parseInt($(b).attr('sort'));
                return (isNaN(aI) ? 0 : aI) - (isNaN(bI) ? 0 : bI);
            });

            let sorts_count = {};
            return elements.each(function(x, el) {
                let sort = parseInt($(this).attr('sort'));
                let z_roll_back = 0;
                if(!isNaN(sort)){
                    if(typeof sorts_count[sort] == 'undefined') {
                        sorts_count[sort] = 0;
                    }
                    sorts_count[sort]++;
                    if(sorts_count[sort] > 1) {
                        z_roll_back = sorts_count[sort] - 1;
                    }
                }
                var format = $(this).attr('format');
                var daysago = $(this).attr('daysago');
                var dayindex = parseFloat($(this).attr('dayindex'));
                if(!daysago) daysago = daysago_default;
                if(!dayindex) dayindex = 0;
                var rStart = new Date(parseInt(getByDays(daysago)));
                var z = x + dayindex;
                z -= z_roll_back;
                var nextDate = new Date(rStart.getTime() + (z * (12 + z) * (60 + x) * 60 * (1000 + x)));
                if(format){
                    $(this).html(dateByFormat(nextDate, format));
                }else{
                    $(this).html(dateByFormat(nextDate, 'dayF.monthF.year hourF:minF'));
                }
            });
        },
        ryear : function() {
            return this.each(function(i) {
                var value = $(this).data("decrease"),
                    decrease = value && value > 0 && value === parseInt(+value, 10)  && !isNaN(parseInt(value))
                        ? value : 0;

                $(this).html(new Date().getFullYear() - decrease);
            });
        },
        rnow : function() {
            return this.each(function(i) {
                var format = $(this).attr('format');
                var nowDate = new Date();
                if(format){
                    $(this).html(dateByFormat(nowDate, format));
                }else{
                    $(this).html(dateByFormat(nowDate, 'dayI monthS'));
                }
            });
        }
    };

    $.fn.randDate = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Метод с именем ' +  method + ' не существует для jQuery.randDate');
        }
    };
})(jQuery);

$(function () {
    $('.rstart, .startdate').randDate('rstart');
    $('.rdate, .ypdate, .randdate').randDate('rdate');
    $('.ryear, .nowyear').randDate('ryear');
    $('.rnow, .nowdate').randDate('rnow');
});