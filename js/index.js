$(function(){
    //网页换肤
    $(".top-ul li").bind("click",function(){
        $(this).addClass("glyphicon glyphicon-ok") //添加样式
        .siblings().removeClass("glyphicon glyphicon-ok"); //去点同辈的样式
        $("#cssflie").attr("href","css/"+this.id+".css");  // 换上不同的皮肤
       $.cookie("my_css",this.id,{expires:10,path:'/'});  //储存

       var cookie_skin = $.cookie("my_css");
        if(cookie_skin){
            $(this).addClass("glyphicon glyphicon-ok") //添加样式
            .siblings().removeClass("glyphicon glyphicon-ok"); //去点同辈的样式
            $("#cssflie").attr("href","css/"+this.id+".css");  // 换上不同的皮肤
            $.cookie("my_css",cookie_skin,{path:'/',expires:10});  //储存
        }

    })
    //轮播图
    //每一个固定时间移动图片
    var s = 0;    //为了初始化时间    每次点击后让时间重置为0；
    var time = setInterval(function(){
        s++;
        if(s >= 40){
            picLoop();
            s=0;
        }
    },100);
    var index = 0;
    var w = $(".banner-img li").width();

    //让图片动起来
    function picLoop(){
        index++;
        if(index >= 5){index=0};
        $(".banner-img").animate({"left":-w*index+"px"});
        $(".banner-number li").eq(index).addClass("active")
        .siblings().removeClass("active");
    }
    //鼠标经过，停止动画   离开接着动画
    $(".banner").hover(function(){
        clearInterval(time);

    },function(){
        time = setInterval(picLoop,3000);
    })

    //点击对应的数字跳转到对应的图片
    $(".banner-number li").click(function(){
        s=0; 
        $(this).addClass("active")
        .siblings().removeClass("active");
        index = $(this).index();
        $(".banner-img").animate({"left":-w*index+"px"});
    })

      //ajax请求
      $.ajax({
        type:"get",
        url:"http://localhost:3000/asd",
        dataType:"json",
        success:function(res){
            console.log(res);
            $.each(res,function(index,item){
                $(".oriduct-list ul").append('<li>'+
                '<div class="o-l-img">'+
                    '<img src="'+item.url+'"/>'+
                '</div>'+
                '<p>'+item.name+'<br /><span>'+item.price+'</span><s>'+item.cost+'</s></p>'+
            '</li>');
            })
            ajaxa();
        },
        error:function(error){
            console.log(error);
        }
    })

    //新款上市  
    // 列表的循环播放
    function ajaxa(){
         
    var page = 1;   //表示第一个页面
    var z = 4;      //4个为一个页面
    var len =  $(".oriduct-list li").length; //获得其长度
    var page_con = Math.ceil(len/z); //分为多少页   向上取整
    var o_w = $(".oriduct-list").width(); //获得其宽度
    var l_ul = $(".oriduct-list ul");
    console.log(len);
    console.log(page_con);
    $(".down").bind("click",function(){
        if( !l_ul.is(":animated") ){
            if(page >= page_con){
                l_ul.animate({"left":"0"},100);
                page = 1;
                
            }else{
                l_ul.animate({"left":'-='+o_w+"px"},600);
                page++;
            }
        }
    })

    //点击上一页
    $(".up").click(function(){
        if( !l_ul.is(":animated") ){
            if(page === 1){ 
                l_ul.animate({left:'-='+o_w*(page_con-1)+"px"},600);
                page = page_con;
            }else{
                
                l_ul.animate({"left":'+='+o_w+"px"},600);
                page--; 
            }
        }
    })
    }
   

    //最新动态
    $(".dynamic-title p").bind("click",function(){
        var $ul = $(".dynameic-con");
        if($ul.is(":visible")){
            $ul.slideUp(500);
            $(".dynamic").animate({"height":"50px"},500);
            $(this).css("transform","rotate(-180deg)");
           
        }else{
            $ul.slideDown(500);
            $(".dynamic").animate({"height":"260px"},500);
            $(this).css("transform","rotate(0deg)");
        } 
    })
    //产品分类
    $(".classify-title p").bind("click",function(){
        var $ul1 = $(".classify-con");
        if($ul1.is(":visible")){
            $ul1.slideUp(500);
            $(".classify").animate({"height":"50px"},500);
            $(this).css("transform","rotate(-180deg)");
        }else{
            $ul1.slideDown(500),
            $(".classify").animate({"height":"550px"},500);
            $(this).css("transform","rotate(0deg)");
        }
    })
    //衬衫 
    $(".shirt").click(function(){
        if($(".shirt-con").is(":visible")){
            $(".shirt-con").hide(300);
            $(".shirt span").css({"transform":"rotate(-180deg)"})
        }else{
            $(".shirt-con").show(300);
            $(".shirt span").css({"transform":"rotate(0deg)"})
           
        }
    })
    //卫衣
    $(".fleece").click(function(){
        if($(".fleece-con").is(":visible")){
            $(".fleece-con").hide(300);
            $(".fleece span").css({"transform":"rotate(-180deg)"})
        }else{
            $(".fleece-con").show(300);
            $(".fleece span").css({"transform":"rotate(0deg)"})
           
        }
    })
    //裤子
    $(".pants").click(function(){
        if($(".pants-con").is(":visible")){
            $(".pants-con").hide(300);
            $(".pants span").css({"transform":"rotate(-180deg)"})
        }else{
            $(".pants-con").show(300);
            $(".pants span").css({"transform":"rotate(0deg)"})
           
        }
    })
})