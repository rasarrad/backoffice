var text = "";  
var origin = "";
var nextid = "";
var currentIndex = 0;
var youtubeId = "";
var scrollLastPos = 0;
var topMenuMode = 1;
var hasProcessedDescription = false;
var url = "";
var urldirect = "";
var dblFlag = false;
var dblClickTimeout = null;
var addType = "T";
var hideMode = false;
var catsmap = new Map();
var calendar = null; 
var filterdate1date = null;
var filterdate2date = null; 
var xUp = null;                                    
var yUp = null;  
var xDiff = null;  
var yDiff = null;  
var xDown = null;                                                        
var yDown = null;
var currObjSwipe = null;
var lastTouch = null;
var searchtotal = 0;
var showAll = false;
var showColors = false;
var showColorsAdv = false;
var isMy = true;
var useSwipes = false;
var ceec = 0; 
var funcg = null;
var isMobile = null;
var totalrenderedtweets = 0;
var currrenderedtweets = 0;
var linkArray = new Array();
var linkArrayToRender = new Array();
var timeoutWorker;
var renderTimeout = null;
var datecontrol = new Date();
var countercontrol = 0;


var allLinks = new Array();
var counterAllLinks = 0;
var clWorker;

/* 
    xyz startcode
    xyz fakepass
    xyz splash
*/


// START do tema
var currTheme = readCookie("currTheme");
if (currTheme && currTheme != 'default') {
     changetheme(currTheme, true);
}  


let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = null;
let selectMonth = null;

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthh3 = null;
let yearh3 = null;
let multiselect = false;
var multiselectmap = new Map();
var monthArray = new Array();

var totalHours = 0;
var totalVacation = 0;

var globalTotalHoursChanged = false;
var globalVacationChanged = false;

$( document ).ready(function() { 

    isMobile = window.mobileAndTabletCheck();
    alert(window.location.href);
    //isMobile = true;

    if (isMobile) {
        $('body').addClass('ismobile');
        $( "table.table-responsive-sm" ).addClass('multiselect');
        $(".multidiv > div > div > span").html("Selected<span>0</span>");
        $(".multidiv").addClass('inmulti');
        configureMobileMultiselectMode();
    }
    else {
        monthArray[1] = 8;
        monthArray[2] = 8;
        monthArray[3] = 8;
        monthArray[4] = 8;
        monthArray[5] = 8;
        
        monthArray[8] = "V";
        monthArray[9] = "V";
        monthArray[10] = "V";
        monthArray[11] = "V";
        monthArray[12] = "V";
        
        monthArray[16] = 8;
        monthArray[23] = 8;
        monthArray[24] = 8;
        monthArray[25] = 8;
        monthArray[26] = 8;
    }




    //changeMultiselectMode();

    $('body').addClass('big');
    
    changetheme("gray", true);

        
    $("#calpopupselect").bind( "change", function( event ) {
        calpopupselectonchange(this, event); 
    });

    selectYear = document.getElementById("year");
    selectMonth = document.getElementById("month");
    
    monthh3 = document.getElementById("monthh3");
    yearh3 = document.getElementById("yearh3");


    showCalendar(currentMonth, currentYear);


    openTimesheet();
 /* 
 localStorage.clear();

    for (var i = 0; i < 10000; i++) {
        localStorage['movie'+ i] = "ssssss";
    }

    var z = 0;
    for (var j= 0; j < 10000; j++) {

        if (localStorage['movie'+ ])
            z++;
    }

    localStorage.removeItem("lastname");


 
    if (localStorage.lastname) 
        alert(1)
    else
        alert(2)

    localStorage.lastname = "ssssss";

    if (localStorage.lastname) 
        alert(12)
    else
        alert(23)

        localStorage.removeItem("lastname");
    if (localStorage.lastname) 
        alert(123)
    else
        alert(234)

*/


    // START do texto das categorias
    var catschanged = readCookie("cat-cli");
    if (catschanged) {
        catsmap.set("cli", "My Tweets");
        $(".cat-cli").text("My Tweets");
    }
    else {
        catsmap.set("cli", "VictoryWillCome Tweets");
    }
    catsmap.set("all", "All Links");
    catsmap.set("tvn", "New / Ongoing");
    catsmap.set("trn", "Hot / Trending");
    catsmap.set("tvi", "To Watch");
    catsmap.set("tvl", "Documentaries / Films");
    catsmap.set("tre", "Fast Reading");
    catsmap.set("trl", "Long Reading");
    catsmap.set("tke", "Important / To Keep");
    catsmap.set("imp", "Shocking Truth");

    // START remover speckcheks
    $( "input, textarea" ).each( function( index, element ){
        $(element).attr("spellcheck", "false");
        $(element).attr("autocomplete", "none");
        $(element).attr("additionalAttributes", "{autocomplete: 'none'}");
    });


    // START victorywillcome tweets
    var valueVWC = readCookie("vwc");
    if (valueVWC) {
        if (valueVWC == "Yes") {
            showAll = true;
        }
    }


    // START da variavel setShowDeleted
    var showDeleted = getshowdeletedcookie();
    //setShowDeleted(showDeleted); // faz o count all tweets


    // START do mascara cinzenta inicial
    // setTimeout(function() { 
    //      countalltweets(); agora é feito no showDeleted (em cima)

/*     setTimeout(function(){
        $( "#mask" ).fadeOut( 800, function() {
            var style = window.getComputedStyle(body, null);
    
            $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
            $("#mask .fa-folder-open").hide();
            $("#mask > div" ).hide();
            $("#mask > .fa-circle-o-notch").show();
        });
    }, 340);  */
    //}, 1); 


    // START do zoom
    var hasZoom = readCookie("hasZoom");
    if (hasZoom)
        zoom(null, true);
    
    setTimeout(function(){
        $('body').removeClass('notransit'); 
    }, 1400);  


    // START do tweet counter
    var tweetCounter = readCookie("tweetCounter");

    if (tweetCounter) {
        $('#tweetcount').addClass(tweetCounter); 
    }
    
    // START do splash screen
    /* xyz splash
    createCookie("eec", "sss");
    if (!dunl())
        showSplash();
    */
    //showSplash();
    //////////////
        
    // START das colors
    var valueColor = readCookie("colors");
    if (valueColor) {
        if (valueColor == "All") {
            showColors = true;
            showColorsAdv = true;
        }
        else if (valueColor == "Medium") {
            showColors = false;
            showColorsAdv = true;   
        }
    }


    // START do top menu
    var value = readCookie("topmenu");
    if (value) {
        if (value == "0") {
            topMenuMode = 0;
        }
        else {
            topMenuMode = 1;
            $("#recoilback").css("position", "absolute");   
        }
    }
    else {
        topMenuMode = 2;
    }


    // START dos swipes
    var valueSwipe = readCookie("swipes");
    if (valueSwipe) {
        if (valueSwipe == "Yes") {
            useSwipes = true;
        }
    }
    
    // START da help
    value = readCookie("help");
    if (value) {
        $( ".fa-question-circle:not(.ashow)" ).each( function( index, element ){
            $(element).css("display", "none");
        });
    }


    // START da cor caso haja alteracoes
/*     var hasChanges = readCookie("haschanges");
    if (hasChanges && hasChanges.length > 0) {
        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        } 
    }
    
 */
    // START filechoser
    var dropZone = document.getElementById('filedrop');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelectDragDrop, false);
    document.getElementById('files').addEventListener('change', handleFileSelectInput, false);

    // START do view mode (O QUE FAZ?????)    
    setviewmode();


    // TEST CODE
    /*
    window.mobileAndTabletcheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
    */

    /* 
    //cnonsole.log("----window.innerWidth-----window.innerHeight------navigator.userAgent-----");
    //cnonsole.log(window.innerWidth + " - " + window.innerHeight + " - " + navigator.userAgent);
    */

    /*
    nextid = parseInt(readCookie("maxid"));

    do {
        createCookie2(nextid, "templink", "", null, true);
        nextid = nextid - 1;
    }
    while (nextid > 0);

    nextid = parseInt(readCookie("maxid"));

    function visibilityHandler() {
        var hash = '#bg';
        if (document.hidden && !window.location.hash) {
        window.history.replaceState(null, null, window.location + hash);
        } else if (!document.hidden && window.location.hash == hash) {
        var l = '' + window.location;
        window.history.replaceState(null, null, l.substr(0, l.length - hash.length));
        }
    };
    document.addEventListener('visibilitychange', visibilityHandler, false);
    visibilityHandler();

    */  
    /*
    <script src="./js/FileSaver.js"></script>

        var blob = new Blob(["Welcome to Websparrow.org."],
            { type: "text/plain;charset=utf-8" });
        saveAs(blob, "static.txt");
    */
   



/////////////////////////////////////////////////////////////////////////
//                           BINDS ON READY                            //
/////////////////////////////////////////////////////////////////////////

    window.onscroll = function(ev) {
        clearTimeout(renderTimeout);

/*         if (topMenuMode == 2 && $(window).scrollTop() > 300) {
            if (scrollLastPos > $(window).scrollTop()) {
                $("#recoilback").css("position", "fixed");

                $("#recoilback").slideDown(1080);
    
                if ($(window).scrollTop() == 0) {
                    $("#recoilback").css("border-bottom", "0px solid var(--dark-color)");
                }
                else {
                    $("#recoilback").css("border-bottom", "1px solid var(--dark-color)");
                }
            }
            else {
                $("#recoilback").css("border-bottom", "1px solid var(--dark-color)");
                $("#recoilback").slideUp(650, function() {
                    $("#recoilback").css("position", "absolute");
                });
            }
        } */

        if (topMenuMode == 2) {
            if (scrollLastPos > $(window).scrollTop()) {
                $("#recoilback").css("position", "fixed");
                $("#recoilback").fadeIn(700);
            }
            else {
                $("#recoilback").css("position", "absolute");
                $("#recoilback").fadeOut(700);
            }
        }

        var scroll = scrollLastPos = $(window).scrollTop();
        if (scroll > 200) {
          $('#gotop').fadeIn(700); 
        }
        else {
          $('#gotop').fadeOut(700);
        }
    };

    ///////////////////////////////////////

    $( "#openadd" ).bind( "click", function( event ) {
        openCreatePopup(); 
    });

    /*
    $( "#addtweet" ).bind( "click", function( event ) {
        if (!dblFlag) {
            dblFlag = true;
            dblClickTimeout = setTimeout(function() {     
              if (dblFlag) {
                  openCreatePopup();
                  dblFlag = false;  
              }
            }, 500);
        }
        else {
            clearTimeout(dblClickTimeout);
            
            var win = window.open('https://github.com/rasarrad/mytweetshost/edit/master/data.json', '_blank');
            win.focus();

            dblFlag = false;
        }    
      
        
    });*/

    
    ///////////////////////////////////////

    $('#filtertext, #filterauthor, #filtertag').keypress(function(event){
      
        var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13' && $(this).val().length > 0){
        getInformation(1);

        if ($(window).width() < 1200) {
            $(this).blur();
        }
      }
    });    

    $('#catsinput, #tagsinput, #infoinput, #filtertext, #filterdate1, #filterdate2, #filterid, #filterauthor, #filtertag').keydown(function(e){
        e.stopPropagation();
      });
      
    /*$("#typeTT, #typeYY, #typeHH").on("click", function() {
        parseTweet();
    });*/ 

    $("#tweet").on("paste", function() {
        parseTweet();
    });

    $("#pasteinput").on("paste", function() {
        setTimeout(function(){ 
            $('#tweet').val($("#pasteinput").val());
            parseTweet(2);
            $("#pasteinput").val("");
            $("#pasteinput").blur()
        }, 0);
        

    });

