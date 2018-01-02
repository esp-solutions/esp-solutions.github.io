---
layout: site
title: Home
---

{% for post in site.posts %}
<div class="result">

{% include post-header.html with-link=1 %}

{{ post.excerpt }}
{% capture content_words %}
    {{ post.content | number_of_words }}
{% endcapture %}
{% capture excerpt_words %}
    {{ post.excerpt | number_of_words }}
{% endcapture %}
{% if excerpt_words != content_words %}
<p><a href="{{ post.url }}#read-more" role="button">read more...</a></p>
{% endif %}

</div>
{% endfor %}
