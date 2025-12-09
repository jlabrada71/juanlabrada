const a = ["a", 
"b", 
"c"];

function print(a) {
    console.log('----')
    a.forEach((s) => console.log(s));
}

function areDifferentByOneChar(a, b) {
    let d = 0;
    for( let i = 0; i < a.length; i++) {
        if(a.charAt(i) != b.charAt(i)) d++;
    }
    return d === 1;
}

function printAllVariations(a, i) {
    if(i === a.length) {
        print(a);
        return;
    }

    if( (i > 0 ) && (! areDifferentByOneChar(a[i], a[i-1]))) return;

    printAllVariations(a, i + 1);

    for(let j = i + 1; j < a.length; j++) {
        [a[i], a[j]] = [a[j],a[i]];
        printAllVariations(a, i + 1);
        [a[i], a[j]] = [a[j],a[i]];
    }
}

printAllVariations(a, 0);


function areDifferentByOneChar(a, b) {
    let d = 0;
    for( let i = 0; i < a.length; i++) {
        if(a.charAt(i) !== b.charAt(i)) d++;
    }
    return d === 1;
}

function verify(a) {
    for( let i = 1; i < a.length; i++ ) {
        if( !areDifferentByOneChar(a[i-1], a[i])) return false;
    }
    return true;
}

function rearrange(a, i) {
    if( i === a.length ) return verify(a);
    if(rearrange(a, i + 1)) return true;
    for( let j = i + 1; j < a.length; j++) {
        [a[i], a[j]] = [a[j],a[i]];
        if( i > 0 ) {
             if(areDifferentByOneChar(a[i], a[i-1]) && rearrange(a, i + 1)) 
                return true;
        } else {
            if(rearrange(a, i + 1)) 
                return true;
        }
        [a[i], a[j]] = [a[j],a[i]];
    }
    return false;
}

function stringsRearrangement(inputArray) {
    return rearrange(inputArray, 0);
}


// if( stringsRearrangement(a) ) console.log(true);