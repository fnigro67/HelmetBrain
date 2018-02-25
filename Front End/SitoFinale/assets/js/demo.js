type = ['','info','success','warning','danger'];



demo = {



    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },



    //QUI SI PUO MODIFICA

    initChartist: function(){//fine riga 209

        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'], //tavoli di ordine
          series: [[-.99999,
        .99999,
        -.99998,
        .99997,
        -.99996,
        .99995,
        -.99993,
        .99991,
        -.99989,
        .99987,
        -.99984,
        .99981,
        -.99978,
        .99975,
        -.99971,
        .99967,
        -.99963,
        .99958,
        -.99954,
        .99949,
        -.99944,
        .99938,
        -.99932,
        .99926,
        -.99920,
        .99914,
        -.99907,
        .99900,
        -.99893,
        .99885,
        -.99878,
        .99870,
        -.99861,
        .99853,
        -.99844,
        .99835,
        -.99826,
        .99816,
        -.99807,
        .99797,
        -.99786,
        .99776,
        -.99765,
        .99754,
        -.99743,
        .99731,
        -.99719,
        .99707,
        -.99695,
        .99683,
        -.99670,
        .99657,
        -.99643,
        .99630,
        -.99616,
        .99602,
        -.99588,
        .99573,
        -.99558,
        .99543,
        -.99528,
        .99512,
        -.99497,
        .99480,
        -.99464,
        .99448,
        -.99431,
        .99414,
        -.99396,
        .99379,
        -.99361,
        .99343,
        -.99324,
        .99306,
        -.99287,
        .99268,
        -.99248,
        .99229,
        -.99209,
        .99189,
        -.99169,
        .99148,
        -.99127,
        .99106,
        -.99085,
        .99063,
        -.99041,
        .99019,
        -.98997,
        .98974,
        -.98951,
        .98928,
        -.98905,
        .98881,
        -.98857,
        .98833,
        -.98809,
        .98784,
        -.98759,
        .98734]] //serie di dati da inserire
        };

        var optionsSales = {
          lineSmooth: false,
          low: -1,
          high: 1,
          showArea: false,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: true,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales); //mental waves
        Chartist.Line('#chartImpact', dataSales, optionsSales, responsiveSales);





        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
          labels: ['62%','32%','6%'],
          series: [62, 32, 6]
        });
    },

    initGoogleMaps: function(){
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
          styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },

	  showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "pe-7s-gift",
        	message: "Helmet brain website"

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	}


}
