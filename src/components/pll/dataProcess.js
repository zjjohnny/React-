
const dataProcess =(data)=>{
    let test1 = [];
    let test2 ={}
    for(let name in data){
        test2.date = name;
        test2.data = data[name]
        test1.push(test2)
        test2 = {}
    }
    let my = test1.sort((a,b)=>{
        return (new Date(a.date)).getTime() - new Date(b.date).getTime()
    })
    return my
}

export default dataProcess