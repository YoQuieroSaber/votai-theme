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
                date = new Date(dateParts[1] + "-" + dateParts[0] + "-" + dateParts[2]);
                $(el).text(getDayCount(date) + " días");
        });

        $(".bMenuH").click(function(){
                $("#headermenu").slideToggle();
                // $("#menuMob").show();
                // $(".afiniCand").hide();
                // openIntermedio();                               
        });

        //Init election selector
        if (window.elections_json) {        
                var options_eleccion = '';
                var li_eleccion = '';
                $.each(elections_json, function(key,value){
                        if (window.default_election == value["detaillink"]) {
                                selected = 'selected="true"';
                                selected_class = 'class="default_election"';
                        }
                        else {
                                selected = "";
                                selected_class = '';
                        }
                        options_eleccion += '<option value="' + value["detaillink"] + '" '+ selected +'>' +  value["name"] + '<\/option>';
                        li_eleccion += '<li data="' + value["detaillink"] + '"'+ selected_class +'>' +  value["name"] + '<\/li>';
                });

                $(".election-selector")
                        .append(options_eleccion)
                        .change( function(e){
                                elecUrl=$(e.target).val();
                                if ($(".game-cta").length > 0) {
                                        location.href=elecUrl;
                                }
                        });

                $(".election-list").append(li_eleccion);
                $(".election-list li").click(function() {
                        elecUrl=$(this).attr("data");
                })

                function jugar(){
                        location.href="/theme"+elecUrl+"/media-naranja";
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
