var h = document.body.clientHeight;
var mh = document.getElementById('menu').offsetHeight;

$('.page').css('height',h-mh+'px');

var map = new BMap.Map("container");	// 创建地图实例  

var point = new BMap.Point(116.404, 39.915);	// 创建点坐标  

var geolocation = new BMap.Geolocation();
// 开启SDK辅助定位
// geolocation.enableSDKLocation();
geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.centerAndZoom(r.point, 20);
        // map.panTo(r.point);
        // alert('您的位置：'+r.point.lng+','+r.point.lat);
        var point = new BMap.Point(r.point.lng,r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function(rs){
            var addComp = rs.addressComponents; 
            //console.log(rs.address);//地址信息
            //alert(rs.address);//弹出所在地址
           $('#user_location').val(rs.address);
           $('#td_location').html(rs.address);
        });
    }
    else {
        alert('failed'+this.getStatus());
    }        
});

// map.centerAndZoom(point, 15);	// 初始化地图，设置中心点坐标和地图级别

map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

// map.addControl(new BMap.NavigationControl()); 	//平移缩放控件

// map.addControl(new BMap.ScaleControl());	//比例尺

// map.addControl(new BMap.OverviewMapControl());  //缩略地图

// map.addControl(new BMap.MapTypeControl());   //地图类型

// map.setCurrentCity("北京");  // 仅当设置城市信息时，MapTypeControl的切换功能才能可用  

var opts = {anchor: BMAP_ANCHOR_BOTTOM_RIGHT,offset: new BMap.Size(5, 5)} 

//map.addControl(new BMap.GeolocationControl(opts));	//定位

// 定义一个控件类，即function    
function ZoomControl(){    
    // 设置默认停靠位置和偏移量  
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;    
    this.defaultOffset = new BMap.Size(10, 10);    
}    
// 通过JavaScript的prototype属性继承于BMap.Control   
// ZoomControl.prototype = new BMap.Control();

// 自定义控件必须实现initialize方法，并且将控件的DOM元素返回   
// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中   
// ZoomControl.prototype.initialize = function(map){    
//     // 创建一个DOM元素   
//     var div = document.createElement("div");    
//     // 添加文字说明    
//     div.appendChild(document.createTextNode("放大2级"));    
//     // 设置样式    
//     div.style.cursor = "pointer";    
//     div.style.border = "1px solid gray";    
//     div.style.backgroundColor = "white";    
//     // 绑定事件，点击一次放大两级    
//     div.onclick = function(e){  
//         map.zoomTo(map.getZoom() + 2);    
//     }    
//     // 添加DOM元素到地图中   
//     map.getContainer().appendChild(div);    
//     // 将DOM元素返回  
//     return div;    
//  }

 // 创建控件实例    
var myZoomCtrl = new ZoomControl();    
// 添加到地图当中    
map.addControl(myZoomCtrl);

// var marker = new BMap.Marker(point);        // 创建标注    
// map.addOverlay(marker);                     // 将标注添加到地图中 

// map.addEventListener("dragend", function(){    
//     var center = map.getCenter();    
//     alert("地图中心点变更为：" + center.lng + ", " + center.lat);    
// }
// ); 

$('#page_btn').children().click(function(){
    var topage = '#page_'+($(this).attr('index'));
    $('.page').css('display','none');
    $('#page_btn').children().attr('class','');
    $(this).attr('class','active');
    $(topage).css('display','block');
})

$('#dbox_close').click(function(){
    $('#data_box').slideToggle(500);
    $('#mask1').fadeOut(500);
    $('#moreInput, #moneyInput, #content_input, #datepick, #moneyInput, #moreInput').val('');
    $('#dbox_language').val('西班牙语');
    $('#dbox_type').val('普通陪同');
})

$('#data_btn').click(function(){
    $('#data_box').slideToggle(500);
    $('#mask1').fadeIn(500);
})

// document.getElementById('datepick').value = new Date();

// $("#datepick").datepicker({minDate:new Date()});

$('#data_make').click(function(){
    if ( $('#content_input').val() && $('#moneyInput').val() ) {
        $('#data_box').fadeOut("300",function(){
         $('#data_succeed_box').slideToggle(500); 
     })
    }else if(! $('#content_input').val()){
        alert('请输入工作内容！');
    }else if(! $('#moneyInput').val()){
        alert('请输入薪酬！');
    }
})

