<html>
    <head>
        <title>node egg</title>
    </head>
    <body>
        <ul class="news-view view">
            {% for item in list %}
                <li class="item">
                    <image src="{{ item.cover }}" /> 
                    <a href="{{ item.url }}">{{ item.title }}</a>
                </li>
            {% endfor %}
        </ul>
  </body>
</html>