/*     $( "#showdeleted" ).bind( "click", function( event ) {
        if ($("#showdeleted").is(":checked")) {
            $("#showdeleted2").prop('checked', true);
            setshowdeletedcookie("true");
        }
        else {
            $("#showdeleted2").prop('checked', false);
            setshowdeletedcookie("false");
        }
        countAllLinks();
    }); */


    ///////////////////////////////////////

    $( "#btnsearch" ).bind( "click", function( event ) {
      getInformation(1);
    });

    ///////////////////////////////////////

    $( "#btnreset" ).bind( "click", function( event ) {
      resetFields(true);
    });
 
    ///////////////////////////////////////

    $( "#settings" ).bind( "click", function( event ) {

        fixfocus(this);

        openMainSettingsPopup();
  /* 
        if (!dblFlag) {
            dblFlag = true;
            dblClickTimeout = setTimeout(function() {     
              if (dblFlag) {
                  generate();
                  dblFlag = false;  
              }
            }, 500);
        }
        else {
            clearTimeout(dblClickTimeout);
            undogenerate();
            dblFlag = false;
        }*/
      });

    ///////////////////////////////////////

    $( "#closepopup" ).bind( "click", function( event ) {
      closePopup();
    });

    $( "#updatemaxid" ).bind( "click", function( event ) {
        if ($('#maxidinput').val() != "") {
            createCookie("maxid", parseInt($('#maxidinput').val().trim()));
           
            showMessage("Current ID: " +  $('#maxidinput').val());
            $('#maxidinput').val('');
        }
        else {
            showMessage("Current ID: " + readCookie("maxid"));
        } 
    });

    $( "#removetmp" ).bind( "click", function( event ) {
        if ($('#removetmpinput').val() != "") {
            eraseLinkTmpData($('#removetmpinput').val(), true);
            showMessage("Removed link number: " +  $('#removetmpinput').val());
            $('#removetmpinput').val('');
        }
        else {
            nextid = null;
            try {
                nextid = parseInt(readCookie("maxid"));
            }
            catch(err) {
                //cnonsole.log("removetmp click - Error parsing next id");
            }
            finally {
                if (nextid) {
                    $("#maxid").val(nextid);
                    //cnonsole.log("removetmp click - nextid vem do cookie: " + nextid);
                }
                else {
                    nextid = parseInt($("#maxid").val());
                    createCookie("maxid", nextid);
                    //cnonsole.log("removetmp click - nextid vem do hidden field: " + nextid);
                }
            }

            do {
                eraseLinkTmpData(nextid, true);
                nextid = nextid - 1;
            }
            while (nextid > 99990);
    
            showMessage("Temp Links Removed");
        } 
    });

    $( "#splashbutton" ).bind( "click", function( event ) {
        if (currentIndex == 0) {
            closeSplash(); 
            if ($("#splashbutton").attr("ceec") == "yes") {
                $("#splashbutton").attr("ceec", "");
                funcg();
                funcg = null;
            }
        }
    });
    
    $( "#catsinput" ).change(function() {
        catsInputOnChange(this);
    });

    $( "#tagsinput" ).change(function() {
        tagsInputOnChange(this);
    });

    $( "#filtertag" ).change(function() {
        filtertagOnChange(this);
    });

    if (!isMobile) {
        document.getElementById("tweetcount").addEventListener("click", clickHandler);
        document.getElementById("tweetcount").addEventListener("mouseover", countclick);
    }
    else {
        // START swip binds
        document.addEventListener('touchstart', handleTouchStart, false);        
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);

        $("#editinfodiv textarea").focus(function(){  
            $("#editinfodiv .sectionicontd").css("height", ((window.innerHeight/2) - 20) + "px");
            $("#editinfodiv").attr("cinner", window.innerHeight - 94);
            $("#editinfodiv").addClass("keyb");
        });
    
        $("#editinfodiv textarea").blur(function(){  
            $("#editinfodiv .sectionicontd").css("height", $("#editinfodiv").attr("cinner") + "px")
    
            $("#editinfodiv").removeClass("keyb");
        });
    }

    $("#filtertag").keyup(function(e) {
        filtertagOnChange(this);
    });

    $( "#classifinput" ).change(function() {
        classifInputOnChange(this);
    });

    $( ".newLayout > div" ).click(function(event) {
        event.stopPropagation();
    });

    $("#filtertext").keyup(function() {
        filterinfoOnChange(this);
    });

    $("#filtertext").change(function() {
        filterinfoOnChange(this);
    });

    $("#infoinput").keyup(function() {
        infoInputOnKeyup(this);
    });

    $("#filterauthor").keyup(function() {
        filterauthorOnChange(this);
    });

    $("#filterauthor").change(function() {
        filterauthorOnChange(this);
    });

    $("#addtaginput").keyup(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13' && $(this).val().length > 0){
            addTextTag();
        }
    });
    
    $( "#filterdate1display" ).click(function() {
        $( "#filterdate1display" ).blur();  
        var value = new Date();
        if (filterdate1date != null)
        value = filterdate1date;
        $('#searchpopup').css("background", "transparent");
        
        openCalendar("filterdate1", value)
    });

    $( "#filterdate1" ).change(function() {
        filterdate1change();
    });

    $( "#filterdate2display" ).click(function() {
        $( "#filterdate2display" ).blur();

        var value = new Date();
        if (filterdate2date != null)
            value = filterdate2date;

        $('#searchpopup').css("background", "transparent");
        openCalendar("filterdate2", value)
    });

    $( "#filterdate2" ).change(function() {
      filterdate2change();
    });

    $( "#datetoshow" ).click(function() {
        $("#datetoshow").blur();  
        $('#linkChange').css("background", "transparent");
        var otherObj = $('#linkChange').find(".dateinput");
        var date = new Date();
        if (otherObj.val().trim() != "") {
            date.setDate(Number(otherObj.val().substring(6, 8)));
            date.setMonth(Number(otherObj.val().substring(4, 6)) - 1);
            date.setFullYear(Number(otherObj.val().substring(0, 4)));
        }
        openCalendar("linkcreatedate", date);
    });

    
    $("#tagsselect").change(function() {
        // Check input( $( this ).val() ) for validity here
        if ($( this ).val() != "notag") {
            $( "#tagsinput" ).val($( "#tagsinput" ).val() + " " + $( this ).val());
            $(this).val("notag");
            $('#tagsinput').trigger("change");
            removeNonExistentLi();
        
            createNonExistentLi();
        }
      });

      $("#classifselect").change(function() {
        if ($("#selectedclassif").val() != "all") {
            var desc = "Greater than ";

            if ($("#classifselect").val() == "=") {
                desc = "Equal to ";
            }
            else if ($("#classifselect").val() == "<") {
                desc = "Less than ";
            }
        
            $(".currentsearchclassif").html(desc + $("#selectedclassif").val() + "<i onclick='clearcriterion(event,this, \"selectedclassif\", \"searchclassif\")' class='fa fa-times-circle'></i>");
            
        }
      });


      $( "#tagsearchselect" ).change(function() {
        // Check input( $( this ).val() ) for validity here
        if ($( this ).val() != "notag") {
            $( "#filtertag" ).val($( "#filtertag" ).val() + " " + $( this ).val());
            $(this).val("notag");
            $('#filtertag').trigger("change");

            removeNonExistentLi("tagsearchul", "filtertag");

            createNonExistentLi("tagsearchul", "filtertag");
        }
      });

            /*
      $("input, textarea").focus(function(){  
            if ($("#linkChange").css("display") != "none") {
                var innerHeight = window.innerHeight;
                var htmlElem = $("#linkChange > div");
                var maxHeightStyle = "max-height: " + (innerHeight - 125) + "px !important;";

                var top = 1;
                var isLandscape = window.innerWidth < 1200 && window.innerWidth > 700;
                if ($('#linkChange').attr("cid") == "new" && $(this).attr("id") == "infoinput")
                    if (isLandscape)
                        top = -50;
                    else 
                        top = -250;
                    
                if ($('body').hasClass('big')) {
                    maxHeightStyle = "max-height: " + (innerHeight - 137) + "px !important;";
                }
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle);     
    
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle + "top: " + top + "px !important;"); 
            }
      });

      $("input, textarea").blur( function(){  
            if ($("#linkChange").css("display") != "none") {
                updateTopPosition("linkChange");
            }
      });
        */

    document.getElementById("toptitle").addEventListener('click', () => {
        navigator.clipboard.readText()
        .then(text => {
            if (!dblFlag) {
                closeallnewlayout();
                $('body, html').css('overflow-y', 'hidden');
                
                dblFlag = true;
                dblClickTimeout = setTimeout(function() {     
                  if (dblFlag) {
                      openPopupParsed(text, 2);
                      dblFlag = false;  
                  }
                }, 500);
            }
            else {
                clearTimeout(dblClickTimeout);
                
                //changeviewmode();
    
                dblFlag = false;
            }  
        })
        .catch(err => {
            
        })
    });

    document.getElementById("addtweet").addEventListener('click', () => {
        navigator.clipboard.readText()
        .then(text => {

            /*
            showSplash();
            */
            $( "#addtweet" ).blur();
            closeallnewlayout();
            $('body, html').css('overflow-y', 'hidden');
            

            if (!dblFlag) {
                dblFlag = true;
                dblClickTimeout = setTimeout(function() {     
                  if (dblFlag) {
                      openPopupParsed(text, 1);
                      dblFlag = false;  
                  }
                }, 500);
            }
            else {
                clearTimeout(dblClickTimeout);
                
                if (hideMode) {
                    openPopupParsed(text, 1);
                }
                else {
                    //var win = window.open('https://github.com/rasarrad/mytweetshost/edit/master/data.json', '_blank');
                    //win.focus();
                }
    
                dblFlag = false;
            }  

        })
        .catch(err => {
            
        })
    }); 
    
    // xyz startcode
/*     setTimeout(function() {
        clickmenu('all', 'All Links')
    }, 1220); */

    //openPopupParsed("sssssssss", 1);
    
    //openmenu();

    //closeSplash(); 

    //togglecriterions();

    
    /* CATEGORIES RENAMING

    catschanged = readCookie("cat-tvn")
    catsmap.set("tvn", catschanged);
    $(".cat-tvn").text(catschanged);

    catschanged = readCookie("cat-trn")
    catsmap.set("trn", catschanged);
    $(".cat-trn").text(catschanged);

    catschanged = readCookie("cat-tvi")
    catsmap.set("tvi", catschanged);
    $(".cat-tvi").text(catschanged);

    catschanged = readCookie("cat-tvl")
    catsmap.set("tvl", catschanged);
    $(".cat-tvl").text(catschanged);
    
    catschanged = readCookie("cat-tre")
    catsmap.set("tre", catschanged);
    $(".cat-tre").text(catschanged);

    catschanged = readCookie("cat-trl")
    catsmap.set("trl", catschanged);
    $(".cat-trl").text(catschanged);

    catschanged = readCookie("cat-tke")
    catsmap.set("tke", catschanged);
    $(".cat-tke").text(catschanged);

    catschanged = readCookie("cat-imp")
    catsmap.set("imp", catschanged);
    $(".cat-imp").text(catschanged);

    catschanged = readCookie("cat-cli")
    catsmap.set("cli", catschanged);
    $(".cat-cli").text(catschanged);

    createCookie("cat-tvn", "New / Ongoing 2222");
    createCookie("cat-trn", "Hot / Trending 2222");
    createCookie("cat-tvi", "To Watch 2222");
    createCookie("cat-tvl", "Documentaries / Films 2222");
    createCookie("cat-tre", "Fast Reading 2222");
    createCookie("cat-trl", "Long Reading 2222");
    createCookie("cat-tke", "Important / To Keep 2222");
    createCookie("cat-imp", "Shocking Truth 2222");
    createCookie("cat-cli", "My Tweets 2222");
    */


    /* FILE SAVE
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    navigator.webkitPersistentStorage.requestQuota(1024*1024, function() {
        window.webkitRequestFileSystem(window.PERSISTENT , 1024*1024, SaveDatFileBro);
      });

    window.requestFileSystem(window.PERSISTENT, 1024*1024, onInitFs, errorHandler);
    */

}); // FIM DO ONREADY


 

