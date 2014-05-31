var Goto = {}
function update(name, data) {
    document.getElementById('content').innerHTML = Handlebars.compile($('#handlebar-'+name).html())(data)
}
Goto.sites = function(data){
    Endpoints.sites(function(data){
        update('sites', {sites:data});
        $('#sec-sites a').on('click', function(){Nav.to('site', {apiname:$(this).data('apiname')} )})
    })
}

Goto.site = function(data) {
    update('site', {apiname:data.apiname})
}