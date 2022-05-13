# back-magic
Test task

Задание
-----------
1. Скопировать сайт https://api.skacpa.ru/sites/61-back-magic/l-kz-1/
2. Интегрировать в него любую форму с сайта https://f.aktifish.ru/
3. При интеграции форму надо подкорректировать сделать ее адаптивной в соответствии с шириной самого сайта/устройства/цены/даты на котором он отображается.
4. Произвести API интеграцию на основе документации представленной ниже
<br />
```javascript
API TOKEN: MZA1NTK2NMQTYTI0YS00NTQ4LTG2MJGTYZI3MJZKMDGYMDRM
stream_code: b8rl1

Order api examples
JavaScript
<form class="orderForm">
    <input type="text" name="name" placeholder="name" />
    <input type="text" name="phone" placeholder="phone" />
    <input type="text" name="surname" placeholder="surname" />
    <input type="text" name="email" placeholder="email" />
    <input type="text" name="country" placeholder="country" />
    <input type="text" name="city" placeholder="city" />
    <input type="text" name="postcode" placeholder="postcode" />
    <input type="text" name="address" placeholder="address" />
    <input type="hidden" name="ip" value="" />
    <input type="submit" value="Submit">
</form>
<script src="https://snippet.infothroat.com/dist/api/lead-1.1.0.min.js"></script>
<script> drlead.init({ params: { token: "MJK1YZY0ODETNJKXZC00NTDJLWIXZTCTZMZIMGFLYMIWYTG1", // required stream_code: "66vnu",
// required thanks_page: "./thanks.html" }, subs: { sub1: drlead.formInputGet("sub1") || drlead.queryGet("sub1"),
// sub2: drlead.formInputGet("sub2") || drlead.queryGet("sub2"), sub3: drlead.formInputGet("sub3") || drlead.queryGet("sub3"),
// sub4: drlead.formInputGet("sub4") || drlead.queryGet("sub4"), sub5: drlead.formInputGet("sub5") || drlead.queryGet("sub5"), },
// callback: function (error, response) { // On request done }, before: function() { // before request done } }); </script>
```
```phpt
<!DOCTYPE html>
<html lang="en"> <head>
<meta charset="UTF-8">
<title>Title</title>
</head>
<body>
<form class="orderForm" method="post" action="/">
    <input type="text" name="name" placeholder="name" />
    <input type="text" name="phone" placeholder="phone" />
    <input type="text" name="surname" placeholder="surname" />
    <input type="text" name="email" placeholder="email" />
    <input type="text" name="country" placeholder="country" />
    <input type="text" name="city" placeholder="city" />
    <input type="text" name="postcode" placeholder="postcode" />
    <input type="text" name="address" placeholder="address" />
    <input type="hidden" name="ip" value="" />
    <input type="submit" value="Submit">
</form>
<?php 
    if (!function_exists('curl_version')) {
     echo 'Curl is not installed';
     }
     if ($_SERVER["REQUEST_METHOD"]=="POST") {
     // Required params $token = '{{ .api_token }}';
     $stream_code = '{{ .stream_code }}';
     // Fields to send $post_fields = [
      'stream_code' => $stream_code,
      // required 'client' => [
      'phone' => $_POST['phone'],
      // required 'name' => $_POST['name'],
      // 'surname' => $_POST['surname'],
      // 'email' => $_POST['email'],
      // 'address' => $_POST['address'],
      // 'ip' => $_POST['ip'],
      // 'country' => $_POST['country'],
      // 'city' => $_POST['city'],
      // 'postcode' => $_POST['postcode'],
      ],
      'sub1' => (empty($_POST['sub1'])) ? $_GET['sub1'] : $_POST['sub1'],
      'sub2' => (empty($_POST['sub2'])) ? $_GET['sub2'] : $_POST['sub2'],
      'sub3' => (empty($_POST['sub3'])) ? $_GET['sub3'] : $_POST['sub3'],
      'sub4' => (empty($_POST['sub4'])) ? $_GET['sub4'] : $_POST['sub4'],
      'sub5' => (empty($_POST['sub5'])) ? $_GET['sub5'] : $_POST['sub5'],
      ];
      $headers = [ 'Content-Type: application/json', 'Authorization: Bearer ' . $token ];
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL,"https://order.drcash.sh/v1/order");
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_fields));
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($ch, CURLOPT_HEADER, true);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $response = curl_exec($ch);
      $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
      $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
      $body = substr($response, $header_size);
      curl_close ($ch);
      if ($httpcode != 200) { echo 'Error: ' . $httpcode; echo '<br>'; echo $response; }
      if ($httpcode == 200) { echo '<script language="javascript" type="text/javascript"> window.location.href = "./thanks"; </script>'; } } ?>
      </body> </html>
```

Как развернуть проект (Проект упакован в Docker)
-----------
1. Устанавливаем Docker на компьютер
2. Переходим в терминал
3. Переходим в папку docker <br />
   `cd /docker`
4. Запускаем создание контейнеров <br />
    `docker compose up -d`
5. После запуска контейнеров - в браузере переходим `http://localhost:8080/`

Результат
-----------
1. Форма под замену
![Home Page](https://i.postimg.cc/jSJThSDL/old-form.png)
2. Форма для интеграции
![Home Page](https://i.postimg.cc/QN0j8PLx/form-for-integration.png)
3. С замененной формой
![Home Page](https://i.postimg.cc/dtfvdytb/new-form.png)
4. Валидация
![Home Page](https://i.postimg.cc/28yrVwmd/validation.png)
5. Success
   ![Home Page](https://i.postimg.cc/VNQ8ZPt4/success.png)
   
   
   