/////////////////////////////////////////////////////////////////////////
//                          FILE READ/WRITE                            //
/////////////////////////////////////////////////////////////////////////

function SaveDatFileBro(localstorage) {
    localstorage.root.getFile("info.txt", {create: true}, function(DatFile) {
      DatFile.createWriter(function(DatContent) {
        var blob = new Blob(["Lorem Ipsum 2222"], {type: "text/plain"});
        DatContent.write(blob);
      });
    });
  }
  function errorHandler(e) {
    var msg = '';
  
    switch (e.code) {
        /*
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break; */
      default:
        msg = 'Unknown Error';
        break;
    };
  
  }

  function onInitFs(fs) {
    fs.root.getFile('info.txt', {}, function(fileEntry) {

      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function(file) {
         var reader = new FileReader();
  
         reader.onloadend = function(e) {
            
         };
  
         reader.readAsText(file);
      }, errorHandler);
  
    }, errorHandler);
  }


/////////////////////////////////////////////////////////////////////////
//                              FULSCREEN                              //
/////////////////////////////////////////////////////////////////////////

window.openLinkOutside = function(id) {
    var obj = $("#" + id);

    if (obj.hasClass("text")) {
        return false;
    }

    window.open($("#" + id).attr("curl"));
};

window.openLinkInside = function(id) {
    //if ($("#fsPopup iframe").attr("cid") == id && $("#fsPopup iframe").attr("cerror") != "yes") {
    //    $("#fsPopup").fadeIn(500);
    //}
    //else {
        //$("#fsPopup iframe").attr("cerror", "");
        var obj = $("#" + id);

        if (obj.hasClass("text")) {
            return false;
        }

        if (!obj.hasClass("yt") && !obj.hasClass("html")) {
            return false;
        }
            
        $('body, html').css('overflow-y', 'hidden');

        $("#fsPopup iframe").attr("cid", id);

        var value = readCookie("maximumfs");

        if (value) {
            $("#fsPopup").addClass("full");
        }
        else {
            $("#fsPopup").removeClass("full");
        }

        var timer = 1500;

        if (obj.hasClass("yt")) {
            $("#fsPopup").addClass("yt");
            timer = 1;
        }
        else {
            $("#fsPopup").removeClass("yt");
        }

        var url = generateUrl(obj.attr("curl"))

        $("#fsPopup iframe").attr("src", url);
        $("#fsPopup").fadeIn(1600);
        dblFlag = true;  
    
        setTimeout(function() {    
            dblFlag = false; 
        }, timer);  
   // }
};


window.openLinkInline = function(id) {

    var obj = $("#" + id);

    if (obj.hasClass("text")) {
        var jsonvar = getJsonbyid(id);
        editLinkText(null, jsonvar)

        return false;
    }

    if (!obj.hasClass("yt") && !obj.hasClass("html")) {
        var win = window.open(obj.attr("curl"), '_blank');
        win.focus();
        return false;
    }

    var url = generateUrl(obj.attr("curl"));

    $("#contentin" + id).prepend("<iframe src='" + url + "' id='contentiniframe" + id + "' onload='iframeloadFunc(this)' scrolling='yes' frameborder='0' allowtransparency='true' style='border: 0px solid;margin-top: 0px !important;width: 100% !important;transform: translate(-50%, -50%) !important; display: none;'></iframe>");
    $("#contentiniframe" + id).attr("cid", id);
    dblFlag = true; 

    $("#contentin" + id + " .logo").hide();

    var timer = 1500;
    if (obj.hasClass("yt"))
        timer = 1;

    setTimeout(function() {    
        dblFlag = false; 
    }, timer); 

    $("#contentiniframe" + id).fadeIn(1900);
 
};

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

function iframeloadFunc(obj) {
    if (dblFlag) {
        window.open($(obj).attr("src"));

        var element = document.getElementById($(obj).attr("cid"));
        
        showFreeTooltip(getOffset(element).left, getOffset(element).top, "This link can't be open inside the app.");

        $("#contentiniframe" + $(obj).attr("cid")).fadeOut(800);
    }
} 

function generateUrl(url) {
    if (url.indexOf('watch?v=') >= 0) {
        url = url.substring(url.indexOf('watch?v=') + 8);

        if (url.indexOf("&t=") > 0) {
            url = url.replace("&t=","?start=");
            url = url.substring(0, url.length -1);
        }
        url = "https://www.youtube.com/embed/" + url + "?autoplay=1";
    }
    return url;
} 


function closeFSPopup(obj) {
    $('body, html').css('overflow-y', 'auto');
    $("#fsPopup iframe").attr("src", "");
    $("#fsPopup").fadeOut(700);
} 

function moveFSPopup(obj) {
    if ($(obj).hasClass('fa-arrow-circle-up')) {
        $(obj).removeClass('fa-arrow-circle-up');
        $(obj).addClass('fa-arrow-circle-down');
        $("#fsPopup").addClass('up');
    }
    else {
        $(obj).addClass('fa-arrow-circle-up');
        $(obj).removeClass('fa-arrow-circle-down');
        $("#fsPopup").removeClass('up');
    }
}

function iframeFSloadFunc(obj) {
    if ($(obj).attr("cid") == "none")
        return false;
    
    if (dblFlag) {
        //$(obj).attr("cerror", "yes");
 
        window.open($(obj).attr("src"));

        var element = document.getElementById($(obj).attr("cid"));
        
        showFreeTooltip(getOffset(element).left, getOffset(element).top, "This link can't be open inside the app.");


        closeFSPopup();
    }
} 


window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

/////////////////////////////////////////////////////////////////////////
//                              FILE CHOSER                            //
/////////////////////////////////////////////////////////////////////////

function handleFileSelectInput(evt) {

    var files = evt.target.files;

    uploadFiles(files);
}

function handleFileSelectDragDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; 

    uploadFiles(files);
  }

  function uploadFiles(files) {
    try {
        $( "#dialog-confirm-upload" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
            "Yes": function() {
                var reader=new FileReader();
                reader.onload = function(e) {}
                reader.readAsText(files[0]);
            
                setTimeout(function(){
                    var currentId = readCookie("maxid");
                    try {
                        var resultParsed = JSON.parse(reader.result);
            
                        var hasTemp = false;
            
                        for (var x = 0; x < resultParsed.length; x++) {
                            
                            eraseLinkTmpData(resultParsed[x].id, true);

                            if (parseInt(resultParsed[x].id) >= 100000) {
                                hasTemp = true;
            
                                var link = "{\r\n\"id\": \"" + resultParsed[x].id + "\",\r\n\"creationdate\": \"" + resultParsed[x].creationdate  + "\",\r\n\"type\": \"" + resultParsed[x].type  + "\",\r\n\"url\": \"" + resultParsed[x].url  + "\",\r\n\"ishidden\": \"" + resultParsed[x].ishidden  + "\",\r\n\"date\": \"" + resultParsed[x].date + "\",\r\n\"author\": \"" + resultParsed[x].author  + "\",\r\n\"categories\": \"" + resultParsed[x].categories + "\",\r\n\"tags\": \"" + resultParsed[x].tags + "\",\r\n\"info\": \"" + resultParsed[x].info.replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "").trim() + "\",\r\n\"classif\": \"" + resultParsed[x].classif + "\",\r\n\"isnew\": \"\",\r\n\"deleted\": \"" + resultParsed[x].deleted + "\",\r\n\"tweet\": \"" + resultParsed[x].tweet + "\"\r\n},";
            
                                var mlink = encodeURIComponent(JSON.stringify(link));
                
                                createCookie(resultParsed[x].id + "templink", mlink);
                            }
                            else {
                                updateWebLink(resultParsed[x]);
                            }
                        }
            
                        if (hasTemp)
                            createCookie("maxid", parseInt(resultParsed[0].id) + 1);
                        else 
                            createCookie("maxid", 100000);
            
                        $("#mask").fadeOut(500);
                        $("#dialog-confirm-upload").parent().fadeOut( 800, function() {
                            $("#dialog-confirm-upload").parent().remove();
                        });

                        setTimeout(function(){
                            showMessage("Links Successfully Imported"); 
            
                            countalltweets();

                            document.getElementById("files").value = "";
                        }, 600); 
                    }
                    catch(err) {
                        showMessage("Error Importing Links");
                        createCookie("maxid", parseInt(currentId)); 
                    }
                    finally {
            
                    }
                }, 100);  
            },
            Cancel: function() {
                $("#mask").fadeOut(500);
                $("#dialog-confirm-upload").parent().fadeOut( 800, function() {
                    $("#dialog-confirm-upload").parent().remove();
                });
                document.getElementById("files").value = "";
                }
            }
        });
    } catch (error) {
                        
    }
    $("#dialog-confirm-upload").parent().addClass("uploaddialog");
    
    $("#dialog-confirm-upload").parent().css("top", ((window.innerHeight/2) - 100) + "px")
    $("#mask").fadeIn(500);
    $("#dialog-confirm-upload").parent().fadeIn(800);    
  }


  function updateWebLink(obj) {

    if(obj.hasOwnProperty("date")) {
        createCookie(obj.id + "datechanged", obj.date);
    }

    if(obj.hasOwnProperty("author")) {
        createCookie(obj.id + "author", obj.author);
    }

    if(obj.hasOwnProperty("categories")) {
        createCookie(obj.id + "catchanged", obj.categories);
    }

    if(obj.hasOwnProperty("tags")) {
        createCookie(obj.id + "tagchanged", obj.tags);
    }

    if(obj.hasOwnProperty("info")) {
        createCookie(obj.id + "info", obj.info);
    }

    if(obj.hasOwnProperty("deleted")) {
        createCookie(obj.id + "isdeleted", obj.deleted);
    }

    if(obj.hasOwnProperty("classif")) {
        createCookie(obj.id + "classif", obj.classif);
    }
  }


  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  function readTextFile(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
  }
  
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }



/////////////////////////////////////////////////////////////////////////
//                         CLICK AND DOUBLE CLICK                      //
/////////////////////////////////////////////////////////////////////////


var dblTapFlagControl = true;
var dblTapFlag = false;
var dblTapTimeout = null;

function clickHandler(event) {
    
    if (event.detail > 1) {
            clearTextSelection();
    }

    var obj = event.currentTarget.id;
    dblTapFlagControl = false;
    if(!dblTapFlag) {
        dblTapFlag = true;
        dblTapTimeout = setTimeout( function() { 
            dblTapFlag = false; 
            executeSingleDoubleFunction(obj, "single");
            setTimeout( function() { 
                dblTapFlagControl = true;
            }, 200 );
        }, 350 );
        return false;
    }
    event.preventDefault();
    clearTimeout(dblTapTimeout);
    dblTapFlag = false;
    dblTapFlagControl = true;
    executeSingleDoubleFunction(obj, "double");
 }


 function clearTextSelection() {

    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {  // IE?
        document.selection.empty();
      }
 }



/////////////////////////////////////////////////////////////////////////
//                     SWIPE TOUCH E LONG TOUCH                        //
/////////////////////////////////////////////////////////////////////////

    
  function getParentObjId(obj) {
    var found = false;
    var currObj = obj;

    if (currObj.hasClass("pobj")) {

        if (!currObj.hasClass("body")) {
            return currObj.attr("id");
        }

        return "";
    }

    do {
        currObj = currObj.parent();

        if (currObj.hasClass("pobj")) {

            if (!currObj.hasClass("body")) {
                return currObj.attr("id");
            }

            return "";
        }
    }
    while (!found);
  }   



function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

//var allowScroll = false;
var datet = null;

