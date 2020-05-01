let root = {
    data: "d10",
    children: [{
        data: "d20",
        children: [{
            data: "d50",
            children: []
        }, {
            data: "d60",
            children: []
        }]
    }, {
        data: "d30",
        children: [{
            data: "d70",
            children: []
        }]
    }, {
        data: "d40",
        children: [{
            data: "d80",
            children: []
        }, {
            data: "d90",
            children: []
        }]
    }]
}


// console.log(root.children)


function display(root) {

    let ans = root.data + " -> ";

    for (let i = 0; i < root.children.length; i++) {
        ans += root.children[i].data + " ";
    }

    console.log(ans);

    for (let i = 0; i < root.children.length; i++) {
        display(root.children[i]);
    }


}

display(root);