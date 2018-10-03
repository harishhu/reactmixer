
class Dimensions {
    static get(type){
        if(type === 'window'){
            return window.screen;
        }
    }
};

module.exports = Dimensions;
