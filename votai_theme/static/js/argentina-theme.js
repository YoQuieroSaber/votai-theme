var elecUrl="/election/buenos-aires-senadores";
var jsonUrl= "/theme/election/buenos-aires-senadores/media-naranja.json";

jQuery(document).ready(function($){
        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = $(window).innerHeight() + 100,
                //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
                offset_opacity = 1200,
                //duration of the top scrolling animation (in ms)
                scroll_top_duration = 700,
                //grab the "back to top" link
                $back_to_top = $('.cd-top');

        //hide or show the "back to top" link
        $(window).scroll(function(){
                ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
                if( $(this).scrollTop() > offset_opacity ) {
                        $back_to_top.addClass('cd-fade-out');
                }
        });

        //smooth scroll to top
        $back_to_top.on('click', function(event){
                event.preventDefault();
                $('body,html').animate({
                        scrollTop: 0 ,
                        }, scroll_top_duration
                );
        });

        //Calendario electoral
        $(".fecha-distancia").each(function(i,el) {
                dateParts = $(el).text().split('/');
                date = new Date(dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2]);
                let days = getDayCount(date);
                let text = days > 0 ? `${days} días` : "Hoy";

                $(el).text(text);

        });

        var pasoEndDate = moment("2017-08-13", "YYYY-MM-DD");
        var generalesEndDate = moment("2017-10-23", "YYYY-MM-DD");
        var today = moment();
        var startDate = moment("2017-01-01", "YYYY-MM-DD");

        var distance = today.diff(startDate, 'days');

        var totalDaysPaso = pasoEndDate.diff(startDate, 'days');
        var totalDaysGenerales = generalesEndDate.diff(startDate, 'days');


        setCounter("paso", distance, totalDaysPaso);
        setCounter("generales", distance, totalDaysGenerales);

        //Init election selector
        if (window.elections_json) {
                jsonUrl= elections_json[0].medianaranja_link;

                var options_eleccion = '';
                options_eleccion += '<option value="/es-ar/' + elecUrl + '"><h4>Elegí tu distrito</h4><\/option>';
                $.each(elections_json, function(key,value){
                        //console.log(value["detaillink"]);
                        options_eleccion += '<option value="' + value["detaillink"].replace("es-ar/","") + '"><h4>' +  value["name"] + '</h4><\/option>';
                });
                $("select#eleccion").html(options_eleccion);

                $( "select#eleccion,#menuMob select" ).change( function(e){
                        elecUrl=$(e.target).val();
                        if ($(".game-cta").length > 0) {
                                location.href=elecUrl;
                        }
                });

                function jugar(){

                //url = "/theme/election/pre-candidato-a-presidente/media-naranja.json";
                        location.href="/theme"+elecUrl+"/media-naranja"+ "/?jugar=true";
                        jsonUrl=elecUrl+"/media-naranja.json";

                }


                $(".bEmpez").click(function() {
                        jugar();
                });


        }
});

function getDayCount(secondDate){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date();
        let equalDays = firstDate.getDate() === secondDate.getDate();
        let equalMonths = firstDate.getMonth() === secondDate.getMonth();

        return equalDays && equalMonths
          ? 0
          : Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))) + 1;
}


function setCounter(id, value, max)
{
  var elem = document.getElementById(id);
  // Get the radius ("r" attribute)
  var radius = elem.r.baseVal.value;
  // Calculate the circumference of the circle
  var circumference = radius * 2 * Math.PI;
  // How long the bar has to be
  var barLength = value * circumference / max;

  // Set a dash pattern for the stroke.
  // The dash pattern consists of a dash of the right length,
  // followed by a gap big enough to ensure that we don't see the next dash.
  elem.setAttribute("stroke-dasharray", barLength + " " + circumference);
}