function handleTouchStart(evt) {
    datet = new Date();
    currObjSwipe = getParentObjId($(event.target));

    //$('body, html').css('overflow', 'hidden');
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;   
    
    //allowScroll = false;
    dblFlag = false;  
    setTimeout(function() {    
        //allowScroll = true;
        dblFlag = true;
         
        dblClickTimeout = setTimeout(function() {    
            dblFlag = false;
        }, 180);
    }, 80);                
};                                                


function handleTouchMove(evt) {
    //if (!dblFlag && allowScroll)
    //    $('body, html').css('overflow', 'auto');

    if ( ! xDown || ! yDown ) {
        return;
    }

    if (evt.touches[0] != null)
        lastTouch = evt.touches[0];

    xUp = evt.touches[0].clientX;                                    
    yUp = evt.touches[0].clientY;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp; 
    
};

function handleTouchEnd(evt) {
    if (lastTouch) {
        if (useSwipes && dblFlag && lastTouch) {                       
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    //cnonsole.log("left: " + currObjSwipe);
                    executeSwipeFunction(currObjSwipe, "left");
                } else {
                    //cnonsole.log("right: " + currObjSwipe);
                    executeSwipeFunction(currObjSwipe, "right");
                }                       
            } else {
                if ( yDiff > 0 ) {
                    //cnonsole.log("up: " + currObjSwipe);
                    executeSwipeFunction(currObjSwipe, "up");
                } else {
                    //cnonsole.log("down: " + currObjSwipe);
                    executeSwipeFunction(currObjSwipe, "down");
                }                                                                 
            }
        }      
    }
    else {
        if (new Date().getTime() - datet.getTime() < 300) {
            executeSingleDoubleFunction(currObjSwipe, "single");
        }
        // FOR LONG AND VERY LONG
        //else if (new Date().getTime() - datet.getTime() < 800) { 
        //    executeSingleDoubleFunction(currObjSwipe, "double");
        //}
        else {
            executeSingleDoubleFunction(currObjSwipe, "double");
        }
    }
    dblFlag = false;
    xDown = null;
    yDown = null;   
    lastTouch = null;                  
}; 

// xyzdouble 
function executeSingleDoubleFunction(obj, type) {
    switch(obj.substring(0, 9)) {
        case "contentin":
            var jsonvar = getJsonbyid(obj.substring(9));
            if (jsonvar.type == "N") {
                if (type == "double") {
                    editLinkText(null, jsonvar)
                }
            }
            else {
                var value = readCookie("doublefs");
                if (value) {
                    if (type == "double")
                        type = "single";
                    else 
                        type = "double";
                }
                if (type == "double") { // Execute double/long touch
                    value = readCookie("linksinside");
    
                    if (value) {
                        openLinkInside(obj.substring(9));
                    }
                    else {
                        openLinkOutside(obj.substring(9));
                    }
                }
                else { // Execute single/touch
                    openLinkInline(obj.substring(9));
                }
                break;  
            }

        case "tweetcoun":
            if (type == "double") { // Execute double/long touch
                countdoubleclick();
            }
            else { // Execute single/touch
                if (isMobile)
                    countclick();
                else
                    countdoubleclick();
            }
            break;  
    }
}
function executeSwipeFunction(obj, type) {
    switch(obj) {
        case "main":
        case "backdiv":
            processBackdivFuncs(type);
            break;
        case "helppop":
            processHelpDivFuncs(type);
            break;
        case "mainmenu":
            processMainmenuFuncs(type);
            break;

        case "linkChange":
            processLinkChangeFuncs(type);
            break;
    
        case "searchpopup":
            processSearchFuncs(type);
            break;
            
        case "calendardiv":
            processCalendarFuncs(type);
            break;

        case "mainsettings":
            processMainsettingsFuncs(type);
            break;

        case "editinfodiv":
            processEditinfoFuncs(type);
            break;

        default:
            processLinkFuncs(obj, type);
            break;       
    }
    currObjSwipe = null;

}

function processEditinfoFuncs(type) {
    switch(type) {
        case "up":
            saveLinkText()
            break;

        case "down":
            closeLinkText()
            break;
        case "left":
            closeLinkText()
            break;

        case "right":
            saveLinkText()
            break;
    }
}  

function processHelpDivFuncs(type) {
    closeHelpPopup();
    //cnonsole.log("help all-----------------------------------------------");
} 

function processLinkChangeFuncs(type) {
    switch(type) {
        case "up":
            closeSettingsPopup()
            //cnonsole.log("linkChange up-----------------------------------------------");
            break;

        case "down":
            closeSettingsPopup()
            //cnonsole.log("linkChange down-----------------------------------------------");
            break;
        case "left":
            closeSettingsPopup()
            //cnonsole.log("linkChange left-----------------------------------------------");
            break;

        case "right":
            closeSettingsPopup();
            //cnonsole.log("linkChange right-----------------------------------------------");
            break;
    }
}  

function processSearchFuncs(type) {
    switch(type) {
        case "up":
            closeSearchPopup()
            //cnonsole.log("searchpopup up-----------------------------------------------");
            break;

        case "down":
            closeSearchPopup()
            //cnonsole.log("searchpopup down-----------------------------------------------");
            break;
        case "left":
            resetFields(true)
            //cnonsole.log("searchpopup left-----------------------------------------------");
            break;

        case "right":
            getInformation(2);
            //cnonsole.log("searchpopup right-----------------------------------------------");
            break;
    }
}  

function processCalendarFuncs(type) {
    switch(type) {
        case "up":
            closeCalendarPopup()
            //cnonsole.log("calendardiv up-----------------------------------------------");
            break;

        case "down":
            closeCalendarPopup()
            //cnonsole.log("calendardiv down-----------------------------------------------");
            break;
        case "left":
            $("button[data-calendar-toggle=previous]").trigger("click");
            //cnonsole.log("calendardiv left-----------------------------------------------");
            break;

        case "right":
            $("button[data-calendar-toggle=next]").trigger("click");
            //cnonsole.log("calendardiv right-----------------------------------------------");
            break;
    }
}  

function processBackdivFuncs(type) {
    switch(type) {
        case "up":
            openSearchPopup()
            //cnonsole.log("backdiv up-----------------------------------------------");
            break;

        case "down":
            openmenu()
            //cnonsole.log("backdiv down-----------------------------------------------");
            break;
        case "left":
            openmenu()
            //cnonsole.log("backdiv left-----------------------------------------------");
            break;

        case "right":
            openSearchPopup()
            //cnonsole.log("backdiv right-----------------------------------------------");
            break;
    }
}  

function processMainsettingsFuncs(type) {
    switch(type) {
        case "up":
            closeMainSettingsPopup();
            //cnonsole.log("mainsettings up-----------------------------------------------");
            break;

        case "down":
            closeMainSettingsPopup();
            //cnonsole.log("mainsettings down-----------------------------------------------");
            break;
        case "left":
            closeMainSettingsPopup();
            //cnonsole.log("mainsettings left-----------------------------------------------");
            break;

        case "right":
            closeMainSettingsPopup();
            //cnonsole.log("mainsettings right-----------------------------------------------");
            break;
    }
}  

function processMainmenuFuncs(type) {
    switch(type) {
        case "up":
            closeMenuPopup()
            //cnonsole.log("Mainmenu up-----------------------------------------------");
            break;

        case "down":
            closeMenuPopup()
            //cnonsole.log("Mainmenu down-----------------------------------------------");
            break;
        case "left":
            showMessage("Show Deleted Links Toggled", 2500, null, null, null, null, true, 500);

            toggleShowDeletedAll();

            //cnonsole.log("Mainmenu left-----------------------------------------------");
            break;

        case "right":
            clickmenu('all', 'All Links');
            showMessage("All Links Displayed", 2500, null, null, null, null, true, 500);
            //cnonsole.log("Mainmenu right-----------------------------------------------");
            break;
    }
}  

function processLinkFuncs(idLink, type) {
    var id = 0;

    if (idLink.startsWith("contentin"))
        id = parseInt(idLink.substring(9));
    else
        id = parseInt(idLink);

    if (id > -1) {
        switch(type) {
            case "up":


                ////cnonsole.log("UP   UP   UP   UP   UP   UP   UP   UP   UP   UP   UP");
                /*
                openSearchPopup()
                https://stackoverflow.com/questions/22629286/scroll-down-a-webpage-by-constant-speed/22629859
       
                setTimeout(function() { 
                    gotop();
                }, 100); 
                
                showMessage("Scrolled to top", 2500, null, null, null, null, true, 500);
                         */ 
                break;
    
            case "down":// apagar pesquisa - mantendo os critérios
                /*//cnonsole.log("DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   ");
                
                $("#main").empty();
                $('#tweetcount').hide(); 
                showMessage("Search cleared", 2500, null, null, null, null, true, 500);
*/
                break;
            case "left": // apagar pesquisa - mantendo os critérios 
                /*//cnonsole.log("LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   ");
             
                $('#linkresult').val($('#' + id).attr('curl'));
                $("#linkresult").focus();
                sleep(100);  
                $("#linkresult").select();
                document.execCommand('copy');
                sleep(100);  
                $("#linkresult").blur();
                showMessage("Link Copied To Clipboard", 2500, null, null, null, null, true, 500);
*/
                expandCat(null, id);
                break;
    
            case "right": // abrir link
                ////cnonsole.log("RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   ");
                openLinkInline(id);
                break;
        }
    }
}  






/////////////////////////////////////////////////////////////////////////
//                              TRATAR                                 //
/////////////////////////////////////////////////////////////////////////




function setshowdeletedcookie(val) {
    createCookie("showdeleted", val);  
}   

function getshowdeletedcookie(val) {
    return readCookie("showdeleted");  
}   

function showSplash()
{
    $("#splash").fadeIn(800);

    currentIndex = 10;
    $("#splashbutton").removeClass("active");
    $("#splashbutton").hide();
    dblClickTimeout = setTimeout(function() {  
        $("#splashbutton").fadeIn(800);
        updateSplashCounter();
    }, 1498);
}


function updateSplashCounter()
{
    if (currentIndex == 1) {
        if ($('body').hasClass('big'))
            $("#splashbutton").html("<i class='fa fa-times' style='padding-left: 0px;padding-right: 4px;font-size: 17px;position: relative;top: 1px;'></i>close");
        else
            $("#splashbutton").html("<i class='fa fa-times' style='padding-left: 0px;padding-right: 4px;font-size: 14px;position: relative;top: 1px;'></i>close");
        
        $("#splashbutton").addClass("active");
        currentIndex = 0;
        //updateSplashInnerCounter();
    }
    else {
        currentIndex = currentIndex -1;

        $("#splashbutton").text(currentIndex);

        dblClickTimeout = setTimeout(function() {     
            updateSplashCounter();
        }, 998);
    }
}


function closeSplash()
{
    setTimeout(function() {     
        $("#splashbutton").text("15");
        $("#splashbutton").hide();
    }, 998);

    $("#splash").fadeOut(800);
}

