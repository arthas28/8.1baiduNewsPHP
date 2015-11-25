$(document).ready(function(){

    var state = 5; //判断登陆验证的状态变量
    // ajax发送用户名和密码至后台判断登陆凭证
    $('#loginBtn').unbind('click').click(function(e){
        
        if ($('#exampleInputName').val()&&$('#exampleInputPassword').val()) {
            e.preventDefault();  //组织默认刷新事件
            $.ajax({
                url:'php/baiduNews.php',
                data:{
                    exampleInputName:$('#exampleInputName').val(),
                    exampleInputPassword:$('#exampleInputPassword').val(),
                    state: '5'
                },
                dataType:'json',
                success:function(data){

                    if (data.msg == 1) {
                        window.open('next/mian.html','_self');//若后台验证成功，跳转到管理页面
                    }else{
                        alert('密码或账号错误!');
                    };
                    
                },
                error:function(data){
                    alert('登陆失败!');
                }
            })
        };
        
    });
});