---
layout: post
comments: true
title: "What was with that old web site?"
author: Jason Stubbs
---

It's been 5 years since I started this company, but our web site never really got the attention it needed. Like a lot of projects, the old site began with grand plans but didn't get much past the experiment stage, putting it on the level of a technical preview more than anything else.


## Did it do anything well?

There were some interesting aspects to it but, unfortunately, they weren't very noticeable.

![Screen capture of the old site](/assets/img/2017-09-26-old-site-screenshot.png)

It was running on [concrete5](https://concrete5.org) but with a theme created from scratch using [AngularJS](https://angularjs.org). By doing so, I was able to turn it into a [single-page application](https://en.wikipedia.org/wiki/Single-page_application) with extremely fast page navigation, yet still fully compatible with search engines and even usable with JavaScript disabled.

The design was also created from scratch, using a "mobile first" style of [responsive web design](https://en.wikipedia.org/wiki/Responsive_web_design). Pages could even be printed with a result that was near identical to what was seen on a desktop screen. (If only there had been content that somebody would actually like to have printed...)

The only other notable finished piece was a [compact-text code snippet](https://github.com/esp-solutions/esp-solutions.github.io/commit/d396dca375b1c5d2e78d2b8581b3be0c5a517d68), which I've also used on this site. Basically, I don't like it when a line of text long enough to require two lines has ten words in the first line but only one in the second, especially when that text is centred. To fix that, I wrote a short script that automatically adjusts the layout to be more aesthetically pleasing.


## So, why not finish it?

The main feature of the site was to be its in-built search function. Being a single-page application, I thought it'd be pretty cool if the list of posts (in either reverse chronological or popularity order) could be searched easily, with categories and tags being nothing more than suggested searches.

A search function is only necessary when there is actual content to search, though, so this was put off until after there were too many posts to list on-screen at once. Now that I'm once again thinking about creating content, the site's code is old enough that it'd need to be completely rewritten as both concrete5 and AngularJS since advanced several versions.

The biggest problem though is that a wholly custom site needs a custom design and we are simply not designers. However, the design is the first thing that people see and non-technical people even seem to believe that the design is a good indicator of quality.

Now, there is no longer any business value in making such a grandiose attempt even if it succeeded. CMS customisation (aka web design) is no longer a primary focus of the business, so trying to show prowess in that area is pointless. Instead, I've decided to go with a stock design and static site builder and just tweak it as necessary.


## But what about the content?

I've decided to throw away all of the existing content. There were only 11 pages in all, most of which read like a brochure. Five years on, the sole article that was interesting is no longer relevant.

Nope, I think it'll be much better to just start afresh. If the point of the site is to show capability then a design portfolio isn't going to cut it. With how fast technology advances, the only way to show capability is to be continually posting new content.

So posting new content is what I plan to do!
