---
title: How to implement a download link
description: Sometimes you need to implement a download link in a web page. 
slug: how-to-implement-a-download-link
tags: ['product development','design patterns','web design']
---
# How to implement a download link

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(jsonData, 'json.txt', 'text/plain');

  