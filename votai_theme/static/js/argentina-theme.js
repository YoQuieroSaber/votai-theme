var elecUrl="/election/bagaces";
var jsonUrl= "/theme/election/bagaces/media-naranja.json";

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
                $(el).text(getDayCount(date) + " días");
        });


        //Init election selector
        if (window.elections_json) {
                jsonUrl= elections_json[0].medianaranja_link;

                var options_eleccion = '';
                var options_eleccion_juegolink = '';
                $.each(elections_json, function(key,value){
                        //console.log(value["detaillink"]);
                        if (value["tags"].indexOf(lang) > -1) {

                                selected = "";
                                if (value["medianaranja_link"].replace(".json","") == location.pathname) {
                                        selected = "selected='selected'";
                                }
                                options_eleccion += '<option value="' + value["detaillink"] + '" '+selected+'><h4>' +  value["name"] + '</h4><\/option>';
                                options_eleccion_juegolink += '<option value="' + value["medianaranja_link"].replace(".json","") + '" '+selected+'><h4>' +  value["name"] + '</h4><\/option>';

                                electionLink = $(".election-link-template").clone().removeClass("election-link-template");
                                electionLink.find("a").attr("href",value.detaillink).text(value["name"]);
                                $("#headermenu").append(electionLink);
                        }
                        
                });
                $("select#eleccion:not(.home_election_selector)").append(options_eleccion);
                $("select#eleccion.home_election_selector").append(options_eleccion_juegolink);

                $( "select#eleccion,#menuMob select" ).change( function(e){
                        elecUrl=$(e.target).val();
                        if ($(".game-cta").length > 0 || $(e.target).hasClass("home_election_selector")) {
                                location.href=elecUrl;
                        }
                });

                function jugar(){

                //url = "/theme/election/pre-candidato-a-presidente/media-naranja.json";
                        location.href="/theme"+elecUrl+"/media-naranja";
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
        console.log(firstDate,secondDate);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)))+1;
        return diffDays;
}