$.fn.isChildOverflowing = function (child) {
    var p = $(this).get(0);
    var el = $(child).get(0);
    return (el.offsetTop < p.offsetTop || el.offsetLeft < p.offsetLeft) ||
      (el.offsetTop + el.offsetHeight > p.offsetTop + p.offsetHeight || el.offsetLeft + el.offsetWidth > p.offsetLeft + p.offsetWidth);
  };

    function openPopupParsed(text, type) {
        $('#mask').fadeIn(600);  
        setTimeout(function() { 
            resetFieldsPopup(); 

            $('#tweet').val(text);

            parseTweet(type);

        }, 300);
    }

    function setviewmode() {
        var hideModeVar = readCookie("hideMode");
        if (hideModeVar) {
            hideMode = true;
            //$("#generate").addClass("hidemode");
        }
    }

    function changeviewmode() {
        if (hideMode) {
            hideMode = false;
            //$("#generate").removeClass("hidemode");
            createCookie("hideMode", "", null, true);
            showMessage("Hide Mode Deactivated");
        }
        else {
            hideMode = true;
            //$("#generate").addClass("hidemode");
            createCookie("hideMode", "yes");
            showMessage("Hide Mode Activated");
        }
    }

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function changetheme(type, desc) {
    var high_color = "";
    var text_color = "";
    var dark_color = "";
    var softdark_color = "";
    var soft_color = "";
    var soft_transp_color = "";
    createCookie("currTheme", type);

    switch(type) {
        case "default":
            high_color = "#45cae7";
            text_color = "#6db0bf";
            dark_color = "#001b30";
            softdark_color = "#003156";
            soft_color = "#004a86";
            soft_transp_color = "#001b30cc";
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#003156');
            $('#mainsettings .currenttheme').html('Twitter Lines'); 
            break;

        case "red":
            high_color = "#fdb9b9";
            text_color = "#f79393";
            dark_color = "#630000";
            softdark_color = "#af0000";
            soft_color = "#ea0000";
            soft_transp_color = "#630000c2";  
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#af0000');
            $('#mainsettings .currenttheme').html('Red Tide'); 
            break;

        case "gray":

            high_color = "#505050"; //"#313131";
            text_color = "#3a3a3a";
            dark_color = "#909090";
            softdark_color = "#bbbbbb";
            soft_color = "#ffffff";
            
            high_color = "#424242";
            high_color = "#505050"; //"#313131";
            text_color = "#313131";
            dark_color = "#ffffff";
            softdark_color = "#bbbbbb";
            soft_color = "#909090";


            soft_transp_color = "#3c3c3cbd"; 
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#bbb');
            $('#mainsettings .currenttheme').html('Shades Of Gray'); 
            break;

        case "green":
            high_color = "#fdfd15";
            text_color = "#f7f768";
            dark_color = "#005411";
            softdark_color = "#179631";
            soft_color = "#25c345";
            soft_transp_color = "#04290bc4"; 
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#179631');
            $('#mainsettings .currenttheme').html('Green Army'); 
            break; 
    }

    putChoosedThemTop();

    document.documentElement.style.setProperty('--high-color', high_color);
    document.documentElement.style.setProperty('--text-color', text_color);
    document.documentElement.style.setProperty('--dark-color', dark_color);
    document.documentElement.style.setProperty('--softdark-color', softdark_color);
    document.documentElement.style.setProperty('--soft-color', soft_color);
    document.documentElement.style.setProperty('--soft-transp-color', soft_transp_color);
}

