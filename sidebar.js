//-*- coding: utf-8 -*-
/*
make_filenav
    ajax()
    addsidebar
        github_filetree()
        create_contents()

*/

function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function() {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in opt.data) {
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(xmlHttp.responseText);
        }
    };
    // https://blog.csdn.net/Lpandeng/article/details/72399221
}


function create_contents(div_nav) {

    var div_l = document.createElement('div');
    div_l.innerText = 'contents';
    div_nav.appendChild(div_l);

    document.querySelectorAll('h2').forEach(function(item) {

        var ul = document.createElement('ul');
        div_l.appendChild(ul);

        var li = document.createElement('li');

        ul.appendChild(li);

        var a = document.createElement('a');
        li.appendChild(a);
        a.setAttribute("href", document.location.href.split('?')[0] + '?id=' + item.id);
        a.innerText = item.innerText;
    });
}



function github_filetree(getree, div_nav, filetypes) {

    z_da_t = getree.tree;
    for (var k = 0; k <= z_da_t.length - 1; k++) {
        var pa = z_da_t[k]['path'];
        var type_ = pa.split('.');
        if (filetypes.indexOf(type_[type_.length - 1]) > -1) {
            var fles = pa.split('/');
            var this_node = div_nav;
            for (var i = 0; i <= fles.length - 1; i++) {
                var fod_i = this_node.querySelector('ul[folder="' + fles[i] + '"]');

                if (!fod_i) {
                    if (i == fles.length - 1) {
                        var ul = document.createElement('ul');
                        var li = document.createElement('li');

                        ul.appendChild(li);
                        var a = document.createElement('a');
                        a.innerText = fles[i];
                        a.setAttribute('href', '#/' + pa);

                        li.appendChild(a);
                        this_node.appendChild(ul);

                    } else {
                        var ul = document.createElement('ul');
                        ul.setAttribute('folder', fles[i]);
                        ul.innerHTML = '<a>' + fles[i] + '</a>';
                        this_node.appendChild(ul);
                        this_node = ul;
                    }

                } else {
                    this_node = fod_i;
                };

            };
        };
    };

}



function fucos() {
    var div_nav = document.querySelector('div.sidebar-nav')
    /*active current site*/
    var site = document.location.href.split('?')[0].split('#');
    site = site[site.length - 1];
    if (site === '') {
        var active = div_nav.querySelector('#addsidebarok a');
    } else {
        var active = div_nav.querySelector('a[href*="' + decodeURI(site) + '"]');
    };
    active.parentElement.setAttribute('class', 'active');
    active.focus();
}



function addsidebar(getree, sidebar_css, home, filetypes) {
    var div_sidebar = document.querySelector(sidebar_css)
    //div_nav.innerText = '';
    //create_contents(div_nav); // static/sidebar.js
    var div_nav = document.createElement('div');
    div_sidebar.appendChild(div_nav);
    div_nav.setAttribute('class', 'githubtree');


    var d_ul = document.createElement('ul');
    div_nav.appendChild(d_ul);

    github_filetree(getree, div_nav, filetypes);

    d_ul.setAttribute('id', 'addsidebarok');

    var li = document.createElement('li');
    d_ul.appendChild(li);

    var a = document.createElement('a');
    li.appendChild(a);
    a.innerHTML = '<strong>home</strong>';
    a.setAttribute('href', '/#');

}


function make_filenav(opt) {
    var opt = opt || {};
    if (!opt.file_tree_url && !opt.gtihub_repo) {
        console.log("file_tree_url and gtihub_repo is null");
        return;
    };
    var filetypes = opt.filetypes || ['md']; //
    var sidebar_css = opt.sidebar_css || 'div.sidebar-nav'; //
    var home = opt.gtihub_repo.split('/')[1] || '#';
    var gtihub_repo_branch = opt.branch || 'master';
    var recu = (!opt.recursive ? '' : "?recursive=1");
    console.log(recu)

    if (opt.file_tree_url) {
        var file_tree = opt.file_tree_url
    } else {
        var file_tree = "https://api.github.com/repos/" +
            opt.gtihub_repo +
            "/git/trees/" +
            gtihub_repo_branch +
            recu;
    }


    var getree = [];
    ajax({
        method: 'get',
        url: file_tree,
        success: function(response) { // 此处为执行成功后的代码
            getree = JSON.parse(response);
            //github_filetree(getree, div_nav, filetypes)  // static/sidebar.js
        },
        fail: function(status) {
            console.log('状态码为' + status);
        }

    });


    var x = document.location.href.split('?')[0];
    setInterval(function() {
        if (!document.querySelector('#addsidebarok')) {
            addsidebar(getree, sidebar_css, home, filetypes);
            console.log('sidebar 1');
        }
        if (document.location.href.split('?')[0] != x) {
            x = document.location.href.split('?')[0];
            fucos();
        }
    }, 3000);

}