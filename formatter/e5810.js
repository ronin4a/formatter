function CheckDecimal(inputtxt)
{var numbers=/^[0-9]+(\.[0-9]+)+$/;if(inputtxt.match(numbers))
{return true;}
else
{return false;}}
function propsodds(theseodds,theseoddsid){var theseodds=document.getElementById('usodds').value;var theseoddsid="usodds";var oddstype="us";var usodds=document.getElementById('usodds');var decodds=document.getElementById('decodds');var probodds=document.getElementById('probodds');var myDec;var mycheckdec=CheckDecimal(theseodds);if(mycheckdec){oddstype='dec';}
if(oddstype=='us'){myDec=US2dec(theseodds);}
else if(oddstype=='dec'){if(1*theseodds<0){theseodds=Math.abs(1*theseodds);}
if(1*theseodds<1){theseodds=1;}
myDec=parseFloat(theseodds).toFixed(4);}
decodds.value=myDec;probodds.value=dec2prob(myDec);props2odds();var set1=document.getElementById('probodds').value;set1=new Number(set1.replace("%",""));var set2=document.getElementById('prob2odds').value;set2=new Number(set2.replace("%",""));var prob1=set1+set2;if(prob1<100)
{alert('You entered odds where an arbitrage opportunity exists');}
var newprob=(set1/prob1)*100;var newprob2=(set2/prob1)*100;document.getElementById('novig1').value=newprob.toFixed(2)+"%";document.getElementById('novig2').value=newprob2.toFixed(2)+"%";var newmoney=newprob/100;newmoney=1/newmoney;var newper=dec2US(newmoney);var newmoney2=newprob2/100;newmoney2=1/newmoney2;var newper2=dec2US(newmoney2);document.getElementById('novigm1').value=newper;document.getElementById('novigm2').value=newper2;}
function props2odds(theseodds,theseoddsid){var theseodds=document.getElementById('us2odds').value;var theseoddsid="us2odds";var oddstype="us";var usodds=document.getElementById('us2odds');var decodds=document.getElementById('dec2odds');var probodds=document.getElementById('prob2odds');var myDec;var mycheckdec=CheckDecimal(theseodds);if(mycheckdec){oddstype='dec';}
if(oddstype=='us'){myDec=US2dec(theseodds);}else if(oddstype=='dec'){if(1*theseodds<0){theseodds=Math.abs(1*theseodds);}
if(1*theseodds<1){theseodds=1;}
myDec=parseFloat(theseodds).toFixed(4);}else if(oddstype=='prob'){var sThisOdds=""+theseodds;theseodds=fmtNumber(sThisOdds);if(theseodds>=1)theseodds/=100;myDec=prob2dec(theseodds);}
decodds.value=myDec;probodds.value=dec2prob(myDec);}
function dec2US(myDec){var myUS;myDec=parseFloat(myDec);if(myDec<=1||myDec==NaN){myUS=NaN;}else if(myDec<2){myUS=-100/(myDec-1);}else{myUS=(myDec-1)*100;}
return(myUS>0?"+":"")+Math.round(myUS*100)/100;}
function US2dec(myUS){var myDec;myUS=parseFloat(myUS);if(Math.abs(myUS)<100||myUS==NaN){myDec=NaN;}else if(myUS>0){myDec=1+myUS/100;}else{myDec=1-100/myUS;}
return myDec.toFixed(4);}
function prob2dec(prob){return(1/fmtNumber(prob)).toFixed(4);}
function dec2prob(dec){return fmtPercent(1/dec);}
function fmtNumber(myString){myString=""+myString;myString=myString.replace(/\$/g,"");myNum=myString.replace(/\,/g,"");if(myString.match(/\%$/g,"")){myNum=myString.replace(/\%$/g,"")
mynum=parseFloat(myNum)/100;}
return(1*myNum);}
function fmtPercent(myNum){if((""+myNum).match(/\%$/g,"")){myNum=myNum.replace(/\%$/g,"");myNum/=100;}
return(((myNum*100).toFixed(2))+"%");}
function addCommas(nStr){nStr+='';var x=nStr.split('.');var x1=x[0];var x2=x.length>1?'.'+x[1]:'';var rgx=/(\d+)(\d{3})/;while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+','+'$2');}
return x1+x2;};function responsiveMobileMenu(){jQuery('.rmm').each(function(){jQuery(this).children('ul').addClass('rmm-main-list');var $style=jQuery(this).attr('data-menu-style');if(typeof $style=='undefined'||$style==false)
{jQuery(this).addClass('graphite');}
else{jQuery(this).addClass($style);}
var $width=0;jQuery(this).find('ul li').each(function(){$width+=jQuery(this).outerWidth();});if(jQuery.support.leadingWhitespace){jQuery(this).css('max-width','1024px');}
else{jQuery(this).css('width','1024px');}});}
function getMobileMenu(){jQuery('.rmm').each(function(){var menutitle=jQuery(this).attr("data-menu-title");if(menutitle==""){menutitle="Menu";}
else if(menutitle==undefined){menutitle="Menu";}
var $menulist=jQuery(this).children('.rmm-main-list').html();var $menucontrols="<div class='rmm-toggled-controls'><div class='rmm-toggled-title'>"+menutitle+"</div><div class='rmm-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></div>";jQuery(this).prepend("<div class='rmm-toggled rmm-closed'>"+$menucontrols+"<ul>"+$menulist+"</ul></div>");});}
function adaptMenu(){jQuery('.rmm').each(function(){var $width=jQuery(this).css('max-width');$width=$width.replace('px','');if(jQuery(this).parent().width()<930){jQuery(this).children('.rmm-main-list').hide(0);jQuery(this).children('.rmm-toggled').show(0);}
else{jQuery(this).children('.rmm-main-list').show(0);jQuery(this).children('.rmm-toggled').hide(0);}});}
jQuery(function(){responsiveMobileMenu();getMobileMenu();adaptMenu();jQuery('.rmm-toggled, .rmm-toggled .rmm-button').click(function(){if(jQuery(this).is(".rmm-closed")){jQuery(this).find('ul').stop().show(300);jQuery(this).removeClass("rmm-closed");}
else{jQuery(this).find('ul').stop().hide(300);jQuery(this).addClass("rmm-closed");}});});jQuery(window).resize(function(){adaptMenu();});
