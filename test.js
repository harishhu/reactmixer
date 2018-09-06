class laohu{
    test(){
        console.log('laohu print');
    }
}

console.log('path = ' + process.cwd());

module.exports = new laohu();