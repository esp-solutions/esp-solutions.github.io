{% for post in site.posts %}

<h1 class="compact-text"><a href="{{ post.url }}">{{ post.title }}</a></h1>

<div class="post-meta">
    <div>by {{ post.author }}</div>
    <div>on {{ post.date  | date_to_long_string}}</div>
</div>

<div class="post-excerpt">
    {{ post.excerpt }}
    <p><a href="{{ post.url }}">continue...</a></p>
</div>

{% endfor %}
