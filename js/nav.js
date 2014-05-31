var navhistory = [['sites',{}]]
var Nav = {}
Nav.to = function to(page, data) {
    navhistory.push([page,data])
    Goto[page](data)
}
Nav.back = function back(){
    a = navhistory.pop()
    Goto[a[0]](a[1])
}