$('#ds_close_btn').click(function(){
    $('#data_succeed_box').slideToggle(500);
    $('#mask1').fadeOut("500",function(){
        var newObox = $('<div>').addClass('order_box').prependTo($('#oBox_container'));
        newObox.html('<table class="obox_style"><tr><td class="col_1"><span>语种：</span><span class="obox_language">'
            + $('#dbox_language').val() +'</span></td><td class="col_2"><span>薪酬：</span><span class="obox_money">'
            + $('#moneyInput').val() +'元/小时</span> </td><td rowspan="3" class="more_btn"><img src="img/more_btn.png" class="mbtn"></td></tr><tr><td class="col_1"><span>工作类型：</span><span class="obox_type">'
            + $('#dbox_type').val() + '</span></td><td class="col_2"><span>开始时间：</span><span class="obox_time">'
            + $('#datepick').val() + '</span> </td> </tr><tr><td class="col_1"><span>工作内容：</span><span class="obox_content">'
            + $('#content_input').val() + '</span></td><td class="col_2"><span>工作地点：</span><span class="obox_location">'
            + $('#td_location').html() + '</span> <span class="obox_more">'
            + $('#moreInput').val() +'</span></td> </tr> </table>');
        newObox.css('display','none');
        newObox.slideToggle(500);
        $('#pay2_language').html($('#dbox_language').val());
        $('#pay2_type').html($('#dbox_type').val());
        $('#pay2_location').html($('#td_location').html());
        $('#pay2_content').html($('#content_input').val());
        $('#pay2_time').html($('#datepick').val());
        $('#pay2_money').html($('#moneyInput').val()+'元/小时');

        $('#p2_btn').click();
        setTimeout(function(){
            $('#user_data').fadeOut(300);
            $('.pop_box_style1').css('display','none');
            $('#mask2').css('display', 'none');
            $('#p1_btn').click();
            if( $('#mask1').css('display') == 'none'){
                $('#mask1').fadeIn(500);
            }
            $('#succeed_box').slideToggle(500);
        },3000);
    });
    
})

        // setTimeout(function(){
        //     $('#user_data').fadeOut(300);
        //     $('.pop_box_style1').css('display','none');
        //     $('#mask2').css('display', 'none');
        //     $('#p1_btn').click();
        //     if( $('#mask1').css('display') == 'none'){
        //         $('#mask1').fadeIn(500);
        //     }
        //     $('#succeed_box').slideToggle(500);
        // },3000);

$('#s_close_btn').click(function(){
    $('#succeed_box').slideToggle(500);
    $('#mask1').fadeOut(500);   
})

$('#checke_translator').click(function(){
    $('#succeed_box').fadeOut("300",function(){
        $('#find_succeed_box').slideToggle(500); 
    })
})

// var oBox = document.getElementById("page_2");
// oBox.onclick = function (ev) {
//   var ev = ev || window.event;
//   var target = ev.target || ev.srcElement;
//   if(target.className == 'mbtn'){
//     // $('#mask').fadeIn(500);
//     // $('#order_info_box').slideToggle(500);
//     var 
//     var ob_lgg = target.parents('.obox_style');
//     alert(ob_lgg.attr('class'));
//   }
// }

$('#page_2').on('click','.mbtn',function(ev){
    var target = $(ev.target);
    $('#mask2').fadeIn(500);
    $('#order_info_box').slideToggle(500);
    $('#oibox_language').html(target.parents('.obox_style').find('.obox_language').html());
    $('#oibox_money').html(target.parents('.obox_style').find('.obox_money').html());
    $('#oibox_type').html(target.parents('.obox_style').find('.obox_type').html());
    $('#oibox_time').html(target.parents('.obox_style').find('.obox_time').html());
    $('#oibox_content').html(target.parents('.obox_style').find('.obox_content').html());
    $('#oibox_location').html(target.parents('.obox_style').find('.obox_location').html());
    $('#oibox_more').html(target.parents('.obox_style').find('.obox_more').html());
})

$('#oibox_close').click(function(){
    $('#order_info_box').slideToggle(500);
    $('#mask2').fadeOut(500);   
})

$('#fsbox_close').click(function(){
    $('#find_succeed_box').slideToggle(500);
    $('#mask1').fadeOut(500);   
})

