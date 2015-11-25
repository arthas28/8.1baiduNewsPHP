/**
 * Created by YANG on 15/10/20.
 */
 $(document).ready(function(){
    var url;      //新闻链接地址
    var pic;      //图片索引url
    var title;    //新闻题目
    var content;  //新闻内容
    var topic;    //主题
    var time;     //时间
    var state;    //状态函数

    //利用ajax从后台获取数据 
    $.ajax({
        url:'php/baiduNews.php',
        dataType:'json',
        data: {state: '0'},
        success:function(data){ 
            console.info(data);
            console.info('success!');
            for(var i = 0 ; i<data.length; i++)
            {
                url = data[i].url;
                pic = data[i].pic;
                title = data[i].title;
                content = data[i].content;
                topic = data[i].topic;
                time = data[i].time;
                // 利用ajax传递数据，从后台取回数据后追加列表内容
                var aDiv = $('<div>').addClass('indexListItem').attr('onClick',"window.location.href='"+url+"';").appendTo($('#indexList'));
                $('<img>').attr('src',pic).appendTo(aDiv);
                var listContent = $('<div>').addClass('indexListContent').appendTo(aDiv);
                var listBottom = $('<div>').addClass('indexListBottom').appendTo(aDiv);
                $('<div>').addClass('indexListTitle').append(title).appendTo(listContent);
                $('<div>').addClass('indexListMain').append(content).appendTo(listContent);
                $('<div>').addClass('tipTopic').append(topic).appendTo(listBottom);
                $('<div>').addClass('tipTime').append(time).appendTo(listBottom);
            }
        },
        error:function(){
            alert('error!');
        }
    });
    // 数据点击更新
    $('#refresh').unbind('click').click(function(){
        console.info("!!!");
        window.location.href=window.location.href;
    });


});