
<?php
header("Content-type:application/json;charset=utf-8");

$con = mysql_connect("localhost","root","");//连接数据库

$state = $_REQUEST['state'];//增删改查判断的状态变量

//登陆用户密码验证函数
function login(){
  $name = $_REQUEST['exampleInputName'];
  $password = $_REQUEST['exampleInputPassword'];
  global $con;
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
    }else{
      mysql_select_db("news", $con);
      mysql_query("set names 'utf8'");
      $sql = "SELECT * FROM `login` WHERE `name` = '$name'";
      $result = mysql_query($sql, $con);
      while($row = mysql_fetch_array($result))
      {
        // 若密码和用户名验证成功，则返回前台成功状态信号
        if($password == $row['password']){
            echo json_encode(array('msg'=>'1','errorCode'=>'ok'));
        }else{
            echo json_encode(array('msg'=>'0','errorCode'=>'no'));
        }
        $name ='';
        $password ='';
      }
  } 
}

// 查询函数
function select(){
  global $con;
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
    }else{
      mysql_select_db("news", $con);
      mysql_query("set names 'utf8'");
      $sql = "SELECT * FROM `newslist` WHERE 1";
      $result = mysql_query($sql, $con);
      $dataArr = array();
      while($row = mysql_fetch_array($result))
      {
         $row = array('url'=>$row['url'],'pic'=>$row['pic'],'title'=>$row['title'],'content'=>$row['content'],'topic'=>$row['topic'],'time'=>$row['time'],'id'=>$row['id']);
         $dataArr[] = $row;
      }
      echo json_encode($dataArr);
     // 利用json传递数组数据
  }
}

// 精确查找函数
function selectIndeed(){
  global $con;
  $del = $_REQUEST['del'];    //新闻id索引
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
    }else{
      mysql_select_db("news", $con);
      mysql_query("set names 'utf8'");
      $sql = "SELECT * FROM `newslist` WHERE `id` = '$del'";
      $result = mysql_query($sql, $con);
      while($row = mysql_fetch_array($result))
      {
         echo json_encode(array('url'=>$row['url'],'pic'=>$row['pic'],'title'=>$row['title'],'content'=>$row['content'],'topic'=>$row['topic'],'time'=>$row['time'],'id'=>$row['id']));
      }
     // 利用json传递数据
  }
}

// 记录函数
function insert(){
  global $con;
  $url = $_REQUEST['url'];
  $pic = $_REQUEST['pic'];
  $title = $_REQUEST['title'];
  $content = $_REQUEST['content'];
  $topic = $_REQUEST['topic'];
  $time = $_REQUEST['time'];
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
    }else{
      mysql_select_db("news", $con);
      mysql_query("set names 'utf8'");//避免乱码
      $sql = "INSERT INTO `newslist` (`url`, `pic`, `title`,`content`,`topic`,`time`) VALUES ( '$url', '$pic', '$title', '$content', '$topic', '$time')";
      $result = mysql_query($sql, $con);

      if (!$result) {
        echo 'error';
      }else{
        echo 'INSERT success!';
      }
      
  }
}

// 修改函数
function update(){
  global $con;
  $url = $_REQUEST['url'];
  $pic = $_REQUEST['pic'];
  $title = $_REQUEST['title'];
  $content = $_REQUEST['content'];
  $topic = $_REQUEST['topic'];
  $time = $_REQUEST['time'];
  $id = $_REQUEST['id'];
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
    }else{
      mysql_select_db("news", $con);
      mysql_query("set names 'utf8'");//避免乱码
      $sql = "UPDATE `newslist` SET `url`='$url',`pic`='$pic',`title`='$title',`content`='$content',`time`='$time',`topic`='$topic' WHERE `id`='$id'";
      $result = mysql_query($sql, $con);

      if (!$result) {
        echo 'error';
      }else{
        echo 'UPDATE success!';
      }
      
  }
}

// 删除函数
function delete(){
  global $con;
  $del = $_REQUEST['del'];    //新闻id索引
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
    }else{
      echo $del;
      mysql_select_db("news", $con);
      mysql_query("set names 'utf8'");  
      $sql = "DELETE FROM `newslist` WHERE `id` = '$del'";
      $result = mysql_query($sql, $con);

      if (!$result) {
        echo 'error';
      }else{
        echo 'DELETE success!';
      }
    }
}

// $state为0表示查询操作
if ($state == 0) {
    select();
// $state为1表示录入操作
}else if ($state == 1) {
    insert();
// $state为2表示删除操作
}else if ($state == 2) {
    delete();
// $state为3表示精确查询操作
}else if ($state == 3) {
    selectIndeed();
// $state为4表示修改操作
}else if ($state == 4) {
    update();
// $state为5表示登陆验证操作
}else if ($state == 5) {
    login();
}


mysql_close($con);
?>

