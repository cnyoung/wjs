$(function(){
    // 轮播图初始化
    // $('.carousel').carousel({
    //     interval: 5000, /*自动轮播间隔时间，默认为5000，false代表不自动轮播*/
    //     pause:'hover'  /*鼠标进入，停止轮播，鼠标离开开始轮播，默认是hover,null不受影响*/
    // });


    //发请求：向.json文件发送ajax请求，返回.json文件中定义好的对象
    //注意：返回的是js格式对象/数组

    // 模板动态生成轮播图
    //定义一个标志位，标志此时是哪个终端
    var flag = true;
    $.ajax({
        type:'get',/*重在获取*/
        url:'./data/imgData.json',
        success:function (obj) {  
            // console.log(obj);

            //获取视口大小
            var w = $(window).width();
            if(w > 768){
                // flag代表此时不是移动端，是PC端
                flag = false;
            }
            // 调用模板
            var html = template('imgTpl',{'list':obj,'isMobile':flag});
            $('.carousel-inner').html(html);

            // 模板动态生成小点
            var html2 = template('indTpl',{'inds':obj});
            // console.log(html2);
            $('.carousel-indicators').html(html2);
        }
    });

    // 手指滑动 切换上一页/下一页
    var slide = document.querySelector('.slide');
    var startX,endX;
    slide.addEventListener('touchstart',function (e) {
        startX = e.targetTouches[0].clientX;
    });
    slide.addEventListener('touchend',function (e) {
        endX = e.changedTouches[0].clientX;
        if((Math.abs(endX - startX)) > 50){
            // 切换
            if((endX - startX) > 0){
                // 终点 - 起点 > 0
                // 手指从左往右滑，上一张
                $('.carousel').carousel('prev');
            }else{
                // 终点 - 起点 < 0
                // 手指从右往左滑，下一站
                $('.carousel').carousel('next');
            }
        }
    });


    // 宝 北 --初始化
    $('[data-toggle="tooltip"]').tooltip();

    // 产品裂变菜单项可左右拖动
    var productUl = $('.tab_item').children();
    var lis = productUl.children();
    var liW = lis[0].offsetWidth;
    productUl.width(liW * lis.length);
    
    // 初始化
    var myScroll = new IScroll('.tab_item',{
        // 实现水平滑动
        scrollX:true,
        scrollY:false
    });
});