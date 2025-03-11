export function createSet() {
    const total=[]
    for (const color of ["red", "green", "blue"] ) {
        for (const number of [1,2,3]) {
            for (const shape of ["circle", "star", "square"]) {
                for (const fill of ["hollow", "striped", "full"]) {
                    const obj = {"color": color, "num":number, "shape": shape, "fill": fill}
                    total.push(obj)
                }
            }
        }
    }
    shuffle(total)
    return total
}

export function checkSet(obj1, obj2, obj3) {
    if (!((obj1.color === obj2.color && obj2.color === obj3.color) || (obj1.color !== obj2.color && obj2.color !== obj3.color && obj1.color !== obj3.color))) {
        return false;
    }
    if (!((obj1.num === obj2.num && obj2.num === obj3.num) || (obj1.num !== obj2.num && obj2.num !== obj3.num && obj1.num !== obj3.num))) {
        return false;
    }
    if (!((obj1.shape === obj2.shape && obj2.shape === obj3.shape) || (obj1.shape !== obj2.shape && obj2.shape !== obj3.shape && obj1.shape !== obj3.shape))) {
        return false;
    }
    if (!((obj1.fill === obj2.fill && obj2.fill === obj3.fill) || (obj1.fill !== obj2.fill && obj2.fill !== obj3.fill && obj1.fill !== obj3.fill))) {
        return false;
    }
    return true
}   

export function checkAll(objs) {
    for (let i=0;i<objs.length;i++) {
        for (let j=i+1;j<objs.length;j++) {
            for (let k=j+1;k<objs.length;k++) {
                if (checkSet(objs[i],objs[j],objs[k])) {
                    console.log(objs[i],objs[j],objs[k])
                    return true
                }
            }
        }
    }
    return false
}
function shuffle(array) {
    let currentIndex = array.length;
    
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
    
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
}