function putChoosedThemTop() 
{
    var theme = readCookie("currTheme");
    var clonedTheme = null;
    var themes = new Array();
    var counter = 0;

    $("#mainsettings table#theme tr.theme").each( function( index, element ) {
        var currow = $(element);

        if (currow.attr("id") != theme) {
            themes[counter] = currow.clone();
            currow.remove();
            counter = counter + 1;
        }
        else {
            $('#mainsettings .currenttheme').html(currow.find('.themetitle').text()); 
            $(element).find("i").removeClass("gradient-border");
            $(element).find("i").hide();
            $(element).find(".themebox").css("border", "3px solid var(--high-color)").css("width", "calc(100% - 4px)");
            $(element).find(".themetitle").css("left", "-3px").css("width", "calc(100% + 6px)").css("background", "var(--high-color)").css("color", "var(--dark-color)");
        }
    });

    for (var i = 0; i < counter; i++) {
        $(themes[i]).find("i").addClass("gradient-border").show();
        $(themes[i]).find("td").css("border-bottom", "0");


        $(themes[i]).find(".themebox").css("border", "3px solid var(--dark-color)").css("width", "calc(100% - 4px)");
        $(themes[i]).find(".themetitle").css("left", "-3px").css("width", "calc(100% + 6px)").css("background", "var(--dark-color)").css("color", "var(--high-color)");


        $("#mainsettings table#theme").append(themes[i]);
    }
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function openmenu(obj, flag) {
    if (obj)
        fixfocus(obj);

        vibrateApp();
    if ($('#mainmenu').css("display") == "none") {
        var setHeight = "26px";
        if ($('body').hasClass('big')) {
            setHeight = "36px";
        }
        $("#mainmenu.newLayout table.defaulttablerow").each( function( index, element ) {
            var table = $(element);
            table.css('max-height', setHeight);
        });

        if (flag) {
            $('#searchpopup').css("background", "transparent");
            $('#mainmenu').attr("fromsearch", "yes");
        }
        else {
            closeallnewlayout();
        }

        $('body, html').css('overflow-y', 'hidden');


        $('#mainmenu').css('transition', 'transition: all 0.01s');
        $('#mainmenu').css("height", "calc(100%)");

        if ($('body').hasClass('big')) {
            $('#mainmenu').css("top", "-528px");
        }
        else {
            $('#mainmenu').css("top", "-391px");
        }
        
        $('#mainmenu').css("background", "transparent");

        $('#mainmenu').slideDown();

        $('#mainmenu').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

        setTimeout(function(){
            $('#mainmenu').css('background', 'var(--soft-transp-color)');
        }, 800);

    }
    else {
        closeMenuPopup();
    }

}

function closeallnewlayout(bj) {
    $('.newLayout').fadeOut(300);
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function gotop(e) {
    if (e)
        e.stopPropagation();
    
    if (!$("#tweetcount").hasClass("hidicon")) {
        var speed = 2500;
        var top = $(window).scrollTop();

        if (top < 1000)
            speed = 500;
        else if (top < 5000)
            speed = 1500;

        $("html, body").animate({ scrollTop: "0" }, speed); 
    }
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function internallinkcopy(obj) {
    fixfocus(obj);
    
    $('#linkresult').val("https://sleepy-mclean-3aea2d.netlify.com/?tweetid=" + $('#linkChange').attr('cid'));
    $("#linkresult").select();
    document.execCommand('copy');
    $("#linkresult").blur();
    showMessage("Internal Link Copied To Clipboard"); 
}

function externallinkopenPre() {
    externallinkopen(null, $("#" + $("#fsPopup iframe").attr("cid")).attr("curl"));
}
function externallinkopen(obj, link) {
    if (obj)
        fixfocus(obj);

    var linkToOpen = ""; 
    if (link)
        linkToOpen = link;
    else
        linkToOpen = $('#linkChange').attr('clink');

    var win = window.open(linkToOpen, '_blank');
    win.focus();
    //showMessage("External Link Copied To Clipboard"); 
}


function externallinkCopyPre() {
    externallinkcopy(null, $("#" + $("#fsPopup iframe").attr("cid")).attr("curl"));
}


function externallinkcopy(obj, link) {
    if (obj)
        fixfocus(obj);

    if (link)
        $('#linkresult').val(link);
    else
        $('#linkresult').val($('#linkChange').attr('clink'));
    
        $("#linkresult").select();
        
    document.execCommand('copy');
    $("#linkresult").blur();
    showMessage("Link Copied To Clipboard"); 
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var clickmenu = function(val) {    
    $('#selectedcat').val(val);
    $('#selectedcattext').val(catsmap.get(val));
    $('#titlesearch .span2').html($('#selectedcattext').val());

    if ($('#mainmenu').attr("fromsearch") == "yes") {
        closeMenuPopup();
        var style = window.getComputedStyle(body, null);
        $('#searchpopup').css("background", style.getPropertyValue('--soft-transp-color'));
        $('#mainmenu').attr("fromsearch", "");
    }
    else {
        resetFields();

        getInformation(2);
    }
} 
  

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function closetagpopup(obj, id) {
    $("#changetags").fadeOut();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function showMessage(text, speed, icon, iconstyle, undofunc, undotext, transparent, inicialspeed) {
    var mainDiv = $("#stripmessage");

    var dospeed = 3500;
    if (speed)
      dospeed = speed;

    var doinicialspeed = 900;
    if (inicialspeed)
        doinicialspeed = inicialspeed;

    mainDiv.find('i.fa').attr('class', 'fa');
    if (icon) {
        mainDiv.find('i.fa').addClass(icon);

        if (iconstyle != '')
            mainDiv.find('i.fa').attr('style', iconstyle);
        mainDiv.find('i.fa').show();
    }
    else {
        mainDiv.find('i.fa').hide();
    }

    $("#stripfunc").unbind("click");
    if (undofunc) {
        $("#stripfunc").bind("click", undofunc);
        $("#stripfunc").text(undotext);
        mainDiv.find('#stripfunc').show();
    }
    else {
        mainDiv.find('#stripfunc').hide();
    }
    
    mainDiv.css("transition", "none");
    $("#stripmessage .striptext").css("transition", "none");
    mainDiv.css("top", "0px");

    if (transparent) {
        mainDiv.css("background", "rgba(0, 0, 0, 0)");
    }
    else {
        mainDiv.css("background", "rgba(0, 0, 0, 0.6)");
    }

    $("#stripmessage .striptext").css("top", "calc(50% - 27px)");
    $("#stripmessage .poptitle").text(text);

    mainDiv.fadeIn("slow", function(){
      setTimeout(function() { 
          mainDiv.css("transition", "top 1s");
          mainDiv.css("top", "100%");
          
          $("#stripmessage .striptext").css("transition", "top 1s");
          mainDiv.css("background", "rgba(0, 0, 0, 0)");
          $("#stripmessage .striptext").css("top", "calc(0% - 71px)");
          setTimeout(function() { 
               mainDiv.fadeOut("slow");
            }, dospeed);
        }, doinicialspeed);
    });
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function createCookie(name, value, doErase) {
    if (doErase)
        localStorage.removeItem(name);
    else 
        localStorage[name] = value;
}

function createCookie2(id, name, value, obj, doErase) {            
    val = getJsonbyid(id);
    if (name != "templink") {
        val = updateObject(val, name, value, doErase);

        if (doErase)
            localStorage.removeItem(id + name);
        else 
            localStorage[id + name] = value;

        if (hasChanges(val)) {
            localStorage[id + "haschanges"] = "yes";
        }
        else {
            localStorage.removeItem(id + "haschanges");
        }
    }

    // quando não é criacao o val vem com o objecto json do link
    if (val) {
        var isTemp = readCookie(id + "templink");
        if (isTemp) {
            updateLinkCookie(val);
        }
        updateMainArray(val);
        updateLinkColor(val, id);
    }
    else {
        insertInMainArray(obj);
        updateLinkCookie(obj);
    }
    
    countAllLinks();
}


function insertInMainArray(val) { 
    allLinks.unshift(val);
}

function updateMainArray(obj) { 
    for (var i = 0; i < allLinks.length; i++) {
        var val = allLinks[i];

        if (val.id == obj.id) {
            allLinks[i] = obj;
        }
    }
}


function hasChanges(val) { 
    if (val.tags != val.tagsOri) {
        return true;
    }  
    if (val.categories != val.categoriesOri) {
        return true;
    }         
    if (val.deleted != val.deletedOri) {
        return true;
    }
    if (val.info != val.infoOri) {
        return true;
    }
    if (val.classif != val.classifOri) {
        return true;
    }
    if (val.author != val.authorOri) {
        return true;
    }
    if (val.date != val.dateOri) {
        return true;
    }
    
    return false;
}


function updateObject(val, name, value, doErase) {            
    switch(name) {
        case "info":
            if (doErase) {
                val.info = val.infoOri;
            }
            else {
                val.info = value;
            }
            break;  
        case "classif":
            if (doErase) {
                val.classif = val.classifOri;
            }
            else {
                val.classif = value;
            }
            break;  
        case "catchanged":
            if (doErase) {
                val.categories = val.categoriesOri;
            }
            else {
                val.categories = value;
            }
            break;  
        case "tagchanged":
            if (doErase) {
                val.tags = val.tagsOri;
            }
            else {
                val.tags = value;
            }
            break;  
        case "author":
            if (doErase) {
                val.author = val.authorOri;
            }
            else {
                val.author = value;
            }
            break;  
        case "datechanged":
            if (doErase) {
                val.date = val.dateOri;
            }
            else {
                val.date = value;
            }
            break;  
        case "isdeleted":
            if (doErase) {
                val.deleted = val.deletedOri;
            }
            else {
                val.deleted = value;
            }
            break;  
    }
    return val;
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////@ts-check


function readCookie(name) {
    if(localStorage[name])
        return localStorage[name];
    else
        return null;
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function eraseCookie(name) {
    document.cookie = name + '=NULL; path=/;';
}  
    

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
    
var ctrlDown = false,
ctrlKey = 17,
vKey = 86;

$(document).keydown(function(e) {
    if (e.keyCode == ctrlKey) ctrlDown = true;
}).keyup(function(e) {
    if (e.keyCode == ctrlKey) ctrlDown = false;
});


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/*
$(document).keydown(function(e) {
    if ($(e.currentTarget).is($(document))) {
        if (ctrlDown && (e.keyCode == vKey)) {
            navigator.clipboard.readText().then(text => {
                setTimeout(function() { 
                    resetFieldsPopup(); 
                    $('#tweet').val(text);

                    if ($(".addpopup").css('display') == 'none') {
                      openCreatePopup();
                    }
                    parseTweet();
                }, 300);
            }).catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        } 
    }
}); 
*/
$(document).on({
    'dragover dragenter': function(e) {
        e.preventDefault();
        e.stopPropagation();
    },
    'drop': function(e) {
        e.preventDefault();  
        e.stopPropagation();

        e.originalEvent.dataTransfer.items[0].getAsString(function(str)
        {

            if ($(e.target) && $(e.target).attr("id") == "toptitle") {
                $( "#addtweet" ).blur();
                closeallnewlayout();
                resetFieldsPopup(); 
                $('body, html').css('overflow-y', 'hidden');
                
                dblFlag = true;
                dblClickTimeout = setTimeout(function() {     
                  if (dblFlag) {
                      openPopupParsed("https://" + str, 2);
                      dblFlag = false;  
                  }
                }, 500);
            }
            else {
                $( "#addtweet" ).blur();
                closeallnewlayout();
                resetFieldsPopup(); 
                $('body, html').css('overflow-y', 'hidden');

                dblFlag = true;
                dblClickTimeout = setTimeout(function() {     
                  if (dblFlag) {
                      openPopupParsed("https://" + str, 1);
                      dblFlag = false;  
                  }
                }, 500);
            }
            
        })

    }
});
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function countdoubleclick() {

    $("#tweetcount").fadeOut(500);
    
    setTimeout(function() { 
        $("#tweetcount").fadeIn(1500);
    }, 4000);
}  

function countclick() {
    $("#tweetcount").css('opacity', '1');
    
    setTimeout(function() { 
        setTimeout(function() { 
            $("#tweetcount").css('opacity', '0.52');
        }, 2500);
    }, 500);
}  


function expandscreen(obj) {
    var tweeetObj = $(obj).parent().parent();

    if (tweeetObj.find(".innertweet").length > 0) {
        var id = tweeetObj.find("twitter-widget").attr("id").substring(tweeetObj.find("twitter-widget").attr("id").lastIndexOf("-") + 1);
        if (tweeetObj.attr("expanded") != "yes") {
            tweeetObj.find(".innertweet").removeClass("linkCollapsed");
            tweeetObj.find(".innertweet").addClass("linkExpanded");
            tweeetObj.attr("expanded","yes");
        }
        else {
            tweeetObj.find(".innertweet").removeClass("linkExpanded");
            tweeetObj.find(".innertweet").addClass("linkCollapsed");
            tweeetObj.attr("expanded", "no");
        }

    }
    else {
        if (tweeetObj.attr("expanded") != "yes") {
            tweeetObj.find("iframe").removeClass("linkIframeCollapsed");
            tweeetObj.find("iframe").addClass("linkIframeExpanded");
            tweeetObj.attr("expanded","yes");
        }
        else {
            tweeetObj.find("iframe").removeClass("linkIframeExpanded");
            tweeetObj.find("iframe").addClass("linkIframeCollapsed");
            tweeetObj.attr("expanded", "no");
        }
    }
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function customizeSingleTweet(id) {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");
    var isSafari6Plus = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined";
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    var tweetCSS = ".EmbeddedTweet{height:auto !important;background: transparent !important; margin: 0 !important;}.EmbeddedTweet {max-width: none !important;width: 100%;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;} .Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 50px !important;width: 50px !important;position: absolute !important;top: -7px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important; padding-top: 0 !important;}.TwitterCard-container {max-width: 10000px!important;} .TweetInfo-like {display: none !important;} .CallToAction-icon {display: none !important;} .TweetInfo-timeGeo {margin-left: 5px !important;} .CallToAction-text { color: var(--text-color) !important;} .CallToAction-text:hover { opacity: 0.6 !important;} a:hover { opacity: 0.6 !important;}";
      
    if ($('body').hasClass('big')) {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.Tweet-ancestorContents.Tweet-ancestorContents--repliesRefresh > .avatar {left: -8px !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 45px !important; width: 45px !important; position: relative !important; top: -2px !important;min-width: 43px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -8px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important;}.TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;} .TweetInfo-like {display: none !important;} .CallToAction-icon {display: none !important;} .TweetInfo-timeGeo {margin-left: 5px !important;} .CallToAction-text { color: var(--text-color) !important;} .CallToAction-text:hover { opacity: 0.6 !important;} a:hover { opacity: 0.6 !important;}";
    }
    else {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;}.TweetAuthor-name {font-size: 16px !important;}.Avatar:not(.Identity-avatar) {height: 36px !important;width: 36px !important;position: relative !important;min-width: 36px !important;top: 2px !important;}.Avatar.Identity-avatar {width: 16px !important;height: 16px !important;}.TweetAuthor-screenName {font-size: 14px !important;}.Tweet-body{font-size: 16px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -5px !important;}.TweetInfo {font-size: 12px !important;}.CallToAction {font-size: 13px !important;}.Tweet-card {font-size: 14px !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TweetAuthor-avatar{width: 36px !important;height: 36px !important;} .TweetInfo-like {display: none !important;} .CallToAction-icon {display: none !important;} .TweetInfo-timeGeo {margin-left: 5px !important;} .CallToAction-text { color: var(--text-color) !important;} .CallToAction-text:hover { opacity: 0.6 !important;} a:hover { opacity: 0.6 !important;}";    
    }

    var obj = $("#twitter-widget-" + totalrenderedtweets);

    obj.attr("processed", "yes");
    var tweetStyle = document.createElement("style");

    tweetStyle.setAttribute("id", "tweet-style-" + totalrenderedtweets);
    tweetStyle.innerHTML = tweetCSS;
    tweetStyle.type = "text/css"; 

    //if (isAndroid || (isIOSChrome) || (isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && isIEedge === false) || (isOpera === true) || (isSafari6Plus)) {
        
    var styleTag = document.getElementById("twitter-widget-" + totalrenderedtweets).shadowRoot;
        insertAfter(tweetStyle, styleTag.childNodes[0]);

    //} else {
    //    var tweetWidget = document.getElementById("twitter-widget-" + j).contentDocument;
    //    $(tweetWidget.head).prepend(tweetStyle);
    //} 
    
    totalrenderedtweets = totalrenderedtweets + 1;
    if (id) {
        $("#" + id).fadeIn(3000);
    }
    else {
        obj.parent().parent().appendTo($("#main")).fadeIn(1000);
    }
}


function findFirstLink() {
var notFound = true;
var i = -1;
do {
  i = i + 1;
  var obj = $("#twitter-widget-" + i);

  if (obj && obj.length > 0) {
    notFound = false;
  }         
}
while (i < 10000 && notFound); 

return i;
}

function sleep(seconds) 
{
var e = new Date().getTime() + (seconds);
while (new Date().getTime() <= e) {}
}


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.previousSibling);
}



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


    
function showTooltip(event, obj, flag, text) {
    var $element = $(obj);

    if (flag || hasOverflow(obj)) {
        var tooltip = $("#tooltip");

        if (text)
            tooltip.text(text);
        else
            tooltip.text($element.text());

        tooltip.css("top", (event.pageY + 30) + "px");
        /* tooltip.css("left", getTooltipPosition(event.pageX) + "px"); */
    
        tooltip.fadeIn(700);

        setTimeout(function(){
            closeTooltip();
        }, 4000);
    }
}

/* function showFreeTooltip(x, y, text) {
    var tooltip = $("#tooltip");
    tooltip.text(text);

    tooltip.css("top", (y + 70) + "px");
    tooltip.css("left",  (x + 70) + "px");

    tooltip.fadeIn(700);
} */


function getTooltipPosition(pageX) {
    var size = 500;
    if (window.innerWidth < 481) {
        size = 251;
    } 
    else if (window.innerWidth < 1000) {
        size = 387;
    }

    size = window.innerWidth - pageX - size;

    if (size < 0)
        pageX = pageX + size - 40;

    return pageX;
}

function closeTooltip() {
    $("#tooltip").fadeOut(700);
}

function hasOverflow(obj) {
    var $element = $(obj);
    
    var $c = $element
           .clone()
           .css({display: 'inline', width: 'auto', visibility: 'hidden'})
           .appendTo('body');

    if( $c.width() > $element.width() ) {
        $c.remove();
        return true;
    }
    else {
        $c.remove();
        return false;
    }
}




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



//getWebsiteData2('https://smallwarsjournal.com/jrnl/art/victimization-narrative-thematic-analysis-iranian-history-and-strategy')
function getWebsiteData2(url) {

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + url
      }).then(function(data) {
        //cnonsole.log('---------------WEBSITE ' + url + ' ----------------');
        // titulo - checar se é vazia
        
        
        var title = data.substring(data.indexOf("<title") + 7, data.indexOf("</title>"));
        title = title.substring(title.indexOf(">") + 1, data.indexOf("</title>"));
        
        var html = $(data);
        // descricao - checar se é vazia
        //cnonsole.log("Descricao: " + getMetaContent(html, 'description') );

        //cnonsole.log(data)

      });

}

function getMetaContent(html, name) {
  return html.filter((index, tag) => tag && tag.name && tag.name == name).attr('content');
}


//hasAvailableImage('45', 'https://cors-anywhere.herokuapp.com/https://s.wordpress.com/mshots/v1/https://zzzsmallwarsjournal.com/jrnl/art/victimization-narrative-thematic-analysis-iranian-history-and-strategy/')


function nextLink(direction) {
    if (direction == "up") {

    }
    else {
        
    }
}



function startCLWorker(data, hasChanges, execParamId) {
    if (typeof(Worker) !== "undefined") {
        if (typeof(clWorker) == "undefined") {
            clWorker = new Worker("workers/countLinksW.js");
        }

        var workerInput = {};
        workerInput.array = data;
        if ($("#showdeleted2").is(":checked")) {
            workerInput.includeDeleted = true;
        }
        else {
            workerInput.includeDeleted = false;
        }

        clWorker.postMessage(workerInput);

        clWorker.onmessage = function(event) {
            if (event.data.finnish == "yes") {
                clWorker.terminate();
                clWorker = undefined;
                processCountUpdate(event.data.result, hasChanges, execParamId);
            }
            else {
                processCountBlock(hasChanges, execParamId);
            }
        };
    }
}

function startWorker() {
    if (typeof(Worker) !== "undefined") {
      if (typeof(timeoutWorker) == "undefined") {
        timeoutWorker = new Worker("worker.js");
      }
      // mudar o timeout
      //w.postMessage({ "args": [ 500 ] });

      timeoutWorker.onmessage = function(event) {
        
          if (linkArray[currrenderedtweets]) {
            if (currrenderedtweets < 5) {
                if (currrenderedtweets == 0) {
                    $("html, body").scrollTop(0);
                    $("#main").empty();
                }
                if (linkArray[currrenderedtweets] == "T") {
                    if ($("#twitter-widget-" + totalrenderedtweets) && $("#twitter-widget-" + totalrenderedtweets).length > 0) {
                        currrenderedtweets++;
        
                        if ($("#twitter-widget-" + totalrenderedtweets).attr("processed") != "yes") {
                            customizeSingleTweet();
                        }
                    }
                }
                else {

                    $("#" + linkArray[currrenderedtweets]).appendTo($("#main")).fadeIn(1000);
                    
                    if (!isMobile) {
                        idCurr = linkArray[currrenderedtweets];
                        setTimeout(function(){
                            document.getElementById("contentin" + idCurr).addEventListener("click", clickHandler);
                        }, 70);
                    }
                    currrenderedtweets++;
                }
                if (linkArrayToRender[currrenderedtweets + 5]) {
                    renderLink(linkArrayToRender[currrenderedtweets + 5]);
                }
            }
            else {
                
                if (currrenderedtweets == 5) {
                    //stopWorker();
                    closeMenuPopup(null, "2.7");
                    closeSearchPopup();
                    $('#mask').fadeOut(3000);  
                    $('#tweetcount').fadeIn(3800);

/*                     setTimeout(function() {     
                        var element = document.getElementById("13");

                        // smooth scroll to element and align it at the bottom
                        element.scrollIntoView({ behavior: 'smooth', block: 'start'});

                    }, 15190); */
                }
    
                var doExec = false;

                if (new Date().getTime() - datecontrol.getTime() > 200) {
                    datecontrol = new Date();

                    doExec = true;
                }
                

                if (doExec) {
                    renderTimeout = setTimeout(function() {  
                        if (linkArray[currrenderedtweets] == "T") {
                            if ($("#twitter-widget-" + totalrenderedtweets) && $("#twitter-widget-" + totalrenderedtweets).length > 0) {
                                currrenderedtweets++;
                                countercontrol++;
                                if ($("#twitter-widget-" + totalrenderedtweets).attr("processed") != "yes") {
                                    customizeSingleTweet();
                                }
                            }
                        }
                        else {
                            $("#" + linkArray[currrenderedtweets]).appendTo($("#main")).fadeIn(1000);
                    
                            if (!isMobile) {
                                idCurr = linkArray[currrenderedtweets];
                                setTimeout(function(){
                                    document.getElementById("contentin" + idCurr).addEventListener("click", clickHandler);
                                }, 70);
                            }
                            currrenderedtweets++;
                            countercontrol++;
                        }

                        if (linkArrayToRender[currrenderedtweets + 5]) {
                            renderLink(linkArrayToRender[currrenderedtweets + 5]);
                        }

                    }, 190);
                }
            }
          }
          else {
            if (searchtotal > 0 && currrenderedtweets == searchtotal) {
                stopWorker();
                closeMenuPopup(null, "2.7");
                closeSearchPopup();
                $('#mask').fadeOut(3000);  
                $('#tweetcount').fadeIn(3800);
            }
            else {
                renderTimeout = setTimeout(function() {     
                    stopWorker();
                }, 1000);  
            }
          }
      };
    } 
  }
  
function stopWorker() {
    if (typeof(timeoutWorker) != "undefined") {
        timeoutWorker.terminate();
        timeoutWorker = undefined;
    }
}

function clickMenuTooltip(obj, e) {
    if (e)
        e.stopPropagation();

    if (obj)
        fixfocus(obj);

    if (isMobile) {
        showTooltip(event, this, true, $(obj).attr("title"))
    } 
}



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    
    vibrateApp();

    var funcTorun = function() {
        showCalendar(currentMonth, currentYear)
    }; 
    
    slideObjRight("#calendar", funcTorun);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;

    vibrateApp();

    var funcTorun = function() {
        showCalendar(currentMonth, currentYear)
    }; 
    
    slideObjLeft("#calendar", funcTorun);
}

function slideObjLeft(obj, funcTorun) {
    $(obj).animate({
        left: '-=' + (window.innerWidth/ 2)
      },
      {
        queue: false,  
        easing: 'swing',
        duration: 500,
        complete: function(){
            $(obj).hide(); 
    
            if (funcTorun)
                funcTorun()
            $(obj).css("left", (window.innerWidth/ 2) + "px"); 
    
            $(obj).show(); 

            $(obj).animate({
                left: '0px'
              },
              {
                easing: 'swing',
                duration: 500,
                queue: false
           });
       }
   }).animate({
        opacity: 0
    },
    {
        queue: false,  
        easing: 'swing',
        duration: 500,
        complete: function(){
            $(obj).animate({
                opacity: 1
            },
            {
                easing: 'swing',
                duration: 500,
                queue: false
        });
    }
    });
}


function slideObjRight(obj, funcTorun) {
    $(obj).animate({
        left: '+=' + (window.innerWidth/ 2)
      },
      {
        queue: false,  
        easing: 'swing',
        duration: 500,
        complete: function() {
            $(obj).hide(); 

            if (funcTorun)
                funcTorun();
            
            $(obj).css("left", "-" + (window.innerWidth/ 2) + "px"); 
    
            $(obj).show(); 

            $(obj).animate({
                left: '0px'
              },
              {
                easing: 'swing',
                duration: 500,
                queue: false
           });
       }
   }).animate({
        opacity: 0
    },
    {
        queue: false,  
        easing: 'swing',
        duration: 500,
        complete: function(){
            $(obj).animate({
                opacity: 1
            },
            {
                easing: 'swing',
                duration: 500,
                queue: false
        });
    }
    });
}



function fadeObj(obj, funcTorun) {
    $(obj).animate({
        opacity: 0
    },
    {
        queue: false,  
        easing: 'swing',
        duration: 500,
        complete: function(){
            if (funcTorun)
                funcTorun();

            $(obj).animate({
                opacity: 1
            },
            {
                easing: 'swing',
                duration: 500,
                queue: false
        });
    }
    });
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);    
    var funcTorun = function() {
        showCalendar(currentMonth, currentYear)
    }; 
    vibrateApp();

    fadeObj("#calendar");
}

function executeCountersEffect(totalHoursChanged, totalVacationChanged) {
    if (totalVacationChanged && totalHoursChanged) {
        $("#workhours").html(totalHours);
        $("#vacationdays").html(totalVacation);

        setTimeout(function() {     
            $("#vacationdays").css('opacity', 0);
            $(".vdlabel").css('opacity', 0);
            
            setTimeout(function() {     
                $("#vacationdays").css('opacity', 1);
                $(".vdlabel").css('opacity', 1);
                setTimeout(function() {     
                    $("#workhours").css('opacity', 0);
                    $(".whlabel").css('opacity', 0);
                    
                    setTimeout(function() {     
                        $("#workhours").css('opacity', 1);
                        $(".whlabel").css('opacity', 1);
                    }, 550);  
                }, 600); 
            }, 550);  
        }, 600); 
    }
    else if (totalVacationChanged) {
        $("#vacationdays").html(totalVacation);
        setTimeout(function() {     
            $("#vacationdays").css('opacity', 0);
            $(".vdlabel").css('opacity', 0);
            
            setTimeout(function() {     
                $("#vacationdays").css('opacity', 1);
                $(".vdlabel").css('opacity', 1);
            }, 550);  
        }, 600); 
    }
    else if (totalHoursChanged) {
        $("#workhours").html(totalHours);
        setTimeout(function() {     
            $("#workhours").css('opacity', 0);
            $(".whlabel").css('opacity', 0);
            
            setTimeout(function() {     
                $("#workhours").css('opacity', 1);
                $(".whlabel").css('opacity', 1);
            }, 550);  
        }, 600); 
    }

    console.log(allworkingdays + "-" + filledworkingdays);
    if (filledworkingdays > 0) {
        if (allworkingdays == filledworkingdays) {
            $("#monthh3").removeClass('partial');
            if (!$("#monthh3").hasClass('complete')) 
                $("#monthh3").addClass('complete');
        }
        else {
            $("#monthh3").removeClass('complete');
            if (!$("#monthh3").hasClass('partial')) 
                $("#monthh3").addClass('partial');
        }
    }
    else {
        $("#monthh3").removeClass('complete').removeClass('partial');
    }
           
    //$("#workhours").delay(100).fadeOut('slow').delay(50).fadeIn('slow');
}



function daysInMonthCount (month, year) { 
    return new Date(year, month, 0).getDate(); 
} 

var allworkingdays = 0;
var filledworkingdays = 0;

function showCalendar(month, year) {

    totalHours = 0;
    totalVacation = 0;

    for (x=0; x < monthArray.length; x++) {
        var value = monthArray[x];
        if (value == "V") {
            totalVacation++;
        }
        else {
            if (value != undefined && value != "-") {
                totalHours = totalHours + 1;
            }
        }
    }

    $("#workhours").html(totalHours);
    $("#vacationdays").html(totalVacation);

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthh3.innerHTML = months[month];
    yearh3.innerHTML = year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    var firstDaysCounter = 0;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.

        for (let j = 1; j < 8; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                firstDaysCounter = firstDaysCounter + 1;
                cell.classList.add("firstdays");
                cell.classList.add("weekend");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                if (j == 1)
                    break;
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                
                cell.classList.add("lastdays");
                cell.classList.add("weekend");

                cell.appendChild(cellText);
                row.appendChild(cell);
                //break;
            }
            else {
                let cell = document.createElement("td");
                if (j > 5)
                    cell.classList.add("weekend");

                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
    var counterLast = 1;
    var numMonthDays = daysInMonthCount(month +1, year) + 1;

    $( ".table-responsive-sm td" ).each( function( index, element ){
        var elem = $(element);

        if (elem.text()) {
            if (!elem.hasClass("weekend")) {
                elem.bind( "click", function( event ) {
                    cellClick(this, event); 
                });
    
                elem.attr("day", elem.text());
    
                var cellvalue = monthArray[Number(elem.text())];
    
                elem.html("");
    
                elem.append("<div class='day'>" + pad(elem.attr("day"), 2) + "</div>");
                allworkingdays++;

                if (cellvalue) {
                    filledworkingdays++;
                    elem.addClass("selected");
                    if (cellvalue != "V")
                        elem.append("<div class='value hashours' cvalue='" + cellvalue + "' title='" + cellvalue + " hours worked'>" + cellvalue + "h</div>");
                    else
                        elem.append("<div class='value V' cvalue='V' title='vacation day'><i class='fa fa-plane'></i><span>vacations</span></div>");
                }
                else {
                    elem.append("<div class='value novalue' cvalue='-'>-</div>");
                }

                if (!isMobile) {
                    elem.append("<div class='buttons'>"
                    +
                    "<i onclick='javascript: markDay(this, event)' class='fa fa-calendar-check-o' title='Add an 8 hours working day'></i>"
                    +
                    "<i onclick='javascript: markDay(this, event)' class='fa fa-calendar-o' title='Add vacation day'></i>"
                    +
                    "<i onclick='javascript: markDay(this, event)' class='fa fa-calendar-times-o' title='Remove time'></i>"
                    +
                    "</div>");
                }

            }
            else {
                elem.attr("day", elem.text());
                elem.html("");
                elem.append("<div class='day'>" + pad(elem.attr("day"), 2) + "</div>");
            }
        }
        else {
            if (elem.hasClass("firstdays")) {
                elem.append("<div class='day'>" + (numMonthDays - firstDaysCounter) + "</div>");
                firstDaysCounter--;
            }
            else {
                elem.append("<div class='day'>" + pad(counterLast, 2) + "</div>");
                counterLast++;
            }
        }
    
    });
    if (filledworkingdays > 0) {
        if (allworkingdays == filledworkingdays) {
            $("#monthh3").removeClass('partial');
            if (!$("#monthh3").hasClass('complete')) 
                $("#monthh3").addClass('complete');
        }
        else {
            $("#monthh3").removeClass('complete');
            if (!$("#monthh3").hasClass('partial')) 
                $("#monthh3").addClass('partial');
        }
    }
}

var multiselectcounter = 0;

function cellClick(obj, e) {
    e.stopPropagation();

    if (multiselect || isMobile) {
        
        if ($(obj).hasClass('cellselected')) {
            multiselectcounter--;
            $(obj).removeClass('cellselected');
            multiselectmap.set($(obj).attr("day"), null);
            vibrateApp();
        }
        else {
            multiselectmap.set($(obj).attr("day"), $(obj).attr("day"));
            $(obj).addClass('cellselected');
            multiselectcounter++;
            vibrateApp();
        }

        if (multiselectcounter > 0) {
            if (!$(".multidiv").hasClass('hasvalue'))
                $(".multidiv").addClass('hasvalue');
        }
        else {

            if ($(".multidiv").hasClass('hasvalue'))
                $(".multidiv").removeClass('hasvalue');
        }

        if (isMobile) 
            $(".multidiv > div > div > span").html("Selected<span>" + multiselectcounter + "</span>");
        else
            $(".multidiv > div > div > span").html("Multi Select<span>" + multiselectcounter + "</span>");
    }
    else {
        showCalPopup(e, obj);
        //alert($(obj).attr("day"));
    }
}

function changeMultiselectMode(e, flag) {
    if (e)
        e.stopPropagation();
    
    if (isMobile && !flag)
        return false;

    if (multiselect) {
        cleanMultiselect();
    }
    else {
        $( "table.table-responsive-sm" ).addClass('multiselect');
        multiselectmap = new Map();
        multiselect = true;

        if (!$(".multidiv").hasClass('inmulti')) {
            $(".multidiv").addClass('inmulti');
            
            if (isMobile) 
                $(".multidiv > div > div > span").html("Selected<span>0</span>" );
            else
                $(".multidiv > div > div > span").html("Multi Select<span>0</span>" );
        }
    }
}

function cleanMultiselect() {

    if (isMobile) {
        $( "table.table-responsive-sm" ).removeClass('multiselect');
    }
    else {
        $( "table.table-responsive-sm" ).removeClass('multiselect');
        multiselect = false;
    }
    $( "table.table-responsive-sm td" ).each( function( index, element ){
        $(element).removeClass('cellselected');
    });

    multiselectcounter = 0;
    multiselectmap = new Map();

    if ($(".multidiv").hasClass('inmulti')) {
        $(".multidiv").removeClass('hasvalue');            
        if (isMobile) {
            $(".multidiv > div > div > span").html("Selected<span>0</span>" );

        } 
        else {
            $(".multidiv > div > div > span").html("Multi Select" );

            $(".multidiv").removeClass('inmulti');
        }
    }

}

function configureMobileMultiselectMode() {
}

function multiselectEightHours(obj, e) {
    if (e)
        e.stopPropagation();

    if (multiselectcounter == 0) {
        vibrateApp(600);
        return false;
    }

    vibrateApp();

    var localTotalHoursChanged = false;
    var localVacationChanged = false;

    for (i=0; i < 32; i++) {
        var daySelected = multiselectmap.get(i.toString());

        if (daySelected) {
            markDay8Hours(null, daySelected);

            if (globalTotalHoursChanged)
                localTotalHoursChanged = true;
            if (globalVacationChanged)
                localVacationChanged = true;
        }
    }

    executeCountersEffect(localTotalHoursChanged, localVacationChanged);

    cleanMultiselect();
}

function markDay8Hours(obj, day) {
    var table = null;

    if (obj)
        table = obj;
    else 
        table = $(".table-responsive-sm td[day=" + day + "]");

    var displayValue = table.find("div.value");
    globalTotalHoursChanged = false;
    globalVacationChanged = false;

    if (displayValue.attr("cvalue") == "V") {
        totalVacation--;
        globalVacationChanged = true;
        totalHours = totalHours + 1;
        globalTotalHoursChanged = true;
    }
    else if (displayValue.attr("cvalue") != "8") {
        totalHours = totalHours + 1;
        globalTotalHoursChanged = true;

        filledworkingdays++; 
    }
    displayValue.html("8h");
    displayValue.attr("cvalue", "8");

    displayValue.removeClass("novalue");
    displayValue.removeClass("V");
    if (!displayValue.hasClass("hashours"))
        displayValue.addClass("hashours");

    if(!table.hasClass("selected"))
        table.addClass("selected");   
}

function multiselectRemoveDay(obj, e) {
    if (e)
        e.stopPropagation();

    if (multiselectcounter == 0) {
        vibrateApp(600);
        return false;
    }

    vibrateApp();

    var localTotalHoursChanged = false;
    var localVacationChanged = false;

    for (i=0; i < 32; i++) {
        var daySelected = multiselectmap.get(i.toString());

        if (daySelected) {
            markRemoveDay(null, daySelected);

            if (globalTotalHoursChanged)
                localTotalHoursChanged = true;
            if (globalVacationChanged)
                localVacationChanged = true;
        }
    }

    executeCountersEffect(localTotalHoursChanged, localVacationChanged);

    cleanMultiselect();
}

function markRemoveDay(obj, day) {
    var table = null;

    if (obj)
        table = obj;
    else 
        table = $(".table-responsive-sm td[day=" + day + "]");

    var displayValue = table.find("div.value");
    globalTotalHoursChanged = false;
    globalVacationChanged = false;

    console.log("-" + displayValue.attr("cvalue") +  "-")
    if (displayValue.attr("cvalue") == "V") {
        totalVacation--;
        globalVacationChanged = true;
        filledworkingdays--;
    }
    else if (displayValue.attr("cvalue") == "8") {
        totalHours = totalHours - 1;
        globalTotalHoursChanged = true;
        
        filledworkingdays--;
    }
    displayValue.html("-");
    displayValue.attr("cvalue", "-");
    displayValue.removeClass("hashours");
    displayValue.removeClass("V");

    if (!displayValue.hasClass("novalue"))
        displayValue.addClass("novalue");

    if(table.hasClass("selected"))
        table.removeClass("selected");
}

function multiselectVacations(obj, e) {
    if (e)
        e.stopPropagation();

    if (multiselectcounter == 0) {
        vibrateApp(600);
        return false;
    }

    vibrateApp();

    var localTotalHoursChanged = false;
    var localVacationChanged = false;

    for (i=0; i < 32; i++) {
        var daySelected = multiselectmap.get(i.toString());

        if (daySelected) {
            markDayVacations(null, daySelected);

            if (globalTotalHoursChanged)
                localTotalHoursChanged = true;
            if (globalVacationChanged)
                localVacationChanged = true;
        }
    }

    executeCountersEffect(localTotalHoursChanged, localVacationChanged);

    cleanMultiselect();
}

function markDayVacations(obj, day) {
    var table = null;

    if (obj)
        table = obj;
    else 
        table = $(".table-responsive-sm td[day=" + day + "]");

    var displayValue = table.find("div.value");
    globalTotalHoursChanged = false;
    globalVacationChanged = false;

    if (displayValue.attr("cvalue") == "8") {
        totalHours = totalHours - 1;
        globalTotalHoursChanged = true;
        totalVacation++;
        globalVacationChanged = true;
    }
    else if (displayValue.attr("cvalue") == "-") {
        totalVacation++;
        globalVacationChanged = true;

        filledworkingdays++; 
    }
    
    displayValue.html("<i class='fa fa-plane'></i><span>vacations</span>");
    displayValue.attr("cvalue", "V");
    displayValue.removeClass("hashours");
    displayValue.removeClass("novalue");

    if (!displayValue.hasClass("V"))
        displayValue.addClass("V");

    if(!table.hasClass("selected"))
        table.addClass("selected");
}

function markDay(obj, e) {
    if (e)
        e.stopPropagation();

    globalTotalHoursChanged = false;
    globalVacationChanged = false;
    
    if ($(obj).hasClass("fa-calendar-check-o")) { // 8 horas
        markDay8Hours($(obj).parent().parent());

    }
    else if ($(obj).hasClass("fa-calendar-times-o")) { // remover
        markRemoveDay($(obj).parent().parent());
    }
    else { // ferias
        markDayVacations($(obj).parent().parent());
    }

    executeCountersEffect(globalTotalHoursChanged, globalVacationChanged);
}


function openTimesheet(obj, e) {
    vibrateApp();

    closeMenuPopup();

    $(".fa-folder-open.logo").fadeOut(700);

    $("#backdiv .container").fadeIn(1100);
}


function vibrateApp(duration) {
    var dur = 50;
    if (duration)
        dur = duration;
    window.navigator.vibrate(dur);
}


function selectAll() {
    if (multiselectcounter != allworkingdays) {
        if (!$( "table.table-responsive-sm" ).hasClass('multiselect'))
            $( "table.table-responsive-sm" ).addClass('multiselect');

        multiselectmap = new Map();
        multiselect = true;

        if (!$(".multidiv").hasClass('inmulti')) {
            $(".multidiv").addClass('inmulti');
        }
                
        $( ".table-responsive-sm td" ).each( function( index, element ){
            var elem = $(element);

            if (elem.text()) {
                if (!elem.hasClass("weekend")) {
                    if (!elem.hasClass('cellselected'))
                        elem.addClass('cellselected');
                    multiselectmap.set(elem.attr("day"), elem.attr("day"));
                }
            }
        });

        multiselectcounter = allworkingdays; 

        if (isMobile) 
            $(".multidiv > div > div > span").html("Selected<span>" + multiselectcounter + "</span>");
        else
            $(".multidiv > div > div > span").html("Multi Select<span>" + multiselectcounter + "</span>" );

        if (!$(".multidiv").hasClass('hasvalue'))
            $(".multidiv").addClass('hasvalue');
    }
    else {
        multiselectmap = new Map();
                
        $( ".table-responsive-sm td" ).each( function( index, element ){
            var elem = $(element);

            if (!elem.hasClass("weekend")) {
                elem.removeClass('cellselected');
                multiselectmap.set(elem.attr("day"), null);
            }
        });

        multiselectcounter = 0; 

        if (isMobile) {
            $(".multidiv > div > div > span").html("Selected<span>0</span>");
        }
        else {
            $(".multidiv > div > div > span").html("Multi Select<span>0</span>" );
        }
        if (!$(".multidiv").hasClass('inmulti')) {
            $(".multidiv").addClass('inmulti');
        }
        $(".multidiv").removeClass('hasvalue');
    }

}


    
function showCalPopup(event, obj) {
    var calpopup = $("#calpopup");

    if ($(obj).is( "td")) {
        $(obj).addClass("popupopen");
    }

    if (calpopup.hasClass("customhours"))
        calpopup.removeClass("customhours")
    
    calpopup.css("top", (event.pageY - 45) + "px");
    calpopup.css("left", (event.pageX - 100) + "px");

    calpopup.parent().fadeIn(700);

/*  setTimeout(function(){
        closeCalpopup();
    }, 5000); */
}


function closeCalpopup() {
    $( ".table-responsive-sm td" ).each( function( index, element ){
        $(element).removeClass("popupopen");
    });
    $("#calpopup").parent().fadeOut(700);
}


function calpopupselectonchange(obj) {
    if ($(obj).val() == "2") {
        if (!$("#calpopup").hasClass("customhours"))
            $("#calpopup").addClass("customhours");
    }
    else {
        $("#calpopup").removeClass("customhours");
    }
}

function calPopupaddTime(e) {
    $("#calpopupselect")
}

function stopPropagFunc(e) {
    e.stopPropagation();
}
