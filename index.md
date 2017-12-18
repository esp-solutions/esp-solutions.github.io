---
layout: site
title: Home
---

{% for post in site.posts %}

{% include post-header.html with-link=1 %}

<div class="post-excerpt">
    {{ post.excerpt }}
    <p><a href="{{ post.url }}">read more...</a></p>
</div>

{% endfor %}