var translator1 = {"gender":"男", "major":"英语文学", "experience":"口译两年", "Stimes":"总共1551次"};
var translator2 = {"gender":"女", "major":"高级翻译", "experience":"口译一年", "Stimes":"总共926次"};

var currentTranslator = 1;

changeTranslator(translator1);

function changeTranslator(translator){
    $('#gender').html(translator.gender);
    $('#major').html(translator.major);
    $('#experience').html(translator.experience);
    $('#Stimes').html(translator.Stimes);    
}

$('#next_btn').click(function(){
    if (currentTranslator==1) {
        changeTranslator(translator2);
        $('#next_btn').attr('src','img/return_btn.png');
        currentTranslator = 2;
    }
    else{
        changeTranslator(translator1);
        $('#next_btn').attr('src','img/next_btn.png');
        currentTranslator = 1;
    }
})


// fs_deal
$('#fs_deal').click(function(){
    $('#find_succeed_box').fadeOut("300",function(){
        $('#confirm_chose_box').fadeIn(300); 
    }) 
})

// ccbox_no_btn
$("#ccbox_no_btn").click(function(){
    $('#confirm_chose_box').fadeOut("300",function(){
        $('#find_succeed_box').slideToggle(500); 
    }) 
})

// ccbox_yes_btn
$("#ccbox_yes_btn").click(function(){
    $('#confirm_chose_box').fadeOut("300",function(){
        $('#pay1_succeed_box').slideToggle(500); 
    }) 
})

// close_btn_style2
$("#pay1_close_btn").click(function(){
    $('#pay1_succeed_box').fadeOut("300",function(){
        $('#wait_translator_box').fadeIn(300); 
    }) 
})

// click_begin_btn
$("#click_begin_btn").click(function(){
    $('#wait_translator_box').fadeOut("300",function(){
        $('#confirm_arrive_box').fadeIn(300); 
    }) 
})


var s1=0;
    m1=0;
    h1=0;
    stop=true;
function cal()
{
  s1=s1+1
  if (s1==60)
  {   m1=1+m1
      s1=0
   }
  if (m1==60)
  {   h1=h1+1
      m1=0
  }
  $('#count_time').html(h1+":"+m1+":"+s1);
  if(stop){
    setTimeout("cal()",1000);
  } 
}

// cabox_yes_btn
$("#cabox_yes_btn").click(function(){
    $('#confirm_arrive_box').fadeOut("300",function(){
        $('#timing_box').slideToggle(500); 
        cal();
    }) 
})

// cabox_no_btn
$("#cabox_no_btn").click(function(){
    $('#confirm_arrive_box').fadeOut("300",function(){
        $('#wait_translator_box').fadeIn(300); 
    }) 
})

// end_timing
$('#end_timing').click(function(){
    $('#timing_box').fadeOut("300",function(){
        $('#confirm_done_box').fadeIn(300); 
    }) 
})

// cdbox_no_btn
$("#cdbox_no_btn").click(function(){
    $('#confirm_done_box').fadeOut("300",function(){
        $('#timing_box').slideToggle(500); 
    }) 
})

// cdbox_yes_btn
$("#cdbox_yes_btn").click(function(){
    stop=false;
    $('#pay2_time').html(h1+":"+m1+":"+s1);
    var moneyPerh = $('#moneyInput').val();
    var moneyTopay = moneyPerh*(h1+m1/60+s1/3600);
    $('#pay2_needmoney').html(moneyTopay.toFixed(2) + '元');
    $('#confirm_done_box').fadeOut("300",function(){
        $('#pay2_box').slideToggle(500); 
    }) 
})

//pay2_btn
$("#pay2_btn").click(function(){
    $('#pay2_box').fadeOut("300",function(){
        $('#pay2_succeed_box').slideToggle(500); 
    }) 
})

// pay2_close_btn
$("#pay2_close_btn").click(function(){
    $('#pay2_box').fadeOut("300",function(){
        $('#moreInput, #moneyInput, #content_input, #datepick, #moneyInput, #moreInput').val('');
        $('#dbox_language').val('西班牙语');
        $('#dbox_type').val('普通陪同');
        s1=0;
        m1=0;
        h1=0;
        stop=true;
        $('#pay2_succeed_box').slideToggle("500",function(){
            $('#user_data').fadeIn(300);
        }) 
        $('#mask1').fadeOut(500);    
    }) 
})