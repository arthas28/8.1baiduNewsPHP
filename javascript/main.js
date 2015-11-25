$(document).ready(function(){
//
    var url;      //新闻链接地址
    var pic;      //图片索引url
    var title;    //新闻题目
    var content;  //新闻内容
    var topic;    //主题
    var time;     //时间
    var id;       //主键索引
    var state;    //增删改查判断状态

    $.ajax({
        url:'../php/baiduNews.php',
        dataType:'json',
        data: {state: '0'},
        type:'POST',
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
                id = data[i].id;
                // 利用ajax传递数据，从后台取回数据后追加列表内容
                var atr = $('<tr>').attr({'onClick':"window.location.href='"+url+"';",'target':'_blank'}).appendTo($('#myTable'));
                var atd = $('<td>').appendTo(atr);
                $('<img>').attr('src','../'+pic).appendTo(atd);
                var listContent = $('<div>').addClass('indexListContent').appendTo(atd);
                var listBottom = $('<div>').addClass('indexListBottom').appendTo(atd);
                $('<div>').addClass('indexListTitle').append(title).appendTo(listContent);
                $('<div>').addClass('indexListMain').append(content).appendTo(listContent);
                $('<div>').addClass('tipTopic').append(topic).appendTo(listBottom);
                $('<div>').addClass('tipTime').append(time).appendTo(listBottom);
                // 追加删除选项下拉列表框内容
                $('<option>').attr('value',id).append(id +':'+title).appendTo($('#selectDel'));
            }
        },
        error:function(){
            alert('error!');
        }
    });
    // 录入新闻内容项，利用ajax传送后台数据
    $('#msgBtn').unbind('click').click(function(e){
        // e.preventDefault();
        if ($('#url').val()&&$('#pic').val()&&$('#title').val()&&$('#content').val()&&$('#time').val()&&$('#topic').val()) {
            $.ajax({
                url:'../php/baiduNews.php',
                data:{
                    url:$('#url').val(),
                    pic:$('#pic').val(),
                    title:$('#title').val(),
                    content:$('#content').val(),
                    time:$('#time').val(),
                    topic:$('#topic').val(),
                    state: '1'
                },
                dataType:'text',
                type:'POST',
                success:function(){
                    alert('录入成功!');
                    $('#url').val('');
                    $('#title').val('');
                    $('#content').val('');
                    $('#time').val('');
                },
                error:function(){
                    alert('error!');
                }
            });
        };
    });
    // 修改新闻内容项，利用ajax传送后台数据
    $('#updBtn').unbind('click').click(function(e){

        if ($('#selectDel').val()!='请选择...') {
            $.ajax({
                url:'../php/baiduNews.php',
                data:{
                    url:$('#url').val(),
                    pic:$('#pic').val(),
                    title:$('#title').val(),
                    content:$('#content').val(),
                    time:$('#time').val(),
                    topic:$('#topic').val(),
                    id:$('#selectDel').val(),
                    state: '4'
                },
                dataType:'text',
                type:'POST',
                success:function(){
                    alert('录入成功!');
                    $('#url').val('');
                    $('#pic').val('');
                    $('#title').val('');
                    $('#content').val('');
                    $('#time').val('');
                    $('#topic').val('');
                    $('#selectDel').prop('selectedIndex', 0);
                },
                error:function(){
                    alert('error!');
                }
            });
        };
    });
    // 删除新闻内容项，利用ajax传送后台数据
    $('#delBtn').unbind('click').click(function(e){
        // e.preventDefault();
        if ($('#selectDel').val()!='请选择...') {
            $.ajax({
                url:'../php/baiduNews.php',
                data:{
                    del:$('#selectDel').val(),
                    state: '2',
                },
                dataType:'text',
                type:'POST',
                success:function(){
                    alert('删除成功!');
                    // $('#url').val('');
                    // $('#pic').val('');
                    // $('#title').val('');
                    // $('#content').val('');
                    // $('#topic').val('');
                    // $('#time').val('');
                    window.location.href=window.location.href;
                },
                error:function(){
                    alert('error!');
                }
            });
        }else{
            e.preventDefault();
        };
    });
    //选中select元素时从后台读取数据显示在消息管理处 
    $("select").change(function(){
        $.ajax({
                url:'../php/baiduNews.php',
                data:{
                    del:$('#selectDel').val(),
                    state: '3',
                },
                dataType:'json',
                type:'POST',
                success:function(data){
                    console.info(data);
                    $('#url').val(data.url);
                    $('#pic').val(data.pic);
                    $('#title').val(data.title);
                    $('#content').val(data.content);
                    $('#topic').val(data.topic);
                    $('#time').val(data.time);
                },
                error:function(){
                    alert('error!');
                }
        });
    });

});