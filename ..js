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
    console.log(file_tree, gtihub_repo_branch +
        +recu);
}
make_filenav({
    filetypes: ['md'],
    file_tree_url: null,
    sidebar_css: 'div.sidebar-nav',
    gtihub_repo: 'willowj/You-Dont-Know-JS',
    branch: 'gh-pages',
    recursive: 0
});