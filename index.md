---
layout: default
title: Home
---

{% for post in site.posts %}

<h1 class="compact-text"><a href="{{ post.url }}">{{ post.title }}</a></h1>

{% include postMeta.html %}

<div class="post-excerpt">
    {{ post.excerpt }}
    <p><a href="{{ post.url }}">read more...</a></p>
</div>

{% endfor %}
