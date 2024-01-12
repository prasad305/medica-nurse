<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Important Update</title>
    <style>
        body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .banner {
            background-color: #2C59A3; /* Blue color, you can choose your brand color */
            color: #fff; /* White text for good contrast */
            padding: 15px;
            text-align: center;
            position: fixed;
            top: 0;
            width: 99%;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .banner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .banner-text {
            flex-grow: 1;
            margin-right: 20px;
        }

        .close-btn {
            cursor: pointer;
            font-size: 20px;
            line-height: 1;
            border: none;
            background: none;
            color: #fff;
        }

        .close-btn:hover {
            color: #f2f2f2;
        }
    </style>
</head>
<body>

<div class="banner">
    <div class="banner-content">
        <div class="banner-text">
            <span> Exciting News! We've launched a new version of our web app. <a href="https://reception.medica.my/V2" style="color: #fff; text-decoration: underline;">Explore now</a> for amazing features!</span>
        </div>
        <button class="close-btn" onclick="closeBanner()">✖</button>
    </div>
</div>

<script>
    function closeBanner() {
        document.querySelector('.banner').style.display = 'none';
    }
</script>

</body>
</html>
