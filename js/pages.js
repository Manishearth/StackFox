var Goto = {}
function update(name, data) {
    document.getElementById('content').innerHTML = Handlebars.compile($('#handlebar-'+name).html())(data)
}

Goto.sites = function(data){
    Endpoints.sites(function(data){
        update('sites', {sites:data});
        $('#sec-sites a').on('click', function(){Nav.to('site', {apiname:$(this).data('apiname'), name: $(this).data('name')} )})
        $('#sec-sites-control input').on('keyup', function(){
            $('#sec-sites li').hide();
            $('#sec-sites li:contains('+this.value+')').show();

        })
    })
}

Goto.site = function(data) {
    Endpoints.site(data.apiname, function(d){
        update('site', {apiname: data.apiname, name: data.name, questions: d})
    })
}